const puppeteer = require("puppeteer");

const preparePageForTests = async (page) => {
  // Pass the User-Agent Test.
  const userAgent =
    "Mozilla/5.0 (X11; Linux x86_64)" +
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36";
  await page.setUserAgent(userAgent);
};

async function scrapeTarget(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await preparePageForTests(page);
  page.setDefaultTimeout(45000);
  await page.goto(url, { waitUntil: "networkidle0" });

  //await page.waitForSelector("img");

  await autoScroll(page);

  await page.screenshot({
    path: "screenshot.png",
    fullPage: true,
  });

  // const search = await page.$$eval(
  //   ".Link__StyledLink-sc-4b9qcv-0 styles__StyledTitleLink-h3r0um-1",
  //   (e) => e.innerText
  // );

  const sItemPrice = await page.evaluate(() =>
    Array.from(
      document.getElementsByClassName(
        "styles__ProductCardPriceAndPromoStyled-sc-1p9w55v-0"
      ),

      (e) => e.innerHTML.replace(/[^0-9\.]+/g, "").substring(0, 5)
    )
  );

  const sItemTitle = await page.evaluate(() =>
    Array.from(
      document.getElementsByClassName(
        "Link__StyledLink-sc-4b9qcv-0 styles__StyledTitleLink-h3r0um-1"
      ),
      (e) => e.innerText
    )
  );

  const image = await page.evaluate(() =>
    Array.from(
      document.getElementsByClassName(
        "media__ScalableImage-sc-1ea3f06-0 jDKgFl"
      ),
      (e) => e.src
    )
  );

  const linkArr = await page.evaluate(() =>
    Array.from(
      document.getElementsByClassName("styles__StyledTitleLink-h3r0um-1"),
      (e) => e.href
    )
  );

  let output = [];

  const removeStr = '<span class="LIGHT_HIGHLIGHT">New Listing</span>';

  const removeStr2 = '<span class="BOLD">';
  const removeStr3 = "</span>";

  for (let i = 0; i < sItemTitle.length; i++) {
    //regexes to remove stray html that didn't get filtered out, might need adjustment
    const tester = new RegExp(removeStr, "g");
    const tester2 = new RegExp(removeStr2, "g");
    const tester3 = new RegExp(removeStr3, "g");

    if (sItemTitle[i].includes(removeStr)) {
      sItemTitle[i] = sItemTitle[i].replace(tester, "");
    }

    if (sItemTitle[i].includes(removeStr2)) {
      sItemTitle[i] = sItemTitle[i].replace(tester2, "");
    }

    if (sItemTitle[i].includes(removeStr3)) {
      sItemTitle[i] = sItemTitle[i].replace(tester3, "");
    }

    let titlePriceObj = {
      id: "target" + [i],
      title: sItemTitle[i],
      price: Number(sItemPrice[i]),
      img: image[i],
      link: linkArr[i],
    };

    output.push(titlePriceObj);
  }

  console.log(output);

  browser.close();
  loaded = true;
}

//example func
//scrapeTarget("https://www.target.com/s?searchTerm=video+games");

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
      }, 100);
    });
  });
}

module.exports = { scrapeTarget };
