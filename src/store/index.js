import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../slices/projectSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
  middleware: [thunk],
})