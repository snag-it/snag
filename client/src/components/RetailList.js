import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import * as actionCreators from '../actions/actionCreators';
import RetailItem from './RetailItem';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
}));

function RetailList({
  retailer,
  logo,
  productData,
  addFavoriteToDB,
  removeFavoriteFromDB,
  markFavorite,
  unmarkFavorite,
}) {
  const classes = useStyles();
  return (
    <ul className={classes.root}>
      {productData.map((product) => (
        <RetailItem
          key={product.id}
          currentItemId={product.id}
          title={product.title}
          price={product.price}
          image={product.imgSrc}
          link={product.link}
          retailer={retailer}
          logo={logo}
          addFavoriteToDB={addFavoriteToDB}
          removeFavoriteFromDB={removeFavoriteFromDB}
          markFavorite={markFavorite}
          unmarkFavorite={unmarkFavorite}
        />
      ))}
    </ul>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addFavoriteToDB: actionCreators.addFavoriteToDB,
      removeFavoriteFromDB: actionCreators.removeFavoriteFromDB,
      markFavorite: actionCreators.markFavorite,
      unmarkFavorite: actionCreators.unmarkFavorite,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(RetailList);
