import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";

import * as actionCreators from "../actions/actionCreators";
import RetailItem from "./RetailItem";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function FavoritesList({ productData, addFavorite, removeFavorite }) {
  const classes = useStyles();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    console.log("fetching favs...");
    actionCreators.fetchFavorites();
  }, [favorites]);

  return (
    <ul className={classes.root}>
      {productData.map((product) => (
        <RetailItem
          key={product.id}
          currentItemId={product.id}
          retailer={product.retailer}
          title={product.title}
          price={product.price}
          image={product.image}
          logo={product.logo}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          //fetchFavorites={fetchFavorites}
        />
      ))}
    </ul>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addFavorite: actionCreators.addFavorite,
      removeFavorite: actionCreators.removeFavorite,
      fetchFavorites: actionCreators.fetchFavorites,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(FavoritesList);
