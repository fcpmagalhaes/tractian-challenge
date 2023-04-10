import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';
import painel from './painel/reducer';


const reducers = combineReducers({
  painel
});

const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    (typeof window !== 'undefined'
      && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose;

  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));


export const configureStore = () => {
  const store = createStore(reducers, enhancer);
  sagaMiddleware.run(sagas);
  return store;
};

export default configureStore;
