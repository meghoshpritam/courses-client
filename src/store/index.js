import { configureStore } from '@reduxjs/toolkit';
import apiCallReducer from './Slices/apiCall';

export default configureStore({
  reducer: {
    apiCall: apiCallReducer,
  },
});
