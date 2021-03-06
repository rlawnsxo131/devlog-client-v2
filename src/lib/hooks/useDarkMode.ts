import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setDarkmode } from '../../modules/core';
import { DEVLOG_DARKMODE } from '../constants';

function getDarkmode() {
  let result = null;
  if (typeof window !== 'undefined') {
    result = localStorage.getItem(DEVLOG_DARKMODE);
  }
  return result;
}

export default function useDarkmode() {
  const DARKMODE = useRef<string | null>(getDarkmode());
  const dispatch = useDispatch();

  // none declare DARK_MODE
  useEffect(() => {
    if (DARKMODE.current) return;
    const mode = ['light', 'dark'].reduce((acc, mode) => {
      if (globalThis.matchMedia(`(prefers-color-scheme: ${mode})`).matches) {
        acc += mode;
      }
      return acc;
    }, '');
    if (!mode) return;
    dispatch(
      setDarkmode({
        darkmode: mode === 'dark',
      }),
    );
  }, [DARKMODE.current]);

  // already declare DARK_MODE
  useEffect(() => {
    if (!DARKMODE.current) return;
    dispatch(
      setDarkmode({
        darkmode: DARKMODE.current === 'true',
      }),
    );
  }, [DARKMODE.current]);
}
