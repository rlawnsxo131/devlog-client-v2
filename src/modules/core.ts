import { createSlice } from '@reduxjs/toolkit';
import { DEVLOG_DARK_MODE } from '../lib/constants';

type CoreType = {
  darkMode: {
    visible: false;
    darkMode: boolean;
  };
};

const initialState: CoreType = {
  darkMode: {
    visible: false,
    darkMode: false,
  },
};

const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    onDarkMode(state, action) {
      const { visible, darkMode } = action.payload;
      state.darkMode.visible = visible;
      state.darkMode.darkMode = darkMode;
      localStorage.setItem(DEVLOG_DARK_MODE, darkMode);
    },
  },
});

export const { onDarkMode } = coreSlice.actions;

export default coreSlice.reducer;
