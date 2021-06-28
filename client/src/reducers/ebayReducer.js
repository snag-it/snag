import * as actions from '../actions/actions';

const initialState = {
  ebayLoading: false,
  ebayProducts: [],
};

function ebayReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.FETCH_STARTED:
      return {
        ...state,
        ebayLoading: true,
      };
    case actions.FETCH_COMPLETE:
      return {
        ...state,
        ebayLoading: false,
      };
    case actions.FETCH_EBAY:
      const modifiedEbayList = [];
      payload.products.forEach(product => {
        product['isFavorite'] = false;
        modifiedEbayList.push(product);
      });
      return {
        ...state,
        ebayProducts: modifiedEbayList,
      };
    case actions.MARK_FAVORITE:
      if (payload.retailer === 'ebay') {
        const withMarkedFavorite = state.ebayProducts;
        withMarkedFavorite.forEach(product => {
          if (product.id === payload.productId) {
            product['isFavorite'] = true;
          }
        });
        return {
          ...state,
          ebayProducts: withMarkedFavorite,
        };
      }
    case actions.UNMARK_FAVORITE:
      if (payload.retailer === 'ebay') {
        const withUnmarkedFavorite = state.ebayProducts;
        withUnmarkedFavorite.forEach(product => {
          if (product.id === payload.productId) {
            product['isFavorite'] = false;
          }
        });
        return {
          ...state,
          ebayProducts: withUnmarkedFavorite,
        };
      }
    default:
      return state;
  }
}

export default ebayReducer;
