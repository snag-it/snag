import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RetailItem from './RetailItem';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(10)
  }
}))

function RetailList({ logo, productData }) {
  const classes = useStyles()
  return (
    <ul className={classes.root}>
      {productData.map((product, index) => (
        <RetailItem
          key={product.id}
          currentItemId={product.id}
          retailer='ebay' // TODO: conditionally render this
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
