import React from "react";
import Grid from "@material-ui/core/Grid";
import RetailList from "./RetailList";
import Search from "../pages/Home/Search";
import AmazonLogo from "./logos/AmazonLogo";
import EbayLogo from "./logos/EbayLogo";
import TargetLogo from "./logos/TargetLogo";
import { useStyles } from "../pages/Home/index";

export function DisplayGrid({
  amazonProducts,
  ebayProducts,
  targetProducts,
  withSearch,
}) {
  const classes = useStyles();
  const retailers = ["Amazon", "eBay", "Target"];
  const retailerLogos = [<AmazonLogo />, <EbayLogo />, <TargetLogo />];
  const productData = [amazonProducts, ebayProducts, targetProducts];

  // useEffect(() => {
  //   axios
  //     .get("/")
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="center"
      alignContent="center"
    >
      {withSearch && (
        <Search retailers={retailers} retailerLogos={retailerLogos} />
      )}

      <Grid container direction="row" justify="center" alignContent="center">
        {retailers.map((retailer, index) => (
          <RetailList
            key={`home-${retailer}-${index}`}
            retailer={retailer.toLowerCase()}
            logo={retailerLogos[index]}
            productData={productData[index]}
          />
        ))}
      </Grid>
    </Grid>
  );
}
