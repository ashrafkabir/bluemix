const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const pathMod = require('path');

const WIDTH = 1280;
const HEIGHT = 720;
const PORT = 9888;
const DIST = '/home/user/bluemix/dist';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

const mimeTypes = {
  '.html': 'text/html', '.js': 'application/javascript',
  '.css': 'text/css', '.svg': 'image/svg+xml',
  '.json': 'application/json', '.png': 'image/png',
};

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  let filePath = pathMod.join(DIST, url === '/' ? 'index.html' : url);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = pathMod.join(DIST, 'index.html');
  }
  const ext = pathMod.extname(filePath);
  const ct = mimeTypes[ext] || 'application/octet-stream';
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': ct });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

async function smoothScroll(page, targetY, dur = 2000, steps = 50) {
  const curY = await page.evaluate(() => window.scrollY);
  const delta = targetY - curY;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const ease = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
    await page.evaluate(y => window.scrollTo(0, y), Math.round(curY + delta * ease));
    await sleep(dur / steps);
  }
}

server.listen(PORT, '127.0.0.1', async () => {
  console.log('Server started on port', PORT);

  try {
    console.log('Launching browser...');
    const browser = await chromium.launch({
      headless: true,
      executablePath: '/root/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--no-proxy-server',
      ],
    });

    const context = await browser.newContext({
      viewport: { width: WIDTH, height: HEIGHT },
      recordVideo: { dir: '/home/user/bluemix/recordings', size: { width: WIDTH, height: HEIGHT } },
    });
    const page = await context.newPage();

    // 1. Product list
    console.log('1/7 Product List...');
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(3000);
    await page.screenshot({ path: '/home/user/bluemix/recordings/screenshot-list.png' });
    console.log('Screenshot saved');

    // Scroll product list
    await smoothScroll(page, 400, 2000);
    await sleep(1000);
    await smoothScroll(page, 0, 1500);
    await sleep(800);

    // 2. Navigate to first product
    console.log('2/7 Product showcase...');
    await page.goto(`http://127.0.0.1:${PORT}/product/simpull-thhn-thwn2-copper`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(4000);
    await page.screenshot({ path: '/home/user/bluemix/recordings/screenshot-showcase.png' });

    // 3. Scroll rotation
    console.log('3/7 Scroll rotation...');
    const totalH = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);
    console.log('Total scrollable height:', totalH);
    await smoothScroll(page, totalH * 0.2, 2500);
    await sleep(1200);

    // 4. Pre-explosion
    console.log('4/7 Approaching explosion...');
    await smoothScroll(page, totalH * 0.45, 2000);
    await sleep(1500);
    await page.screenshot({ path: '/home/user/bluemix/recordings/screenshot-preexplode.png' });

    // 5. Full explosion
    console.log('5/7 Explosion...');
    await smoothScroll(page, totalH * 0.7, 2500);
    await sleep(2500);
    await page.screenshot({ path: '/home/user/bluemix/recordings/screenshot-exploded.png' });

    // 6. Back up
    console.log('6/7 Scrolling back...');
    await smoothScroll(page, 0, 2500);
    await sleep(1500);

    // 7. Admin panel
    console.log('7/7 Admin panel...');
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await sleep(1500);
    await page.goto(`http://127.0.0.1:${PORT}/admin`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await sleep(2500);
    await page.screenshot({ path: '/home/user/bluemix/recordings/screenshot-admin.png' });

    console.log('Saving video...');
    const video = page.video();
    await context.close();
    if (video) {
      const vPath = await video.path();
      console.log('Video at:', vPath);
      fs.copyFileSync(vPath, '/home/user/bluemix/recordings/demo.webm');
      console.log('Copied to recordings/demo.webm');
    }
    await browser.close();
  } catch (e) {
    console.error('Fatal:', e.message);
    console.error(e.stack);
  }

  server.close();
  console.log('Done!');
});
