import * as actions from "../actions/actions";

const initialState = {
  targetLoading: false,
  targetProducts: [],
};

function targetReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.FETCH_STARTED:
      return {
        ...state,
        targetLoading: true,
      };
    case actions.FETCH_COMPLETE:
      return {
        ...state,
        targetLoading: false,
      };
    case actions.FETCH_TARGET:
      const modifiedTargetList = [];
      console.log(payload);
      payload.arr.target.forEach((product) => {
        product["isFavorite"] = false;

        modifiedTargetList.push(product);
      });
      return {
        ...state,
        targetProducts: modifiedTargetList,
      };
    case actions.MARK_FAVORITE:
      const withMarkedFavorite = state.targetProducts;
      if (payload.retailer === "target") {
        withMarkedFavorite.forEach((product) => {
          if (product.id === payload.productId) {
            product["isFavorite"] = true;
          }
        });
        return {
          ...state,
          targetProducts: withMarkedFavorite,
        };
      }
    case actions.UNMARK_FAVORITE:
      if (payload.retailer === "target") {
        const withUnmarkedFavorite = state.targetProducts;
        withUnmarkedFavorite.forEach((product) => {
          if (product.id === payload.productId) {
            product["isFavorite"] = false;
          }
        });
        return {
          ...state,
          targetProducts: withUnmarkedFavorite,
        };
      }
    default:
      return state;
  }
}

export default targetReducer;
