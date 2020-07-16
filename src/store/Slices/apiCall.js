import { createSlice } from '@reduxjs/toolkit';

const initStage = {
  loading: false,
  success: false,
  error: false,
};

export const counterSlice = createSlice({
  name: 'apiCall',
  initialState: {
    ...initStage,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    },
    setSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    },
    setError: (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
    },
    reset: (state) => {
      state = { ...initStage };
    },
  },
});

export const { setLoading, setSuccess, setError, reset } = counterSlice.actions;

export const selectApiCall = (state) => state.ApiCall;

export default counterSlice.reducer;
