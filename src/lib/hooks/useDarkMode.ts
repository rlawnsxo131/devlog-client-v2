import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { onDarkmode } from '../../modules/core';
import { DEVLOG_DARKMODE } from '../constants';

export default function useDarkmode() {
  const DARKMODE = useRef<string | null>(localStorage.getItem(DEVLOG_DARKMODE));
  const dispatch = useDispatch();

  // none declare DARK_MODE
  useEffect(() => {
    if (DARKMODE.current) return;
    const mode = ['light', 'dark'].reduce((acc, mode) => {
      return globalThis.matchMedia(`(prefers-color-scheme: ${mode})`).matches
        ? (acc += mode)
        : acc;
    }, '');
    if (!mode) return;
    dispatch(
      onDarkmode({
        visible: false,
        darkmode: mode === 'dark',
      }),
    );
  }, []);

  // already declare DARK_MODE
  useEffect(() => {
    if (!DARKMODE.current) return;
    dispatch(
      onDarkmode({
        visible: false,
        darkmode: DARKMODE.current === 'true',
      }),
    );
  }, []);
}
