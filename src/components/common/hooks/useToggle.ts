import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useDarkMode from '../../../lib/hooks/useDarkMode';
import { onDarkMode } from '../../../modules/core';

type useToggle = {
  visible: boolean;
  darkMode: boolean;
  onToggle: () => void;
};

export default function useToggle(): useToggle {
  const dispatch = useDispatch();
  const { visible, darkMode } = useDarkMode();

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
