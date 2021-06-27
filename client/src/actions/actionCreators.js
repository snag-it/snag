import * as actions from './actions';

export const fetchAmazon = products => ({
  type: actions.FETCH_AMAZON,
  payload: { products },
});

export const fetchEbay = products => ({
  type: actions.FETCH_EBAY,
  payload: { products },
});

export const fetchTarget = products => ({
  type: actions.FETCH_TARGET,
  payload: { products },
});

export const addFavorite = item => ({
  type: actions.ADD_FAVORITE,
  payload: { item },
});

export const removeFavorite = itemId => ({
  type: actions.REMOVE_FAVORITE,
  payload: { itemId },
});

export const signIn = loggedInUser => ({
  type: actions.SIGN_IN,
  payload: { loggedInUser },
});
