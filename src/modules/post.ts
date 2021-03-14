import { createSlice } from '@reduxjs/toolkit';

interface PostState {
  postIds: Array<number>;
}

const initialState: PostState = {
  postIds: [],
};

const coreSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostIds(state, action) {},
  },
});

export const { setPostIds } = coreSlice.actions;

export default coreSlice.reducer;
