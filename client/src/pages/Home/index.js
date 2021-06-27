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

  return (
    <Grid
      container
      className={classes.root}
      direction="column"
      justify="center"
      alignContent="center">
      <Search />
      <Grid container direction="row" justify="center" alignContent="center">
        <RetailList
          retailer="ebay"
          logo={<EbayLogo />}
          productData={fakeEbayData}
        />
        <RetailList
          retailer="amazon"
          logo={<AmazonLogo />}
          productData={fakeAmazonData}
        />
        <RetailList
          retailer="target"
          logo={<TargetLogo />}
          productData={fakeTargetData}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
