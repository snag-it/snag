import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RetailItem from './RetailItem';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10),
  },
}));

function RetailList({ retailer, logo, productData }) {
  const classes = useStyles();
  return (
    <ul className={classes.root}>
      {productData.map(product => (
        <RetailItem
          key={product.id}
          currentItemId={product.id}
          retailer={retailer}
          title={product.title}
          price={product.price}
          image={product.img}
          logo={logo}
        />
      ))}
    </ul>
  );
}

export default RetailList;
