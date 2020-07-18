/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initStage = {
  fetch: false,
  success: false,
  error: false,
  courses: [],
};

export const coursesSlice = createSlice({
  name: 'courses',
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
      state.courses = [...action.payload.courses];
    },
    setError: (state) => {
      state.fetch = false;
      state.error = true;
      state.success = false;
    },
    addCourse: (state, action) => {
      state.courses.push(action.payload.course);
    },
    deleteCourse: (state, action) => {
      state.noes = [...state.noes.filter((course) => course._id !== action.payload.id)];
    },
    updateCourse: (state, action) => {
      state.courses = [
        ...state.courses.map((course) =>
          course._id === action.payload.course._id ? action.payload.course : course
        ),
      ];
    },
  },
});

export const {
  setFetch,
  setError,
  setSuccess,
  addCourse,
  updateCourse,
  deleteCourse,
} = coursesSlice.actions;

export const selectNode = (state) => state.ApiCall;

export default coursesSlice.reducer;
