import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RetailList from '../../components/RetailList';
import Search from './Search';
import AmazonLogo from '../../components/logos/AmazonLogo'
import EbayLogo from '../../components/logos/EbayLogo'
import TargetLogo from '../../components/logos/TargetLogo'

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(10, 0),
  },
}));

function HomePage({ amazonProducts, ebayProducts, targetProducts }) {
  const classes = useStyles();
  const retailers = ['Amazon', 'eBay', 'Target'];
  const retailerLogos = [<AmazonLogo />, <EbayLogo />, <TargetLogo />];
  const productData = [amazonProducts, ebayProducts, targetProducts];

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="center"
      alignContent="center">
      <Search retailers={retailers} retailerLogos={retailerLogos} />
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

const mapStateToProps = state => ({
  amazonProducts: state.products.amazonProducts,
  ebayProducts: state.products.ebayProducts,
  targetProducts: state.products.targetProducts,
});

export default connect(mapStateToProps, null)(HomePage);
