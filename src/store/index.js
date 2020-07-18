import { configureStore } from '@reduxjs/toolkit';
import apiCallReducer from './Slices/apiCall';
import nodeReducer from './Slices/node';
import nodesReducer from './Slices/nodes';
import goalsReducer from './Slices/goals';
import projectsReducer from './Slices/project';
import coursesReducer from './Slices/courses';

export default configureStore({
  reducer: {
    apiCall: apiCallReducer,
    node: nodeReducer,
    nodes: nodesReducer,
    courses: coursesReducer,
    projects: projectsReducer,
    goals: goalsReducer,
  },
});
