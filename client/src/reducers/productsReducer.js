import * as actions from '../actions/actions';
// import { sampleAmazonData } from '../sampleData/sampleAmazonData';
// import { sampleEbayData } from '../sampleData/sampleEbayData';
// import { sampleTargetData } from '../sampleData/sampleTargetData';

const initialState = {
  loading: false,
  amazonProducts: [],
  ebayProducts: [],
  targetProducts: [],
  // amazonProducts: sampleAmazonData,
  // ebayProducts: sampleEbayData,
  // targetProducts: sampleTargetData,
};

function productsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case actions.FETCH_STARTED:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_COMPLETE:
      return {
        ...state,
        loading: false,
      };
    case actions.FETCH_AMAZON:
      const modifiedAmazonList = [];
      payload.products.forEach(product => {
        product['isFavorite'] = false;
        modifiedAmazonList.push(product)
      });
      return {
        ...state,
        amazonProducts: modifiedAmazonList,
      };
    case actions.FETCH_EBAY:
      const modifiedEbayList = [];
      payload.products.forEach(product => {
        product['isFavorite'] = false;
        modifiedEbayList.push(product)
      });
      return {
        ...state,
        ebayProducts: modifiedEbayList,
      };
    case actions.FETCH_TARGET:
      const modifiedTargetList = [];
      payload.products.forEach(product => {
        product['isFavorite'] = false;
        modifiedTargetList.push(product)
      });
      return {
        ...state,
        targetProducts: modifiedTargetList,
      };
    default:
      return state;
  }
}

export default productsReducer;
