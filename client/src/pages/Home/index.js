import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { DisplayGrid } from '../../components/DisplayGrid';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(10, 0),
  },
}));

const mapStateToProps = (state) => ({
  favorites: state.user.favorites,
  amazonProducts: state.amazon.amazonProducts,
  ebayProducts: state.ebay.ebayProducts,
  targetProducts: state.target.targetProducts,
  withSearch: true,
});

export default connect(mapStateToProps, null)(DisplayGrid);
