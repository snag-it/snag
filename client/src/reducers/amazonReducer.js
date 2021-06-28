import * as actions from '../actions/actions';

const initialState = {
  amazonLoading: false,
  amazonProducts: [],
};

function amazonReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.FETCH_STARTED:
      return {
        ...state,
        amazonLoading: true,
      };
    case actions.FETCH_COMPLETE:
      return {
        ...state,
        amazonLoading: false,
      };
    case actions.FETCH_AMAZON:
      const modifiedAmazonList = [];
      payload.products.forEach(product => {
        product['isFavorite'] = false;
        modifiedAmazonList.push(product);
      });
      return {
        ...state,
        amazonProducts: modifiedAmazonList,
      };
    case actions.MARK_FAVORITE:
      if (payload.retailer === 'amazon') {
        const withMarkedFavorite = state.amazonProducts;
        withMarkedFavorite.forEach(product => {
          if (product.id === payload.productId) {
            product['isFavorite'] = true;
          }
        });
        return {
          ...state,
          amazonProducts: withMarkedFavorite,
        };
      }
    case actions.UNMARK_FAVORITE:
      if (payload.retailer === 'amazon') {
        const withUnmarkedFavorite = state.amazonProducts;
        withUnmarkedFavorite.forEach(product => {
          if (product.id === payload.productId) {
            product['isFavorite'] = false;
          }
        });
        return {
          ...state,
          amazonProducts: withUnmarkedFavorite,
        };
      }
    default:
      return state;
  }
}

export default amazonReducer;
