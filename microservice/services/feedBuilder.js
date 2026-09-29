/**
 * RSS 2.0 + iTunes podcast feed builder.
 *
 * PURE: takes a channel (show metadata) + episode-state array and returns an
 * XML string. No I/O. The feed is ALWAYS regenerated from Firestore state, so
 * this module is the single source of feed shape — it is idempotent for a given
 * input state.
 *
 * Apple namespaces:
 *   xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
 *   xmlns:content="http://purl.org/rss/1.0/modules/content/"
 *
 * Spec references encoded here:
 *   - Channel: title, description, language, link, itunes:author,
 *     itunes:category, itunes:explicit, itunes:image, itunes:owner(email+name).
 *   - Item: title, description, enclosure(url,length,type=audio/mpeg),
 *     guid(isPermaLink=false), pubDate(RFC-822), itunes:duration,
 *     content:encoded, optional itunes:season/episode/explicit, chapters.
 */

const ITUNES_NS = 'http://www.itunes.com/dtds/podcast-1.0.dtd';
const CONTENT_NS = 'http://purl.org/rss/1.0/modules/content/';

function xmlEscape(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

function cdata(str) {
    if (str === null || str === undefined) return '<![CDATA[]]>';
    // Guard against the only sequence that can break a CDATA section.
    const safe = String(str).replace(/]]>/g, ']]]]><![CDATA[>');
    return `<![CDATA[${safe}]]>`;
}

/**
 * Convert an ISO date string (or Date) to RFC-822 (RFC-1123) format required by RSS.
 * e.g. "Mon, 01 Jun 2026 14:00:00 GMT"
 */
export function toRfc822(input) {
    const d = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(d.getTime())) {
        throw new Error(`Invalid date for RFC-822 conversion: ${input}`);
    }
    return d.toUTCString();
}

/**
 * Convert seconds (number) to iTunes duration HH:MM:SS (or MM:SS).
 */
export function toItunesDuration(seconds) {
    const total = Math.round(Number(seconds));
    if (!Number.isFinite(total) || total < 0) {
        throw new Error(`Invalid duration seconds: ${seconds}`);
    }
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

function explicitVal(v) {
    // Apple accepts "true"/"false" (legacy "yes"/"no" still parsed). Normalize to true/false.
    if (v === true || v === 'true' || v === 'yes') return 'true';
    return 'false';
}

function buildItem(ep) {
    const lines = [];
    lines.push('    <item>');
    lines.push(`      <title>${cdata(ep.title)}</title>`);
    lines.push(`      <description>${cdata(ep.description)}</description>`);
    lines.push(`      <content:encoded>${cdata(ep.contentEncoded ?? ep.description)}</content:encoded>`);
    // Enclosure — url, byte length, audio/mpeg.
    lines.push(`      <enclosure url="${xmlEscape(ep.enclosureUrl)}" length="${xmlEscape(ep.enclosureLength)}" type="${xmlEscape(ep.enclosureType || 'audio/mpeg')}" />`);
    // Stable, non-permalink GUID.
    lines.push(`      <guid isPermaLink="false">${xmlEscape(ep.guid)}</guid>`);
    lines.push(`      <pubDate>${xmlEscape(toRfc822(ep.pubDate))}</pubDate>`);
    lines.push(`      <itunes:duration>${xmlEscape(ep.itunesDuration ?? toItunesDuration(ep.durationSeconds))}</itunes:duration>`);
    if (ep.season !== undefined && ep.season !== null) {
        lines.push(`      <itunes:season>${xmlEscape(ep.season)}</itunes:season>`);
    }
    if (ep.episode !== undefined && ep.episode !== null) {
        lines.push(`      <itunes:episode>${xmlEscape(ep.episode)}</itunes:episode>`);
    }
    if (ep.explicit !== undefined && ep.explicit !== null) {
        lines.push(`      <itunes:explicit>${explicitVal(ep.explicit)}</itunes:explicit>`);
    }
    if (ep.image) {
        lines.push(`      <itunes:image href="${xmlEscape(ep.image)}" />`);
    }
    lines.push('    </item>');
    return lines.join('\n');
}

/**
 * Build the full feed.xml string.
 *
 * @param {Object} channel - show channel metadata (from PodcastShows state)
 * @param {Array}  episodes - episode-state array (from PodcastEpisodes)
 * @param {Object} opts - { feedUrl } self-reference for atom:link (optional)
 * @returns {string} feed.xml
 */
export function buildFeed(channel, episodes, opts = {}) {
    if (!channel || typeof channel !== 'object') {
        throw new Error('buildFeed: channel metadata is required');
    }
    const items = (episodes || []).map(buildItem).join('\n');
    const lastBuild = toRfc822(new Date());

    const categoryLine = `    <itunes:category text="${xmlEscape(channel.category)}" />`;

    const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        `<rss version="2.0" xmlns:itunes="${ITUNES_NS}" xmlns:content="${CONTENT_NS}">`,
        '  <channel>',
        `    <title>${cdata(channel.title)}</title>`,
        `    <description>${cdata(channel.description)}</description>`,
        `    <language>${xmlEscape(channel.language)}</language>`,
        `    <link>${xmlEscape(channel.link)}</link>`,
        `    <lastBuildDate>${xmlEscape(lastBuild)}</lastBuildDate>`,
        `    <itunes:author>${cdata(channel.author)}</itunes:author>`,
        `    <itunes:explicit>${explicitVal(channel.explicit)}</itunes:explicit>`,
        categoryLine,
        `    <itunes:image href="${xmlEscape(channel.image)}" />`,
        '    <itunes:owner>',
        `      <itunes:name>${cdata(channel.ownerName ?? channel.author)}</itunes:name>`,
        `      <itunes:email>${xmlEscape(channel.ownerEmail ?? channel.email)}</itunes:email>`,
        '    </itunes:owner>',
        items,
        '  </channel>',
        '</rss>',
        '',
    ].filter(line => line !== '').join('\n');

    return xml;
}

export { xmlEscape };
