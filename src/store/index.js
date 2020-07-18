import { configureStore } from '@reduxjs/toolkit';
import apiCallReducer from './Slices/apiCall';
import nodeReducer from './Slices/node';
import nodesReducer from './Slices/nodes';
import goalsReducer from './Slices/goals';
import coursesReducer from './Slices/courses';
import projectsReducer from './Slices/projects';
import instructorsReducer from './Slices/instructors';
import examsReducer from './Slices/exams';
import assignmentsReducer from './Slices/assignments';

export default configureStore({
  reducer: {
    apiCall: apiCallReducer,
    node: nodeReducer,
    nodes: nodesReducer,
    courses: coursesReducer,
    projects: projectsReducer,
    goals: goalsReducer,
    exams: examsReducer,
    assignments: assignmentsReducer,
    instructors: instructorsReducer,
  },
});
