const puppeteer = require('puppeteer');

const ebayController = {};

ebayController.getEbay = (req, res, next) => {
  // console.log("Did we get to ebay here?", res.locals);

  // console.log("Did we get to ebay here?", res.locals.scraped);
  const preparePageForTests = async (page) => {
    // Pass the User-Agent Test.
    const userAgent =
      'Mozilla/5.0 (X11; Linux x86_64)' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
  };

  async function scrapeEbay(url) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await preparePageForTests(page);

      await page.goto(url);
      await page.screenshot({ path: 'scrapeEbay.png' });
      //await page.waitForSelector("img");

      const sItemPrice = await page.evaluate(() =>
        Array.from(
          document.getElementsByClassName('s-item__price'),
          (e) => e.innerHTML
        )
      );

      const sItemTitle = await page.evaluate(() =>
        Array.from(
          document.getElementsByClassName('s-item__title'),
          (e) => e.innerHTML
        )
      );

      const image = await page.evaluate(() =>
        Array.from(
          document.getElementsByClassName('s-item__image-img'),
          (e) => e.src
        )
      );

      const link = await page.evaluate(() =>
        Array.from(
          document.getElementsByClassName('s-item__link'),
          (e) => e.href
        )
      );

      let output = [];

      const removeStr = '<span class="LIGHT_HIGHLIGHT">New Listing</span>';

      const removeStr2 = '<span class="BOLD">';
      const removeStr3 = '</span>';

      for (let i = 0; i <= 10; i++) {
        //regexes to remove stray html that didn't get filtered out, might need adjustment
        const tester = new RegExp(removeStr, 'g');
        const tester2 = new RegExp(removeStr2, 'g');
        const tester3 = new RegExp(removeStr3, 'g');

        if (sItemTitle[i].includes(removeStr)) {
          sItemTitle[i] = sItemTitle[i].replace(tester, '');
        }

        if (sItemTitle[i].includes(removeStr2)) {
          sItemTitle[i] = sItemTitle[i].replace(tester2, '');
        }

        if (sItemTitle[i].includes(removeStr3)) {
          sItemTitle[i] = sItemTitle[i].replace(tester3, '');
        }

        if (sItemPrice[i]) {
          sItemPrice[i] = sItemPrice[i].slice(1);
        }

        if (sItemPrice[i] && sItemPrice[i].includes(removeStr3)) {
          let split = sItemPrice[i].split(' ');
          sItemPrice[i] = split[0];
          sItemPrice[i] = sItemPrice[i].replace(/<(.|\n)*?>/g, '');
          // sItemPrice[i] = sItemPrice[i].replace(/^.*[$0-9]+-[0-9]+.*$/g, "");
          //console.log("69 ", sItemPrice[0].substring(1));
        }

        // add in a link

        // const pattern = new RegExp(span, "g");

        // if (sItemPrice[i].match(pattern)) {
        //   sItemPrice[i] = sItemPrice[i].replace(/<(.|\n)*?>/g, "");
        // }

        let titlePriceObj = {
          id: 'ebay' + [i],
          title: sItemTitle[i],
          price: parseFloat(sItemPrice[i]),
          imgSrc: image[i],
          url: link[i],
          retailer: 'Ebay',
        };
        // console.log("What is title priceobj?", titlePriceObj);
        // if (
        //   titlePriceObj.img !== undefined &&
        //   titlePriceObj.price !== NaN &&
        //   titlePriceObj.title.length > 0
        // ) {
        //  ;
        // }
        output.push(titlePriceObj);
      }
      // console.log("What does output look like?", output);
      // console.log(output);

      browser.close();

      res.locals.scraped.ebay = output;
      return next();
    } catch (err) {
      console.log('error inside ebay.js: ', err);
      return next(err);
    }
  }
  let item = req.body.item;
  scrapeEbay(
    `https://www.ebay.com/sch/i.html?_from=R40&_nkw=${item}&_sacat=0&LH_BIN=1&_sop=15`
  );
  //test make sure to comment out
  // scrapeEbay(
  //   "https://www.ebay.com/sch/i.html?_from=R40&_nkw=macbook&_sacat=0&LH_BIN=1&_sop=15"
  // );
};

module.exports = ebayController;
// scrapeEbay(
//   "https://www.ebay.com/sch/i.html?_from=R40&_nkw=macbook&_sacat=0&LH_BIN=1&_sop=15"
// );
