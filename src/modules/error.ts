import { createSlice } from '@reduxjs/toolkit';

export enum ErrorTypes {
  NOT_FOUND = 'NOT_FOUND',
  CHUNK = 'CHUNK',
  UNKNOWN = 'UNKNOWN',
}
type ErrorType = {
  errorType: ErrorTypes | null;
};

const initialState: ErrorType = {
  errorType: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action) {
      const { errorType } = action.payload;
      state.errorType = errorType;
    },
    resetError(state, action) {
      state.errorType = null;
    },
  },
});

export const { setError, resetError } = errorSlice.actions;

export default errorSlice.reducer;
