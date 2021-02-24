import { createSlice } from '@reduxjs/toolkit';
import { DEVLOG_DARKMODE } from '../lib/constants';

interface CoreState {
  darkmode: {
    visible: boolean;
    darkmode: boolean;
  };
  loading: boolean;
  popup: {
    visible: boolean;
    title: string;
    message: string;
  };
}

const initialState: CoreState = {
  darkmode: {
    visible: false,
    darkmode: false,
  },
  loading: false,
  popup: {
    visible: false,
    title: '',
    message: '',
  },
};

const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setDarkmode(state, action) {
      const { visible, darkmode } = action.payload;
      state.darkmode.visible = visible;
      state.darkmode.darkmode = darkmode;
      localStorage.setItem(DEVLOG_DARKMODE, darkmode);
    },
    setLoading(state, action) {
      const { loading } = action.payload;
      state.loading = loading;
    },
    showPopup(state, action) {
      const { title, message } = action.payload;
      state.popup.visible = true;
      state.popup.title = title;
      state.popup.message = message;
    },
    closePopup(state, action) {
      state.popup.visible = false;
      state.popup.title = '';
      state.popup.message = '';
    },
  },
});

export const {
  setDarkmode,
  setLoading,
  showPopup,
  closePopup,
} = coreSlice.actions;

export default coreSlice.reducer;
