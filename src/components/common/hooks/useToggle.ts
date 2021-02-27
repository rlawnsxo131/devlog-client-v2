import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { setDarkmode } from '../../../modules/core';

export default function useToggle() {
  const dispatch = useDispatch();
  const visible = useSelector(
    (state: RootState) => state.core.darkmode.visible,
  );
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );

  const onToggle = useCallback(() => {
    dispatch(
      setDarkmode({
        visible: true,
        darkmode: !darkmode,
      }),
    );
  }, [darkmode]);

  return {
    visible,
    darkmode,
    onToggle,
  };
}
