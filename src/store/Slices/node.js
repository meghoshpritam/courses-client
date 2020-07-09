/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initStage = {
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
      state = { ...initStage };
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
} = nodeSlice.actions;

export const selectNode = (state) => state.ApiCall;

export default nodeSlice.reducer;
