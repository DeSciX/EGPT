/**
 * Audio processing for podcast episodes.
 *
 * Responsibilities:
 *   - Loudness normalization to -16 LUFS (Apple/podcast standard) + transcode to MP3.
 *   - Duration probe (seconds) via ffprobe.
 *   - ID3v2 embed: episode/show artwork + chapters.
 *   - Enclosure byte-length (file size of the produced MP3).
 *
 * Shells out to ffmpeg/ffprobe (system binaries). node-id3 handles ID3 tags.
 * No hardcoded fallbacks: a missing input or a failed ffmpeg run hard-fails.
 */

import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import NodeID3 from 'node-id3';

const LUFS_TARGET = -16;
const LOUDNORM_TP = -1.5;   // true peak ceiling
const LOUDNORM_LRA = 11;    // loudness range

function run(cmd, args) {
    return new Promise((resolve, reject) => {
        const proc = spawn(cmd, args);
        let stdout = '';
        let stderr = '';
        proc.stdout.on('data', d => { stdout += d.toString(); });
        proc.stderr.on('data', d => { stderr += d.toString(); });
        proc.on('error', err => reject(new Error(`${cmd} failed to spawn: ${err.message}`)));
        proc.on('close', code => {
            if (code === 0) resolve({ stdout, stderr });
            else reject(new Error(`${cmd} exited ${code}: ${stderr.slice(-500)}`));
        });
    });
}

/** Probe duration in seconds (float). */
export async function probeDurationSeconds(filePath) {
    const { stdout } = await run('ffprobe', [
        '-v', 'error',
        '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1',
        filePath,
    ]);
    const seconds = parseFloat(stdout.trim());
    if (!Number.isFinite(seconds) || seconds <= 0) {
        throw new Error(`ffprobe returned invalid duration for ${filePath}: "${stdout.trim()}"`);
    }
    return seconds;
}

/**
 * Normalize loudness to -16 LUFS and transcode to MP3.
 * @returns {Promise<string>} path to the produced MP3 (in a temp dir)
 */
export async function normalizeToMp3(inputPath, outDir) {
    await fs.access(inputPath).catch(() => {
        throw new Error(`Audio input not found: ${inputPath}`);
    });
    const outPath = path.join(outDir, `normalized-${Date.now()}.mp3`);
    await run('ffmpeg', [
        '-y',
        '-i', inputPath,
        '-af', `loudnorm=I=${LUFS_TARGET}:TP=${LOUDNORM_TP}:LRA=${LOUDNORM_LRA}`,
        '-ar', '44100',
        '-b:a', '128k',
        '-codec:a', 'libmp3lame',
        outPath,
    ]);
    return outPath;
}

/**
 * Embed ID3v2 tags (title, artist, artwork, chapters) into an MP3 in place.
 * @param {Object} tags - { title, artist, album, imagePath?, chapters?[] }
 *   chapters: [{ startMs, endMs, title }]
 */
export async function embedId3(mp3Path, tags) {
    const id3 = {
        title: tags.title,
        artist: tags.artist,
        album: tags.album,
    };
    if (tags.imagePath) {
        const imageBuffer = await fs.readFile(tags.imagePath);
        const mime = tags.imagePath.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg';
        id3.image = {
            mime,
            type: { id: 3, name: 'front cover' },
            description: 'cover',
            imageBuffer,
        };
    }
    if (Array.isArray(tags.chapters) && tags.chapters.length > 0) {
        id3.chapter = tags.chapters.map((ch, idx) => ({
            elementID: `chp${idx}`,
            startTimeMs: ch.startMs,
            endTimeMs: ch.endMs,
            tags: { title: ch.title },
        }));
    }
    const result = NodeID3.write(id3, mp3Path);
    if (result !== true) {
        throw new Error(`ID3 write failed for ${mp3Path}: ${result}`);
    }
    return true;
}

/** File size in bytes (enclosure length). */
export async function byteLength(filePath) {
    const stat = await fs.stat(filePath);
    return stat.size;
}

/** Create a private temp working directory. */
export async function makeTempDir() {
    return fs.mkdtemp(path.join(os.tmpdir(), 'ssgpod-'));
}

/**
 * Full pipeline: normalize -> embed ID3 -> probe duration + byte length.
 * @returns {Promise<{ mp3Path, durationSeconds, enclosureLength }>}
 */
export async function processEpisodeAudio({ inputPath, outDir, id3 }) {
    const mp3Path = await normalizeToMp3(inputPath, outDir);
    await embedId3(mp3Path, id3);
    const durationSeconds = await probeDurationSeconds(mp3Path);
    const enclosureLength = await byteLength(mp3Path);
    return { mp3Path, durationSeconds, enclosureLength };
}

export { LUFS_TARGET };
