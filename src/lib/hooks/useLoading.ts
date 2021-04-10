import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../modules/core';

export default function useLoading() {
  const dispatch = useDispatch();

  const startLoading = useCallback(() => {
    dispatch(setLoading({ loading: true }));
  }, [dispatch]);

  const endLoading = useCallback(() => {
    dispatch(setLoading({ loading: false }));
  }, [dispatch]);

  return [startLoading, endLoading] as const;
}
