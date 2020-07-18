/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initStage = {
  fetch: false,
  success: false,
  error: false,
  instructors: [],
};

export const instructorsSlice = createSlice({
  name: 'instructors',
  initialState: {
    ...initStage,
  },
  reducers: {
    setFetch: (state) => {
      state.fetch = true;
      state.error = false;
      state.success = false;
    },
    setSuccess: (state, action) => {
      state.fetch = false;
      state.error = false;
      state.success = true;
      state.instructors = [...action.payload.instructors];
    },
    setError: (state) => {
      state.fetch = false;
      state.error = true;
      state.success = false;
    },
    addInstructor: (state, action) => {
      state.instructors.push(action.payload.instructor);
    },
    deleteInstructor: (state, action) => {
      state.noes = [...state.noes.filter((instructor) => instructor._id !== action.payload.id)];
    },
    updateInstructor: (state, action) => {
      state.instructors = [
        ...state.instructors.map((instructor) =>
          instructor._id === action.payload.instructor._id ? action.payload.instructor : instructor
        ),
      ];
    },
  },
});

export const {
  setFetch,
  setError,
  setSuccess,
  addInstructor,
  updateInstructor,
  deleteInstructor,
} = instructorsSlice.actions;

export const selectNode = (state) => state.ApiCall;

export default instructorsSlice.reducer;
