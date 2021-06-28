import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk'

import amazonReducer from './reducers/amazonReducer';
import ebayReducer from './reducers/ebayReducer';
import targetReducer from './reducers/targetReducer';
import userReducer from './reducers/userReducer';

//ADD REDUCERS HERE
const rootReducer = combineReducers({
  amazon: amazonReducer,
  ebay: ebayReducer,
  target: targetReducer,
  user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
