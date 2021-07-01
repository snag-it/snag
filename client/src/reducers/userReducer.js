import * as actions from '../actions/actions';

const initialState = {
  username: '',
  email: '',
  favorites: [],
  history: [],
};

function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.SIGN_IN:
      return {
        ...state,
        username: payload.loggedInUser.username,
        email: payload.loggedInUser.email,
        favorites: [...payload.loggedInUser.favorites],
      };
    case actions.ADD_FAVORITE:
      const withAddedFavorite = state.favorites;
      withAddedFavorite.push(payload.item);
      return {
        ...state,
        favorites: [...withAddedFavorite],
      };
    case actions.REMOVE_FAVORITE:
      const withFavoriteRemoved = [];
      state.favorites.map((item) => {
        if (item.id !== payload.itemId) withFavoriteRemoved.push(item);
      });
      return {
        ...state,
        favorites: [...withFavoriteRemoved],
      };
    case actions.FETCH_USER_DATA:
      const fetchedFavorites = actions.payload;
      //return favorites fetched, need thunk?
      return {
        ...state,
        favorites: [...fetchedFavorites],
      };
    case actions.FETCH_HISTORY:
      return {
        ...state,
        history: [...payload.fetchedHistory],
      };

    default:
      return state;
  }
}

export default userReducer;
