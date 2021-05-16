import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEVLOG_DARKMODE } from '../lib/constants';

interface CoreState {
  darkmode: {
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
    setDarkmode(state, action: PayloadAction<{ darkmode: boolean }>) {
      const { darkmode } = action.payload;
      state.darkmode.darkmode = darkmode;
      localStorage.setItem(DEVLOG_DARKMODE, `${darkmode}`);
    },
    setLoading(state, action: PayloadAction<{ loading: boolean }>) {
      const { loading } = action.payload;
      state.loading = loading;
    },
    showPopup(
      state,
      action: PayloadAction<{ title: string; message: string }>,
    ) {
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

export const { setDarkmode, setLoading, showPopup, closePopup } =
  coreSlice.actions;

export default coreSlice.reducer;
