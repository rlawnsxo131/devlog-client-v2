import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum CommentErrorEnum {
  ENTER_PASSWORD = 'ENTER_PASSWORD',
  CHECK_REQUIRE_ITEM = 'CHECK_REQUIRE_ITEM',
  NETWORK = 'NETWORK',
  UNKNOWN = 'UNKNOWN',
  NOT_MATCHED_PASSWORD = 'NOT_MATCHED_PASSWORD',
}

export const commentErrorMessagMap = new Map<CommentErrorEnum, string>([
  [CommentErrorEnum.ENTER_PASSWORD, '비밀번호를 입력해주세요'],
  [
    CommentErrorEnum.CHECK_REQUIRE_ITEM,
    '작성자, 비밀번호, 댓글은 필수 입력 사항 입니다.',
  ],
  [CommentErrorEnum.NETWORK, '네트워크 에러발생'],
  [CommentErrorEnum.UNKNOWN, '알수없는 에러발생'],
  [CommentErrorEnum.NOT_MATCHED_PASSWORD, '잘못된 비밀번호 입니다.'],
]);

interface CommentState {
  errorType: CommentErrorEnum | null;
}

const initialState: CommentState = {
  errorType: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setCommentError(
      state,
      action: PayloadAction<{ errorType: CommentErrorEnum }>,
    ) {
      state.errorType = action.payload.errorType;
    },
    resetCommentError(state, action) {
      state.errorType = null;
    },
  },
});

export const { setCommentError, resetCommentError } = commentSlice.actions;

export default commentSlice.reducer;
