import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showPopup } from '../../modules/core';

export default function useShowPopup() {
  const dispatch = useDispatch();
  const onShowPopup = useCallback(
    ({ title, message }: { title: string; message: string }) => {
      dispatch(
        showPopup({
          title,
          message,
        }),
      );
    },
    [],
  );
  return [onShowPopup] as const;
}
