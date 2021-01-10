import { createSlice } from '@reduxjs/toolkit';

export enum CommentErrorEnum {
  NETWORK = 'NETWORK',
  UNKNOWN = 'UNKNOWN',
  NOT_MATCHED_PASSWORD = 'NOT_MATCHED_PASSWORD',
}

export const commentErrorMessagMap = new Map<CommentErrorEnum, string>([
  [CommentErrorEnum.NETWORK, '네트워크 에러발생'],
  [CommentErrorEnum.UNKNOWN, '알수없는 에러발생'],
  [CommentErrorEnum.NOT_MATCHED_PASSWORD, '잘못된 비밀번호 입니다.'],
]);

type CommentType = {
  errorType: CommentErrorEnum | null;
};

const initialState: CommentType = {
  errorType: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentError(state, action) {
      state.errorType = action.payload.errorType;
    },
    resetCommentError(state, action) {
      state.errorType = null;
    },
  },
});

export const { setCommentError, resetCommentError } = commentSlice.actions;

export default commentSlice.reducer;
