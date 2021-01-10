import { createSlice } from '@reduxjs/toolkit';

export enum ErrorEnum {
  NOT_FOUND = 'NOT_FOUND',
  BAD_REQUEST = 'BAD_REQUEST',
  UNKNOWN = 'UNKNOWN',
  NETWORK = 'NETWORK',
  CHUNK = 'CHUNK',
}

export const errorMessageMap = new Map<ErrorEnum, string>([
  [ErrorEnum.NOT_FOUND, '찾을 수 없습니다'],
  [ErrorEnum.BAD_REQUEST, '잘못된 요청입니다'],
  [ErrorEnum.UNKNOWN, '알 수 없는 에러발생'],
  [ErrorEnum.NETWORK, '네트워크 에러발생'],
  [ErrorEnum.CHUNK, 'devlog 가 업데이트 되었습니다.\n새로고침을 해주세요'],
]);

type ErrorType = {
  errorType: ErrorEnum | null;
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
