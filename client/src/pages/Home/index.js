import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RetailList from '../../components/RetailList';
import Search from './Search';
import AmazonLogo from '../../components/logos/AmazonLogo';
import EbayLogo from '../../components/logos/EbayLogo';
import TargetLogo from '../../components/logos/TargetLogo';

// This should come from store state.
import { fakeAmazonData } from '../../fakeData/fakeAmazonData';
import { fakeEbayData } from '../../fakeData/fakeEbayData';
import { fakeTargetData } from '../../fakeData/fakeTargetData';
const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(10, 0),
  },
}));

export const index = props => {
  const classes = useStyles();
  const retailers = ['Amazon', 'eBay', 'Target'];
  const retailerLogos = [<AmazonLogo />, <EbayLogo />, <TargetLogo />];
  const fakeData = [fakeAmazonData, fakeEbayData, fakeTargetData];

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
            retailer={retailer.toLowerCase()}
            logo={retailerLogos[index]}
            productData={fakeData[index]}
          />
        ))}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
