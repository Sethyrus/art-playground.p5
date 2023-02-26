// import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension';
// import Reducers from './reducers';
import { configureStore } from '@reduxjs/toolkit'
import viewData from './reducers/view-data';

const store = configureStore({reducer: { viewData }});

export default store;