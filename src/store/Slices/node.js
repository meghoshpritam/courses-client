/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initStage = {
  id: '',
  name: '',
  description: '',
  img: '',
  video: '',
  markdown: '',
  resources: [],
  quiz: '',
  exam: '',
  assignment: '',
  type: 'free',
};

export const nodeSlice = createSlice({
  name: 'node',
  initialState: {
    ...initStage,
  },
  reducers: {
    setNode: (state, action) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.img = action.payload.img;
      state.video = action.payload.video;
      state.markdown = action.payload.markdown;
      state.resources = action.payload.resources || [];
      state.quiz = action.payload.quiz;
      state.exam = action.payload.exam;
      state.assignment = action.payload.assignment;
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setImg: (state, action) => {
      state.img = action.payload;
    },
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    setMarkdown: (state, action) => {
      state.markdown = action.payload;
    },
    setExam: (state, action) => {
      state.exam = action.payload;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setAssignment: (state, action) => {
      state.assignment = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    addResource: (state, action) => {
      state.resources.push({
        name: action.payload.name,
        uri: action.payload.uri,
        id: new Date().toString(),
      });
    },
    deleteResource: (state, action) => {
      state.resources = [...state.resources.filter((res) => res.id !== action.payload.id)];
    },
    updateResource: (state, action) => {
      state.resources = [
        ...state.resources.map((res) =>
          res.id === action.payload.id
            ? { name: action.payload.name, uri: action.payload.uri, id: action.payload.id }
            : res
        ),
      ];
    },
    reset: (state) => {
      const keys = Object.keys(initStage);
      keys.forEach((key) => {
        state[key] = initStage[key];
      });
    },
  },
});

export const {
  setName,
  setDescription,
  setAssignment,
  setExam,
  setQuiz,
  setMarkdown,
  setVideo,
  setImg,
  setType,
  addResource,
  updateResource,
  deleteResource,
  reset,
  setNode,
} = nodeSlice.actions;

export const selectNode = (state) => state.ApiCall;

export default nodeSlice.reducer;
