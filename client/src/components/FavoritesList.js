import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import * as actionCreators from '../actions/actionCreators';
import RetailItem from './RetailItem';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  RetailItem: {
    display: 'flex',
  },

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },

  container: {
    paddingTop: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
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
    <main className={classes.content}>
      <Container maxWidth='md'>
        <Grid container spacing={4}>
          <ul className={classes.root}>
            {favorites.map((product, i) => (
              <Grid item key={i} xs={12} sm={6} md={6}>
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
              </Grid>
            ))}
          </ul>
        </Grid>
      </Container>
    </main>
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
