import { createSlice } from '@reduxjs/toolkit';

export enum CommentError {}

type CommentType = {
  errorType: CommentError | null;
};

const initialState: CommentType = {
  errorType: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentError(state, action) {},
    resetCommentError(state, action) {},
  },
});

export const { setCommentError, resetCommentError } = commentSlice.actions;

export default commentSlice.reducer;
