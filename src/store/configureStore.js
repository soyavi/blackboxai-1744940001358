import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers/index';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

// Create the logger middleware
const loggerMiddleware = createLogger({
  predicate: (getState, action) => __DEV__,
});

// Configure the Redux persist library
const persistConfig = {
  key: 'root', // the key used to store the data in AsyncStorage
  storage: AsyncStorage, // the storage engine to use
  stateReconciler: autoMergeLevel2, // the function to reconcile state changes
};

// Define a function to configure the Redux store
function configureStore() {
  // Create the middleware enhancer
  const enhancer = compose(applyMiddleware(loggerMiddleware));

  // Create the persisted reducer using the configuration object
  const persistedReducer = persistReducer(persistConfig, reducers);

  // Create the Redux store with the persisted reducer and the middleware enhancer
  const store = createStore(persistedReducer, enhancer);

  // Create the persistor object to handle persistence
  const persistor = persistStore(store);

  // Enable hot module replacement for the reducers
  if (module.hot) {
    module.hot.accept('../reducers/index', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  // Return an object containing the store and persistor
  return {store, persistor};
}

// Call the configureStore function and extract the store and persistor from its return value
const {store, persistor} = configureStore();

// Export the store and persistor objects
export {store, persistor};
