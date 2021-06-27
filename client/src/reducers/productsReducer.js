import * as actions from '../actions/actions';
import { sampleAmazonData } from '../sampleData/sampleAmazonData';
import { sampleEbayData } from '../sampleData/sampleEbayData';
import { sampleTargetData } from '../sampleData/sampleTargetData';

const initialState = {
  amazonProducts: sampleAmazonData,
  ebayProducts: sampleEbayData,
  targetProducts: sampleTargetData,
};

function productsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.FETCH_AMAZON:
      return {
        ...state,
        amazonProducts: [...payload.products]
      };
    case actions.FETCH_EBAY:
      return {
        ...state,
        ebayProducts: [...payload.products]
      };
    case actions.FETCH_TARGET:
      return {
        ...state,
        targetProducts: [...payload.products]
      };
    default:
      return state;
  }
}

export default productsReducer;
