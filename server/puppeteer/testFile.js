const { scrapeAmazon } = require("./amazon");
const { scrapeEbay } = require("./ebay");
const { scrapeTarget } = require("./target");

scrapeAmazon(`https://www.amazon.com/s?k=laptop&ref=nb_sb_noss_2`);
scrapeEbay(
  `https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=laptop&_sacat=0`
);
scrapeTarget(
  `https://www.target.com/s?searchTerm=laptop+computer&category=0%7CAll%7Cmatchallpartial%7Call+categories&tref=typeahead%7Cterm%7C0%7Claptop+computer%7C%7C%7C%7Cservice%7C10%7C2%7C0%7Cnormalisation&searchRawTerm=laptop`
);
