import * as actions from './actions';
import axios from 'axios';

export function fetchHistory(dataId) {
  return function (dispatch) {
    return axios
      .get('/historyData', {
        dataId,
      })
      .then(({ data }) => {
        console.log('This is my history data', data);
        dispatch(setHistoryProducts(data));
      })
      .catch((err) => console.log(err));
  };
}

export function setHistoryProducts(fetchedHistory) {
  return { type: actions.FETCH_HISTORY, payload: { fetchedHistory } };
}
export function fetchAmazon(item) {
  return function (dispatch) {
    return axios
      .post('/getPrices', {
        item: item,
        store: 'amazon',
      })
      .then(({ data }) => {
        //set data somewhere
        dispatch(setAmazonProducts(data));
        console.log(data);
      })
      .then(() => fetchFavorites())
      .catch((err) => console.log(err));
  };
}

export function setAmazonProducts(arr) {
  return { type: actions.FETCH_AMAZON, payload: { arr } };
}

//fetch ebay

export function fetchEbay(item) {
  return function (dispatch) {
    return axios
      .post('/getPrices', {
        item: item,
        store: 'ebay',
      })
      .then(({ data }) => {
        //set data somewhere
        dispatch(setEbayProducts(data));
        console.log(data);
      })
      .then(() => fetchFavorites())
      .catch((err) => console.log(err));
  };
}

export function setEbayProducts(arr) {
  return { type: actions.FETCH_EBAY, payload: { arr } };
}

//fetch target

export function fetchTarget(item) {
  return function (dispatch) {
    console.log('target reducer firing ');
    return axios
      .post('/getPrices', {
        item: item,
        store: 'target',
      })
      .then(({ data }) => {
        //set data somewhere
        console.log(data);
        dispatch(setTargetProducts(data));
      })
      .then(() => fetchFavorites())
      .catch((err) => console.log(err));
  };
}

export function setTargetProducts(arr) {
  return { type: actions.FETCH_TARGET, payload: { arr } };
}

export const markFavorite = (retailer, productId) => {
  return {
    type: actions.MARK_FAVORITE,
    payload: { retailer, productId },
  };
};

export const unmarkFavorite = (retailer, productId) => {
  return {
    type: actions.UNMARK_FAVORITE,
    payload: { retailer, productId },
  };
};

// need to adjust to work with backend
export const addFavorite = (item) => {
  console.log('added a fave');
  return { type: actions.ADD_FAVORITE, payload: { item } };
};

export function addFavoriteToDB(item) {
  let requestItem = {
    id: item.id,
    retailer: item.retailer,
    title: item.title,
    price: item.price,
    link: item.link,
    image: item.image,
  };
  const requestOptions = {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ requestItem }),
  };
  return (dispatch) => {
    fetch('/addFavorite', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        dispatch(addFavorite(item));
      })
      .catch((err) => console.log(err));
  };
}

export function removeFavoriteFromDB(item) {
  const requestOptions = {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ item }),
  };
  return (dispatch) => {
    fetch('/removeFavorite', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        dispatch(removeFavorite(item.id));
      })
      .catch((err) => console.log(err));
  };
}

export const addUserData = (favorites) => {
  console.log(favorites);
  return {
    type: actions.FETCH_USER_DATA,
    payload: favorites,
  };
};

/*
return axios
      .post('/addFavorite', {
        item,
      })
      .then(({ data }) => {
        addFavorite(item);
        console.log(data);
      })
      .catch((err) => console.log(err));
*/

// need to adjust to work with backend
export const removeFavorite = (itemId) => ({
  type: actions.REMOVE_FAVORITE,
  payload: { itemId },
});

//post favorite

export function postFavorite(itemId) {
  console.log('posting favs...');
  return function () {
    return axios
      .post('/postFavorites', { favorite })
      .then(({ res }) => {
        console.log(res, res.data);
      })
      .then(() => fetchFavorites());
  };
}

//fetch favorite

export function fetchFavorites() {
  console.log('getting data');
  return function (dispatch) {
    return axios.get('/getFavorites').then(({ data }) => {
      console.log('58 ', data);
      dispatch(setFavorites(data));
    });
  };
}

//export function fetchHomeItems()

export const signIn = (loggedInUser) => ({
  type: actions.SIGN_IN,
  payload: { loggedInUser },
});
