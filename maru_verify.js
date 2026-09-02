const { chromium } = require('C:/Users/HP/OneDrive/Desktop/MARU TRAVEL INDIA/node_modules/playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 800 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8123/index.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => { window.changeLanguage && window.changeLanguage('ko'); });
  await page.waitForTimeout(1000);
  await page.click('.mc-fab');
  await page.waitForTimeout(800);
  const result = await page.evaluate(() => {
    var h = document.querySelector('.mc-header-name'); var header = h ? h.textContent : 'NO';
    var cats = document.querySelectorAll('.mc-option-btn'); var catTexts = []; cats.forEach(function (c) { catTexts.push(c.textContent.trim()); });
    var input = document.querySelector('.mc-input'); var ph = input ? input.placeholder : 'NO';
    var wa = document.querySelector('.mc-wa-btn'); var waFound = !!wa;
    var tip = document.querySelectorAll('.mc-msg.bot').length;
    return { header: header, cats: catTexts, ph: ph, waFound: waFound, botMsgs: tip };
  });
  console.log('HEADER:', result.header);
  console.log('CATEGORIES:', result.cats.join(' | '));
  console.log('INPUT PH:', result.ph);
  console.log('WA BTN:', result.waFound);
  console.log('BOT MSGS:', result.botMsgs);
  await browser.close();
})().catch(e => { console.error(e.message); process.exit(1); });