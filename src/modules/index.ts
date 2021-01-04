import { combineReducers } from '@reduxjs/toolkit';
import error from './error';
import core from './core';
import comment from './comment';

const rootReducer = combineReducers({
  error,
  core,
  comment,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
