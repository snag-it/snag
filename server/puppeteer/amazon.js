const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// url is url to scrape
async function scrapeAmazon(url) {
  let browser;

  const output = [];
  // allowed to get past amazon bot catcher
  browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-infobars',
      '--disable-features=site-per-process',
      '--window-position=0,0',
      '--disable-extensions',
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X   10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0    Safari/537.36"',
    ],
  });
  // probably not a necessary line
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 800 });
  // wait until page loads and if it doesn't after timeout, stop
  await page.goto(url, {
    waitUntil: 'load',
    timeout: 30000,
  });
  // captures all html content and it's stored all as a string
  const htmlContent = await page.content();
  // jsdom lets you parse all the html content as actual html instead of a giant string
  const dom = new JSDOM(htmlContent);
  // count was for debugging
  let count = 0;

  const titleArr = [];
  const priceArr = [];
  const imgArr = [];
  const linkArr = [];
  // pushed item title into array
  dom.window.document.querySelectorAll('.a-size-mini').forEach((link) => {
    count += 1;
    //console.log(link.textContent, "count ", count);
    titleArr.push(link.textContent);
  });

  let priceCount = 0;

  dom.window.document.querySelectorAll('.a-price-whole').forEach((link) => {
    priceCount += 1;
    //console.log(link.textContent, "count ", priceCount);
    priceArr.push(link.textContent);
  });

  let imageCount = 0;

  dom.window.document.querySelectorAll('.s-image').forEach((link) => {
    imageCount += 1;
    //console.log(link.src, "count ", imageCount);
    imgArr.push(link.src);
  });

  dom.window.document.querySelectorAll('.a-link-normal').forEach((link) => {
    linkArr.push(link.href);
  });
  // for loop creates an object
  for (let i = 0; i < imgArr.length; i++) {
    priceArr[i] = priceArr[i].replace(',', '');

    let totalsObj = {
      id: 'amazon' + [i],
      title: titleArr[i],
      price: parseFloat(priceArr[i]),
      imgSrc: imgArr[i],
      link: `https://www.amazon.com` + linkArr[i],
    };
    // array of objects
    output.push(totalsObj);
  }

  console.log(output);

  await browser.close();

  // await return output or store output on res.locals
}

// example invocation
//scrapeAmazon("https://www.amazon.com/s?k=laptop&ref=nb_sb_noss_2");

module.exports = { scrapeAmazon };
