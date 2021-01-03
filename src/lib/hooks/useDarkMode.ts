import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { onDarkMode } from '../../modules/core';
import { DEVLOG_DARK_MODE } from '../constants';

export default function useDarkMode() {
  const DARK_MODE = useRef<string | null>(
    localStorage.getItem(DEVLOG_DARK_MODE),
  );
  const dispatch = useDispatch();

  // none declare DARK_MODE
  useEffect(() => {
    if (DARK_MODE.current) return;
    const mode = ['light', 'dark'].reduce((acc, mode) => {
      return globalThis.matchMedia(`(prefers-color-scheme: ${mode})`).matches
        ? (acc += mode)
        : acc;
    }, '');
    if (!mode) return;
    dispatch(
      onDarkMode({
        visible: false,
        darkMode: mode === 'dark',
      }),
    );
  }, []);

  // already declare DARK_MODE
  useEffect(() => {
    if (!DARK_MODE.current) return;
    dispatch(
      onDarkMode({
        visible: false,
        darkMode: DARK_MODE.current === 'true',
      }),
    );
  }, []);
}
