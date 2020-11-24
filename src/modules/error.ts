import { createSlice } from '@reduxjs/toolkit';

type Error = 'NOT_FOUND' | 'CHUNK';
type ErrorType = {
  error: boolean;
  errorType?: Error;
};

const initialState: ErrorType = {
  error: false,
  errorType: undefined,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action) {
      const { error, errorType } = action.payload;
      state.error = error;
      state.errorType = errorType;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
