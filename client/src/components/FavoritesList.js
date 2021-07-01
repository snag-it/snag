import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import * as actionCreators from '../actions/actionCreators';
import RetailItem from './RetailItem';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function FavoritesList({
  productData,
  addFavoriteToDB,
  removeFavoriteFromDB,
  fetchFavorites,
  addUserData,
}) {
  const classes = useStyles();
  // [favorites, setFavorites] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    console.log('fetching favs...');
    fetch('/getUserData')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        actionCreators.addUserData(data.favorites);
        setFavorites(data.favorites);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log('FAVORITES: ', favorites);
  return (
    <div>
      <NavBar />
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
            addFavoriteToDB={addFavoriteToDB}
            removeFavoriteFromDB={removeFavoriteFromDB}
            fetchFavorites={fetchFavorites}
          />
        ))}
      </ul>
    </div>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addFavoriteToDB: actionCreators.addFavoriteToDB,
      removeFavoriteFromDB: actionCreators.removeFavoriteFromDB,
      fetchFavorites: actionCreators.fetchFavorites,
      addUserData: actionCreators.addUserData,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(FavoritesList);
