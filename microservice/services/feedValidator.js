/**
 * Apple Podcasts feed validator.
 *
 * PURE: takes a feed.xml string (and optionally the channel metadata used to
 * build it, for the square-image-dimension check which XML alone cannot prove)
 * and returns { pass, violations[] }.
 *
 * Validates the requirements named in the WS-SSGPOD AC:
 *   Channel: RSS2.0 + xmlns:itunes, title, description, language,
 *     itunes:category, itunes:explicit, itunes:image (square 1400-3000px),
 *     itunes:owner(email), itunes:author, link.
 *   Item: enclosure(url, length-bytes, type=audio/mpeg), stable guid
 *     (isPermaLink=false), RFC-822 pubDate, itunes:duration, content:encoded.
 *
 * This is a structural validator (regex/extraction based) — it does not fetch a
 * DTD. The image-dimension rule is checked against caller-supplied dimensions
 * when present (imageDims = { width, height }); otherwise it is reported as
 * "unverified" rather than silently passing.
 */

const ITUNES_NS = 'http://www.itunes.com/dtds/podcast-1.0.dtd';
const CONTENT_NS = 'http://purl.org/rss/1.0/modules/content/';
const RFC822_RE = /^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} (GMT|[+-]\d{4})$/;

function extractAll(xml, tagRe) {
    const out = [];
    let m;
    while ((m = tagRe.exec(xml)) !== null) out.push(m);
    return out;
}

function getChannelBlock(xml) {
    const m = xml.match(/<channel>([\s\S]*?)<\/channel>/);
    return m ? m[1] : '';
}

function getItemBlocks(xml) {
    return extractAll(xml, /<item>([\s\S]*?)<\/item>/g).map(m => m[1]);
}

/**
 * @param {string} feedXml
 * @param {Object} [opts] - { imageDims: {width,height} } for the square-art check
 * @returns {{ pass: boolean, violations: string[] }}
 */
export function validateFeed(feedXml, opts = {}) {
    const violations = [];
    if (typeof feedXml !== 'string' || feedXml.trim() === '') {
        return { pass: false, violations: ['feed is empty'] };
    }

    // RSS 2.0 + itunes namespace.
    if (!/<rss[^>]*\bversion="2\.0"/.test(feedXml)) {
        violations.push('missing RSS version="2.0"');
    }
    if (!feedXml.includes(`xmlns:itunes="${ITUNES_NS}"`)) {
        violations.push('missing xmlns:itunes namespace declaration');
    }
    if (!feedXml.includes(`xmlns:content="${CONTENT_NS}"`)) {
        violations.push('missing xmlns:content namespace declaration');
    }

    const channel = getChannelBlock(feedXml);
    if (!channel) {
        violations.push('missing <channel> element');
        return { pass: false, violations };
    }

    // Channel-required fields.
    const channelChecks = [
        ['channel <title>', /<title>[\s\S]*?<\/title>/],
        ['channel <description>', /<description>[\s\S]*?<\/description>/],
        ['channel <language>', /<language>[\s\S]*?<\/language>/],
        ['channel <link>', /<link>[\s\S]*?<\/link>/],
        ['channel <itunes:author>', /<itunes:author>[\s\S]*?<\/itunes:author>/],
        ['channel <itunes:explicit>', /<itunes:explicit>[\s\S]*?<\/itunes:explicit>/],
        ['channel <itunes:category>', /<itunes:category[^>]*text="[^"]+"/],
        ['channel <itunes:image>', /<itunes:image[^>]*href="[^"]+"/],
        ['channel <itunes:owner>', /<itunes:owner>[\s\S]*?<\/itunes:owner>/],
    ];
    for (const [name, re] of channelChecks) {
        if (!re.test(channel)) violations.push(`missing ${name}`);
    }

    // itunes:explicit must be true/false (or legacy yes/no).
    const explicitM = channel.match(/<itunes:explicit>([\s\S]*?)<\/itunes:explicit>/);
    if (explicitM && !/^(true|false|yes|no)$/.test(explicitM[1].trim())) {
        violations.push(`channel itunes:explicit must be true/false (got "${explicitM[1].trim()}")`);
    }

    // itunes:owner must contain an email.
    const ownerM = channel.match(/<itunes:owner>([\s\S]*?)<\/itunes:owner>/);
    if (ownerM) {
        if (!/<itunes:email>\s*[^<\s][^<]*@[^<]+<\/itunes:email>/.test(ownerM[1])) {
            violations.push('itunes:owner missing a valid <itunes:email>');
        }
    }

    // Square image dimension check (1400-3000px). XML cannot prove this; use caller dims.
    if (opts.imageDims && typeof opts.imageDims.width === 'number') {
        const { width, height } = opts.imageDims;
        if (width !== height) {
            violations.push(`itunes:image must be square (got ${width}x${height})`);
        }
        if (width < 1400 || width > 3000) {
            violations.push(`itunes:image must be 1400-3000px (got ${width}px)`);
        }
    } else {
        violations.push('itunes:image dimensions unverified (provide imageDims {width,height} to validate square 1400-3000px)');
    }

    // Items.
    const items = getItemBlocks(feedXml);
    if (items.length === 0) {
        violations.push('feed contains no <item> elements');
    }
    items.forEach((item, i) => {
        const tag = `item[${i}]`;

        const enc = item.match(/<enclosure\b([^>]*)\/?>/);
        if (!enc) {
            violations.push(`${tag} missing <enclosure>`);
        } else {
            const attrs = enc[1];
            if (!/\burl="[^"]+"/.test(attrs)) violations.push(`${tag} enclosure missing url`);
            const lenM = attrs.match(/\blength="([^"]*)"/);
            if (!lenM) violations.push(`${tag} enclosure missing length`);
            else if (!/^\d+$/.test(lenM[1]) || Number(lenM[1]) <= 0) {
                violations.push(`${tag} enclosure length must be positive byte count (got "${lenM[1]}")`);
            }
            const typeM = attrs.match(/\btype="([^"]*)"/);
            if (!typeM) violations.push(`${tag} enclosure missing type`);
            else if (typeM[1] !== 'audio/mpeg') violations.push(`${tag} enclosure type must be audio/mpeg (got "${typeM[1]}")`);
        }

        const guidM = item.match(/<guid\b([^>]*)>([\s\S]*?)<\/guid>/);
        if (!guidM) violations.push(`${tag} missing <guid>`);
        else {
            if (!/isPermaLink="false"/.test(guidM[1])) violations.push(`${tag} guid must have isPermaLink="false"`);
            if (guidM[2].trim() === '') violations.push(`${tag} guid is empty`);
        }

        const pubM = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
        if (!pubM) violations.push(`${tag} missing <pubDate>`);
        else if (!RFC822_RE.test(pubM[1].trim())) violations.push(`${tag} pubDate is not RFC-822 (got "${pubM[1].trim()}")`);

        if (!/<itunes:duration>[\s\S]*?<\/itunes:duration>/.test(item)) {
            violations.push(`${tag} missing <itunes:duration>`);
        }
        if (!/<content:encoded>[\s\S]*?<\/content:encoded>/.test(item)) {
            violations.push(`${tag} missing <content:encoded>`);
        }
        if (!/<title>[\s\S]*?<\/title>/.test(item)) {
            violations.push(`${tag} missing <title>`);
        }
    });

    return { pass: violations.length === 0, violations };
}
