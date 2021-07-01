import * as actions from "./actions";
import axios from "axios";

export function fetchStarted(fetching) {
  return { type: actions.FETCH_STARTED, payload: { fetching: true } };
}

export function fetchComplete(fetching) {
  return { type: actions.FETCH_COMPLETE, payload: { fetching: false } };
}

export function fetchHistory(dataId) {
  return function (dispatch) {
    return axios
      .get("/historyData", {
        dataId,
      })
      .then(({ data }) => {
        console.log("This is my history data", data);
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
    dispatch(fetchStarted());
    return axios
      .post("/getPrices", {
        item,
      })
      .then(({ data }) => {
        //set data somewhere
        dispatch(setAmazonProducts(data));
        console.log(data);
      })
      .then(() => {
        console.log("What is Fetched?");
      })
      .then(() => fetchFavorites())
      .then(() => {
        //set data somewhere
        dispatch(fetchComplete());
        console.log("Did my fetch finish?");
      })
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
      .post("/getPrices", {
        item,
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
    return axios
      .post("/getPrices", {
        item,
      })
      .then(({ data }) => {
        //set data somewhere
        dispatch(setTargetProducts(data));
        console.log(data);
      })
      .then(() => fetchFavorites())
      .catch((err) => console.log(err));
  };
}

export function setTargetProducts(arr) {
  return { type: actions.FETCH_TARGET, payload: { arr } };
}

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
