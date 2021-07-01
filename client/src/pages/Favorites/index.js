import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FavoritesList from '../../components/FavoritesList';
import NavBar from '../../components/NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(10, 0),
  },
}));

// useEffect(() => {
//   fetch('/getUserData')
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       actionCreators.addUserData(data.favorites);
//     })
//     .catch((err) => console.log(err));
// }, []);

function FavoritesPage({ favorites }) {
  const classes = useStyles();
  console.log(`favorites`, favorites);
  return (
    <div>
      <NavBar />
      <Grid container direction='row' justify='center'>
        <FavoritesList productData={favorites} />
      </Grid>
    </div>
  );
}
// console.log(favorites);
const mapStateToProps = (state) => ({
  favorites: state.user.favorites,
});

export default connect(mapStateToProps, null)(FavoritesPage);
