/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initStage = {
  fetch: false,
  success: false,
  error: false,
  projects: [],
};

export const projectsSlice = createSlice({
  name: 'projects',
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
      state.projects = [...action.payload.projects];
    },
    setError: (state) => {
      state.fetch = false;
      state.error = true;
      state.success = false;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload.project);
    },
    deleteProject: (state, action) => {
      state.noes = [...state.noes.filter((project) => project._id !== action.payload.id)];
    },
    updateProject: (state, action) => {
      state.projects = [
        ...state.projects.map((project) =>
          project._id === action.payload.project._id ? action.payload.project : project
        ),
      ];
    },
  },
});

export const {
  setFetch,
  setError,
  setSuccess,
  addProject,
  updateProject,
  deleteProject,
} = projectsSlice.actions;

export const selectNode = (state) => state.ApiCall;

export default projectsSlice.reducer;
