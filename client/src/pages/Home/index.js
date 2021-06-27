import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RetailList from '../../components/RetailList';
import Search from './Search';
import AmazonLogo from '../../components/logos/AmazonLogo';
import EbayLogo from '../../components/logos/EbayLogo';
import WalmartLogo from '../../components/logos/WalmartLogo';
import { fakeData } from './fakeData'; // This should come from store state.

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
      <RetailList logo={<EbayLogo />} productData={fakeData}  />
    </Grid>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(index);
