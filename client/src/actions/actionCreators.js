import * as actions from "./actions";
import axios from "axios";

export function fetchAmazon(item) {
  return function (dispatch) {
    return axios
      .post("/getPrices", {
        item,
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

export const fetchEbay = (products) => ({
  type: actions.FETCH_EBAY,
  payload: { products },
});

export const fetchTarget = (products) => ({
  type: actions.FETCH_TARGET,
  payload: { products },
});

export const markFavorite = (retailer, productId) => ({
  type: actions.MARK_FAVORITE,
  payload: { retailer, productId },
});

export const unmarkFavorite = (retailer, productId) => ({
  type: actions.UNMARK_FAVORITE,
  payload: { retailer, productId },
});

export const addFavorite = (item) => ({
  type: actions.ADD_FAVORITE,
  payload: { item },
});

export const removeFavorite = (itemId) => ({
  type: actions.REMOVE_FAVORITE,
  payload: { itemId },
});

//post favorite

export function postFavorite(itemId) {
  console.log("posting favs...");
  return function () {
    return axios
      .post("/postFavorites", { favorite })
      .then(({ res }) => {
        console.log(res, res.data);
      })
      .then(() => fetchFavorites());
  };
}

//fetch favorite

export function fetchFavorites() {
  console.log("getting data");
  return function (dispatch) {
    return axios.get("/getFavorites").then(({ data }) => {
      console.log("58 ", data);
      dispatch(setFavorites(data));
    });
  };
}

//export function fetchHomeItems()

export const signIn = (loggedInUser) => ({
  type: actions.SIGN_IN,
  payload: { loggedInUser },
});
