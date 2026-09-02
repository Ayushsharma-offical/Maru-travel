const { chromium } = require('C:/Users/HP/OneDrive/Desktop/MARU TRAVEL INDIA/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8123/index.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => { window.changeLanguage && window.changeLanguage('ko'); });
  await page.waitForTimeout(800);
  await page.waitForSelector('.maru-chatbot-header-info', { timeout: 5000 }).catch(() => {});
  const before = await page.evaluate(() => {
    const h = document.querySelector('.maru-chatbot-header-info');
    return h ? h.innerText.trim() : 'NO-CHATBOT';
  });
  await page.click('.maru-chatbot-btn');
  await page.waitForTimeout(600);
  const opened = await page.evaluate(() => {
    const w = document.querySelector('.maru-chatbot-window');
    return w ? w.classList.contains('active') : false;
  });
  const greeting = await page.evaluate(() => {
    const b = document.querySelector('.maru-chatbot-body');
    return b ? b.innerText.trim().slice(0, 80) : 'NO-BODY';
  });
  console.log('HEADER:', before);
  console.log('OPENED:', opened);
  console.log('GREETING:', greeting);
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });