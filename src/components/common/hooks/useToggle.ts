import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { onDarkMode } from '../../../modules/core';

type useToggle = {
  visible: boolean;
  darkMode: boolean;
  onToggle: () => void;
};

export default function useToggle(): useToggle {
  const dispatch = useDispatch();
  const visible = useSelector(
    (state: RootState) => state.core.darkMode.visible,
  );
  const darkMode = useSelector(
    (state: RootState) => state.core.darkMode.darkMode,
  );

  const onToggle = useCallback(() => {
    dispatch(
      onDarkMode({
        visible: true,
        darkMode: !darkMode,
      }),
    );
  }, [darkMode]);

  return {
    visible,
    darkMode,
    onToggle,
  };
}
