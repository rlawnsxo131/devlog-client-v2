import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { setDarkmode } from '../../../modules/core';

export default function useDarkmodeToggle() {
  const dispatch = useDispatch();
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );

  const onToggle = useCallback(() => {
    dispatch(
      setDarkmode({
        darkmode: !darkmode,
      }),
    );
  }, [darkmode]);

  return {
    darkmode,
    onToggle,
  };
}
