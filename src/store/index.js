import { configureStore } from '@reduxjs/toolkit';
import apiCallReducer from './Slices/apiCall';
import nodeReducer from './Slices/node';

export default configureStore({
  reducer: {
    apiCall: apiCallReducer,
    node: nodeReducer,
  },
});
