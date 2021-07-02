const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const targetController = {};

targetController.getTarget = (req, res, next) => {
  const preparePageForTests = async (page) => {
    // Pass the User-Agent Test.
    const userAgent =
      'Mozilla/5.0 (X11; Linux x86_64)' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
    await page.setUserAgent(userAgent);
  };

  async function scrapeTarget(url) {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await preparePageForTests(page);
      page.setDefaultTimeout(70000);
      await page.goto(url);

      //await page.waitForSelector("img");

      await autoScroll(page);

      // const search = await page.$$eval(
      //   ".Link__StyledLink-sc-4b9qcv-0 styles__StyledTitleLink-h3r0um-1",
      //   (e) => e.innerText
      // );

      const sItemPrice = await page.evaluate(() =>
        Array.from(
          document.getElementsByClassName(
            'styles__ProductCardPriceAndPromoStyled-sc-1p9w55v-0'
          ),

          (e) => e.innerHTML.replace(/[^0-9\.]+/g, '').substring(0, 5)
        )
      );

      const sItemTitle = await page.evaluate(() =>
        Array.from(
          document.getElementsByClassName(
            'Link__StyledLink-sc-4b9qcv-0 styles__StyledTitleLink-h3r0um-1'
          ),
          (e) => e.innerText
        )
      );

      const image = await page.evaluate(() =>
        Array.from(
          document.getElementsByClassName(
            'media__ScalableImage-sc-1ea3f06-0 jDKgFl'
          ),
          (e) => e.src
        )
      );

      const linkArr = await page.evaluate(() =>
        Array.from(
          document.getElementsByClassName('styles__StyledTitleLink-h3r0um-1'),
          (e) => e.href
        )
      );

      let output = [];

      const removeStr = '<span class="LIGHT_HIGHLIGHT">New Listing</span>';

      const removeStr2 = '<span class="BOLD">';
      const removeStr3 = '</span>';

      for (let i = 0; i < 10; i++) {
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

        let titlePriceObj = {
          id: 'target' + [i],
          title:
            sItemTitle[i].length > 50
              ? sItemTitle[i].substring(0, 50)
              : sItemTitle[i],
          price: `$${sItemPrice[i]}`,
          imgSrc: image[i],
          link: linkArr[i],
          retailer: 'Target',
        };

        output.push(titlePriceObj);
      }

      // console.log(output);

      browser.close();
      loaded = true;

      async function autoScroll(page) {
        await page.evaluate(async () => {
          await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if (totalHeight >= scrollHeight) {
                clearInterval(timer);
                resolve();
              }
            }, 50);
          });
        });
      }

      res.locals.scraped.target = output;
      return next();
    } catch (err) {
      console.log('error inside target.js: ', err);
      return next(err);
    }
  }
  let item = req.body.item;
  scrapeTarget(`https://www.target.com/s?searchTerm=${item}`);
};
//example func
// scrapeTarget("https://www.target.com/s?searchTerm=video+games");

module.exports = targetController;

////////////////////////////////////////////////////////

// const puppeteer = require("puppeteer");
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// const targetController = {};

// targetController.getTarget = (req, res, next) => {
//   let output = [];
//   try {
//     const preparePageForTests = async (page) => {
//       // Pass the User-Agent Test.
//       const userAgent =
//         "Mozilla/5.0 (X11; Linux x86_64)" +
//         "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
//       await page.setUserAgent(userAgent);
//     };

//     async function scrapeTarget(url) {
//       try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await preparePageForTests(page);
//         page.setDefaultTimeout(70000);
//         await page.goto(url, { waituntil: "load" });

//         //await page.waitForSelector("img");

//         await autoScroll(page);
//         const htmlContent = await page.content();
//         const dom = new JSDOM(htmlContent);
//         console.log(htmlContent);

//         const sItemPrice = [];
//         const sItemTitle = [];
//         const image = [];
//         const linkArr = [];

//         //price arr
//         dom.window.document
//           .querySelectorAll(
//             ".styles__ProductCardPriceAndPromoStyled-sc-1p9w55v-0"
//           )
//           .forEach((link) => {
//             //console.log(link.textContent, "count ", count);
//             link = link.innerHTML.replace(/[^0-9\.]+/g, "").substring(0, 5);
//             sItemPrice.push(link);
//           });

//         //title arr

//         dom.window.document
//           .querySelectorAll(".styles__StyledTitleLink-h3r0um-1")
//           .forEach((link) => {
//             //console.log(link.textContent, "count ", count);
//             sItemTitle.push(link.innerHTML);
//           });

//         //image src

//         dom.window.document
//           .querySelectorAll(".media__ScalableImage-sc-1ea3f06-0")
//           .forEach((link) => {
//             image.push(link.src);
//           });

//         //link arr

//         dom.window.document
//           .querySelectorAll(".h-display-flex > a")
//           .forEach((a) => {
//             linkArr.push("http://target.com" + a.href);
//           });

//         const removeStr = '<span class="LIGHT_HIGHLIGHT">New Listing</span>';

//         const removeStr2 = '<span class="BOLD">';
//         const removeStr3 = "</span>";

//         for (let i = 0; i < 10; i++) {
//           //regexes to remove stray html that didn't get filtered out, might need adjustment
//           const tester = new RegExp(removeStr, "g");
//           const tester2 = new RegExp(removeStr2, "g");
//           const tester3 = new RegExp(removeStr3, "g");

//           // if (sItemTitle[i].includes(removeStr)) {
//           //   sItemTitle[i] = sItemTitle[i].replace(tester, "");
//           // }

//           // if (sItemTitle[i].includes(removeStr2)) {
//           //   sItemTitle[i] = sItemTitle[i].replace(tester2, "");
//           // }

//           // if (sItemTitle[i].includes(removeStr3)) {
//           //   sItemTitle[i] = sItemTitle[i].replace(tester3, "");
//           // }

//           let titlePriceObj = {
//             id: "target" + [i],
//             title: sItemTitle[i],
//             price: `$${sItemPrice[i]}`,
//             imgSrc: image[i],
//             link: linkArr[i],
//             retailer: "Target",
//           };
//           //console.log(output);
//           output.push(titlePriceObj);
//         }

//         // console.log(output);

//         await browser.close();

//         res.locals.scraped.target = output;
//         return next();
//       } catch (err) {
//         console.log("error inside target.js: ", err);
//         return next(err);
//       }

//       let item = req.body.item;
//       scrapeTarget(`https://www.target.com/s?searchTerm=${item}`);

//       async function autoScroll(page) {
//         await page.evaluate(async () => {
//           await new Promise((resolve, reject) => {
//             var totalHeight = 0;
//             var distance = 100;
//             var timer = setInterval(() => {
//               var scrollHeight = document.body.scrollHeight;
//               window.scrollBy(0, distance);
//               totalHeight += distance;

//               if (totalHeight >= scrollHeight) {
//                 clearInterval(timer);
//                 resolve();
//               }
//             }, 20);
//           });
//         });
//       }

//     console.log(output);
//     res.locals.scraped.target = output;
//     return next()

// };
// //example func
// // scrapeTarget("https://www.target.com/s?searchTerm=video+games");

// // const preparePageForTests = async (page) => {
// //   // Pass the User-Agent Test.
// //   const userAgent =
// //     "Mozilla/5.0 (X11; Linux x86_64)" +
// //     "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
// //   await page.setUserAgent(userAgent);
// // };

// // async function scrapeTarget(url) {
// //   try {
// //     const browser = await puppeteer.launch();
// //     const page = await browser.newPage();
// //     await preparePageForTests(page);
// //     page.setDefaultTimeout(70000);
// //     await page.goto(url, { waituntil: "load" });

// //     //await page.waitForSelector("img");

// //     await autoScroll(page);
// //     const htmlContent = await page.content();
// //     const dom = new JSDOM(htmlContent);
// //     console.log(htmlContent);
// //     // await page.screenshot({
// //     //   path: "screenshot.png",
// //     //   fullPage: true,
// //     // });

// //     // const search = await page.$$eval(
// //     //   ".Link__StyledLink-sc-4b9qcv-0 styles__StyledTitleLink-h3r0um-1",
// //     //   (e) => e.innerText
// //     // );

// //     // const sItemPrice = await page.evaluate(() =>
// //     //   Array.from(
// //     //     document.getElementsByClassName(
// //     //       "styles__ProductCardPriceAndPromoStyled-sc-1p9w55v-0"
// //     //     ),

// //     //     (e) => e.innerHTML.replace(/[^0-9\.]+/g, "").substring(0, 5)
// //     //   )
// //     // );

// //     // const sItemTitle = await page.evaluate(() =>
// //     //   Array.from(
// //     //     document.getElementsByClassName(
// //     //       "Link__StyledLink-sc-4b9qcv-0 styles__StyledTitleLink-h3r0um-1"
// //     //     ),
// //     //     (e) => e.innerText
// //     //   )
// //     // );

// //     // const image = await page.evaluate(() =>
// //     //   Array.from(
// //     //     document.getElementsByClassName(
// //     //       "media__ScalableImage-sc-1ea3f06-0 jDKgFl"
// //     //     ),
// //     //     (e) => e.src
// //     //   )
// //     // );

// //     // const linkArr = await page.evaluate(() =>
// //     //   Array.from(
// //     //     document.getElementsByClassName("styles__StyledTitleLink-h3r0um-1"),
// //     //     (e) => e.href
// //     //   )
// //     // );

// //     const sItemPrice = [];
// //     const sItemTitle = [];
// //     const image = [];
// //     const linkArr = [];

// //     //price arr
// //     dom.window.document
// //       .querySelectorAll(".styles__ProductCardPriceAndPromoStyled-sc-1p9w55v-0")
// //       .forEach((link) => {
// //         //console.log(link.textContent, "count ", count);
// //         link = link.innerHTML.replace(/[^0-9\.]+/g, "").substring(0, 5);
// //         sItemPrice.push(link);
// //       });

// //     //title arr

// //     dom.window.document
// //       .querySelectorAll(".styles__StyledTitleLink-h3r0um-1")
// //       .forEach((link) => {
// //         //console.log(link.textContent, "count ", count);
// //         sItemTitle.push(link.innerHTML);
// //       });

// //     //image src

// //     dom.window.document
// //       .querySelectorAll(".media__ScalableImage-sc-1ea3f06-0")
// //       .forEach((link) => {
// //         image.push(link.src);
// //       });

// //     //link arr

// //     dom.window.document.querySelectorAll(".h-display-flex > a").forEach((a) => {
// //       linkArr.push("http://target.com" + a.href);
// //     });

// //     let output = [];

// //     const removeStr = '<span class="LIGHT_HIGHLIGHT">New Listing</span>';

// //     const removeStr2 = '<span class="BOLD">';
// //     const removeStr3 = "</span>";

// //     for (let i = 0; i < 10; i++) {
// //       //regexes to remove stray html that didn't get filtered out, might need adjustment
// //       const tester = new RegExp(removeStr, "g");
// //       const tester2 = new RegExp(removeStr2, "g");
// //       const tester3 = new RegExp(removeStr3, "g");

// //       // if (sItemTitle[i].includes(removeStr)) {
// //       //   sItemTitle[i] = sItemTitle[i].replace(tester, "");
// //       // }

// //       // if (sItemTitle[i].includes(removeStr2)) {
// //       //   sItemTitle[i] = sItemTitle[i].replace(tester2, "");
// //       // }

// //       // if (sItemTitle[i].includes(removeStr3)) {
// //       //   sItemTitle[i] = sItemTitle[i].replace(tester3, "");
// //       // }

// //       let titlePriceObj = {
// //         id: "target" + [i],
// //         title: sItemTitle[i],
// //         price: `$${sItemPrice[i]}`,
// //         imgSrc: image[i],
// //         link: linkArr[i],
// //         retailer: "Target",
// //       };
// //       console.log(output);
// //       output.push(titlePriceObj);
// //     }

// //     // console.log(output);

// //     await browser.close();

// //     //res.locals.scraped.target = output;
// //     //return next();
// //   } catch (err) {
// //     console.log("error inside target.js: ", err);
// //     //return next(err);
// //   }

// //   async function autoScroll(page) {
// //     await page.evaluate(async () => {
// //       await new Promise((resolve, reject) => {
// //         var totalHeight = 0;
// //         var distance = 100;
// //         var timer = setInterval(() => {
// //           var scrollHeight = document.body.scrollHeight;
// //           window.scrollBy(0, distance);
// //           totalHeight += distance;

// //           if (totalHeight >= scrollHeight) {
// //             clearInterval(timer);
// //             resolve();
// //           }
// //         }, 20);
// //       });
// //     });
// //   }
// // }

// //scrapeTarget("https://www.target.com/s?searchTerm=video+games");

// module.exports = targetController;
