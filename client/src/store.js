import { combineReducers, applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import userReducer from './reducers/userReducer';
import productsReducer from './reducers/productsReducer';

//ADD REDUCERS HERE
const rootReducer = combineReducers({
  products: productsReducer,
  user: userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
