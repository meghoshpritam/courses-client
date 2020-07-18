/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initStage = {
  fetch: false,
  success: false,
  error: false,
  assignments: [],
};

export const assignmentsSlice = createSlice({
  name: 'assignments',
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
      state.assignments = [...action.payload.assignments];
    },
    setError: (state) => {
      state.fetch = false;
      state.error = true;
      state.success = false;
    },
    addAssignment: (state, action) => {
      state.assignments.push(action.payload.assignment);
    },
    deleteAssignment: (state, action) => {
      state.noes = [...state.noes.filter((assignment) => assignment._id !== action.payload.id)];
    },
    updateAssignment: (state, action) => {
      state.assignments = [
        ...state.assignments.map((assignment) =>
          assignment._id === action.payload.assignment._id ? action.payload.assignment : assignment
        ),
      ];
    },
  },
});

export const {
  setFetch,
  setError,
  setSuccess,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} = assignmentsSlice.actions;

export const selectNode = (state) => state.ApiCall;

export default assignmentsSlice.reducer;
