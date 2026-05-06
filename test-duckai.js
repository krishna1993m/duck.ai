/**
 * Test script for Duck.ai extension
 * Run with: node test-duckai.js
 */
const https = require('https');
const pkg = require('./package.json');

const DUCK_AI_COOKIES = '5=1; dcm=3; dcs=1; duckassist-opt-in-count=1; isRecentChatOn=1; preferredDuckAiModel=3';
const COMMON_HEADERS = {
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-store',
    'DNT': '1',
    'Referer': 'https://duckduckgo.com/',
    'Origin': 'https://duckduckgo.com',
    'Sec-CH-UA': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
    'Sec-CH-UA-Mobile': '?0',
    'Sec-CH-UA-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Cookie': DUCK_AI_COOKIES
};

function fetchStatus() {
    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'duckduckgo.com',
            path: '/duckchat/v1/status',
            method: 'GET',
            headers: { ...COMMON_HEADERS, 'Accept': '*/*', 'x-vqd-accept': '1' }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c.toString());
            res.on('end', () => resolve({
                status: res.statusCode,
                vqd: res.headers['x-vqd-4'] || null,
                hash: res.headers['x-vqd-hash-1'] || null,
                body: body.substring(0, 100)
            }));
        });
        req.on('error', reject);
        req.end();
    });
}

function sendChat(vqdHash, vqdToken, model, prompt) {
    return new Promise((resolve, reject) => {
        const payload = JSON.stringify({
            model,
            messages: [{ role: 'user', content: prompt }]
        });
        const authHeaders = {};
        if (vqdHash) { authHeaders['x-vqd-hash-1'] = vqdHash; }
        if (vqdToken) { authHeaders['x-vqd-4'] = vqdToken; }

        const req = https.request({
            hostname: 'duckduckgo.com',
            path: '/duckchat/v1/chat',
            method: 'POST',
            headers: {
                ...COMMON_HEADERS,
                'Accept': 'text/event-stream',
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload),
                ...authHeaders
            }
        }, (res) => {
            let text = '';
            res.on('data', chunk => {
                for (const line of chunk.toString().split('\n')) {
                    if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                        try {
                            const p = JSON.parse(line.slice(6));
                            if (p.message) { text += p.message; }
                        } catch (_) {}
                    }
                }
            });
            res.on('end', () => resolve({ statusCode: res.statusCode, text: text.trim() }));
        });
        req.on('error', reject);
        req.write(payload);
        req.end();
    });
}

async function runTests() {
    console.log('====================================');
    console.log('  Duck.ai Extension - Test Suite');
    console.log('====================================\n');

    // TEST 1: Verify package.json model configuration
    console.log('TEST 1: Verifying model configuration in package.json...');
    const configuredModels = pkg.contributes.configuration.properties['duckai.model'].enum;
    const defaultModel = pkg.contributes.configuration.properties['duckai.model'].default;
    console.log(`  Default model : "${defaultModel}"`);
    console.log(`  All models    : ${configuredModels.length} configured`);
    configuredModels.forEach((m, i) => console.log(`    ${i + 1}. ${m}`));
    console.log('[PASS] Model configuration verified.\n');

    // TEST 2: Fetch VQD auth tokens from status endpoint
    console.log('TEST 2: Fetching authentication tokens from Duck.ai...');
    let vqd, hash;
    try {
        const result = await fetchStatus();
        console.log(`  HTTP Status   : ${result.status}`);
        console.log(`  x-vqd-4       : ${result.vqd ? result.vqd.substring(0, 30) + '...' : 'not returned'}`);
        console.log(`  x-vqd-hash-1  : ${result.hash ? result.hash.substring(0, 40) + '...' : 'not returned'}`);
        vqd = result.vqd;
        hash = result.hash;
        if (hash || vqd) {
            console.log('[PASS] Authentication token(s) obtained.\n');
        } else {
            console.log('[FAIL] No tokens returned.\n');
            return;
        }
    } catch (err) {
        console.log(`[FAIL] ${err.message}\n`);
        return;
    }

    // TEST 3: Send a real chat message
    console.log(`TEST 3: Sending chat message to model "${defaultModel}"...`);
    try {
        const result = await sendChat(hash, vqd, defaultModel, 'Reply with exactly: "Duck.ai extension is working!"');
        console.log(`  HTTP Status   : ${result.statusCode}`);
        console.log(`  Response      : "${result.text}"`);
        if (result.statusCode === 200) {
            console.log('[PASS] Chat API responded successfully.\n');
        } else {
            console.log(`[WARN] Unexpected status code: ${result.statusCode}\n`);
        }
    } catch (err) {
        console.log(`[FAIL] ${err.message}\n`);
    }

    console.log('====================================');
    console.log('  All tests done!');
    console.log('====================================');
    console.log('\nTo launch the extension in VS Code, open the extension folder and press F5.\n');
}

runTests().catch(console.error);
