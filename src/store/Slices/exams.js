/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initStage = {
  fetch: false,
  success: false,
  error: false,
  exams: [],
};

export const examsSlice = createSlice({
  name: 'exams',
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
      state.exams = [...action.payload.exams];
    },
    setError: (state) => {
      state.fetch = false;
      state.error = true;
      state.success = false;
    },
    addExam: (state, action) => {
      state.exams.push(action.payload.exam);
    },
    deleteExam: (state, action) => {
      state.noes = [...state.noes.filter((exam) => exam._id !== action.payload.id)];
    },
    updateExam: (state, action) => {
      state.exams = [
        ...state.exams.map((exam) =>
          exam._id === action.payload.exam._id ? action.payload.exam : exam
        ),
      ];
    },
  },
});

export const {
  setFetch,
  setError,
  setSuccess,
  addExam,
  updateExam,
  deleteExam,
} = examsSlice.actions;

export const selectNode = (state) => state.ApiCall;

export default examsSlice.reducer;
