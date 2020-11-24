import { combineReducers } from '@reduxjs/toolkit';
import error from './error';
import core from './core';

const rootReducer = combineReducers({
  error,
  core,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
