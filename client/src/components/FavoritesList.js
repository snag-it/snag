import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RetailItem from './RetailItem';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
}));

function FavoritesList({ productData }) {
  const classes = useStyles();
  return (
    <ul className={classes.root}>
      {productData.map(product => (
        <RetailItem
          key={product.id}
          currentItemId={product.id}
          retailer={product.retailer}
          title={product.title}
          price={product.price}
          image={product.img}
          logo={product.logo}
          setFavorited={setFavorited}
        />
      ))}
    </ul>
  );
}

export default FavoritesList;
