/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initStage = {
  fetch: false,
  success: false,
  error: false,
  goals: [],
};

export const goalsSlice = createSlice({
  name: 'goals',
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
      state.goals = [...action.payload.goals];
    },
    setError: (state) => {
      state.fetch = false;
      state.error = true;
      state.success = false;
    },
    addGoal: (state, action) => {
      state.goals.push(action.payload.goal);
    },
    deleteGoal: (state, action) => {
      state.noes = [...state.noes.filter((goal) => goal._id !== action.payload.id)];
    },
    updateGoal: (state, action) => {
      state.goals = [
        ...state.goals.map((goal) =>
          goal._id === action.payload.goal._id ? action.payload.goal : goal
        ),
      ];
    },
  },
});

export const {
  setFetch,
  setError,
  setSuccess,
  addGoal,
  updateGoal,
  deleteGoal,
} = goalsSlice.actions;

export const selectNode = (state) => state.ApiCall;

export default goalsSlice.reducer;
