import { createSlice } from '@reduxjs/toolkit';
import { DEVLOG_DARKMODE } from '../lib/constants';

type CoreType = {
  darkmode: {
    visible: false;
    darkmode: boolean;
  };
};

const initialState: CoreType = {
  darkmode: {
    visible: false,
    darkmode: false,
  },
};

const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    onDarkmode(state, action) {
      const { visible, darkmode } = action.payload;
      state.darkmode.visible = visible;
      state.darkmode.darkmode = darkmode;
      localStorage.setItem(DEVLOG_DARKMODE, darkmode);
    },
  },
});

export const { onDarkmode } = coreSlice.actions;

export default coreSlice.reducer;
