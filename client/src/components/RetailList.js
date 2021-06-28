import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import * as actionCreators from '../actions/actionCreators';
import RetailItem from './RetailItem';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
}));

function RetailList({
  retailer,
  logo,
  productData,
  addFavorite,
  removeFavorite,
}) {
  const classes = useStyles();
  return (
    <ul className={classes.root}>
      {productData.map(product => (
        <RetailItem
          key={product.id}
          currentItemId={product.id}
          title={product.title}
          price={product.price}
          image={product.img}
          retailer={retailer}
          logo={logo}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      ))}
    </ul>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addFavorite: actionCreators.addFavorite,
      removeFavorite: actionCreators.removeFavorite,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(RetailList);
