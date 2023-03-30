import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

import infographic from './managementPanel/reducer';

const reducers = combineReducers({
  infographic
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = 
  (typeof window !== 'undefined'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  compose;

  

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));


export const configureStore = () => {
  const store = createStore(reducers, enhancer);
  sagaMiddleware.run(sagas);
  return store;
};

export default configureStore;
