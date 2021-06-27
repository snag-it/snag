import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FavoritesList from '../../components/FavoritesList';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(10, 0),
  },
}));

function FavoritesPage({ favorites }) {
  const classes = useStyles();
  console.log(`favorites`, favorites)
  return (
    <Grid
      container
      className={classes.root}
      direction="row"
      justify="center"
      alignContent="center">
      <Grid container direction="row" justify="center" alignContent="center">
        <FavoritesList productData={favorites} />
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  favorites: state.user.favorites,
});

export default connect(mapStateToProps, null)(FavoritesPage);
