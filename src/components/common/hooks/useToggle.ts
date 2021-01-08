import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../modules';
import { onDarkmode } from '../../../modules/core';

type UseToggle = {
  visible: boolean;
  darkmode: boolean;
  onToggle: () => void;
};

export default function useToggle(): UseToggle {
  const dispatch = useDispatch();
  const visible = useSelector(
    (state: RootState) => state.core.darkmode.visible,
  );
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );

  const onToggle = useCallback(() => {
    dispatch(
      onDarkmode({
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
