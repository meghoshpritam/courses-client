/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initStage = {
  fetch: false,
  success: false,
  error: false,
  nodes: [],
};

export const nodesSlice = createSlice({
  name: 'nodes',
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
      state.nodes = [...action.payload.nodes];
    },
    setError: (state) => {
      state.fetch = false;
      state.error = true;
      state.success = false;
    },
    addNode: (state, action) => {
      state.nodes.push(action.payload.node);
    },
    deleteNode: (state, action) => {
      state.nodes = [...state.nodes.filter((node) => node._id !== action.payload.id)];
    },
    updateNode: (state, action) => {
      state.nodes = [
        ...state.nodes.map((node) => {
          console.log(node._id, action.payload.node._id, node._id === action.payload.node._id);
          return node._id === action.payload.node._id ? action.payload.node : node;
        }),
      ];
    },
  },
});

export const {
  setFetch,
  setError,
  setSuccess,
  addNode,
  updateNode,
  deleteNode,
} = nodesSlice.actions;

export const selectNode = (state) => state.ApiCall;

export default nodesSlice.reducer;
