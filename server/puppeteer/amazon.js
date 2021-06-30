const puppeteer = require("puppeteer");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const amazonController = {};

amazonController.getAmazon = (req, res, next) => {
  res.locals.scraped = {};
  async function scrapeAmazon(url) {
    try {
      let browser;
      const customArgs = [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-infobars",
        "--disable-features=site-per-process",
        "--window-position=0,0",
        "--disable-extensions",
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X   10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0    Safari/537.36"',
      ];
      const output = [];
      // allowed to get past amazon bot catcher
      browser = await puppeteer.launch({
        headless: true,
        args: customArgs,
      });
      // probably not a necessary line
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 800 });
      // wait until page loads and if it doesn't after timeout, stop
      await page.goto(url, {
        waitUntil: "load",
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
      const dollarArr = [];
      const centsArr = [];
      // pushed item title into array
      let promise = new Promise((resolve, reject) => {
        dom.window.document
          .querySelectorAll(".a-size-mini.a-spacing-none.a-color-base")
          .forEach((link) => {
            count += 1;
            //console.log(link.textContent, "count ", count);
            titleArr.push(link.textContent);
          });

        let priceCount = 0;

        dom.window.document
          .querySelectorAll(".a-price-whole")
          .forEach((link) => {
            priceCount += 1;
            //console.log(link.textContent, "count ", priceCount);
            dollarArr.push(link.textContent);
          });
        dom.window.document
          .querySelectorAll(".a-price-fraction")
          .forEach((decimal, i) => {
            centsArr.push(decimal.textContent);
          });

        for (let i = 0; i < dollarArr.length; i += 1) {
          priceArr.push(dollarArr[i] + centsArr[i]);
        }

        dom.window.document.querySelectorAll(".s-image").forEach((link) => {
          //console.log(link.src, "count ", imageCount);
          imgArr.push(link.src);
        });

        dom.window.document
          .querySelectorAll(".a-link-normal.a-text-normal")
          .forEach((link) => {
            linkArr.push(link.href);
          });

        newLinkArr = [];

        for (let i = 0; i < linkArr.length; i += 2) {
          newLinkArr.push(linkArr[i]);
        }
        // for loop creates an object
        for (let i = 0; i < 10; i++) {
          priceArr[i] = priceArr[i].replace(",", "");
          let totalsObj = {
            id: "amazon" + [i],
            title: titleArr[i],
            price: `$${priceArr[i]}`,
            imgSrc: imgArr[i],
            link: `https://www.amazon.com` + newLinkArr[i],
          };
          // array of objects
          output.push(totalsObj);
        }

        // console.log(output);
        resolve(output);
      });
      await browser.close();

      // add output onto res.locals.scraped
      // return next
      res.locals.scraped.amazon = output;
      return next();
    } catch (err) {
      console.log("error inside amazon.js: ", err);
      return next(err);
    }

    // await return output or store output on res.locals
  }
  let item = req.body.item;
  scrapeAmazon(`https://www.amazon.com/s?k=${item}&ref=nb_sb_noss_2`);
};

// module.exports = { scrapeAmazon };
module.exports = amazonController;
