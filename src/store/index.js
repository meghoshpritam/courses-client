import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Slices/counterSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
