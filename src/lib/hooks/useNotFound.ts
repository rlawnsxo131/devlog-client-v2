import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorEnum, setError } from '../../modules/error';

export default function useNotFound() {
  const dispatch = useDispatch();

  const setNotFound = useCallback(() => {
    dispatch(
      setError({
        errorType: ErrorEnum.NOT_FOUND,
      }),
    );
  }, []);

  return [setNotFound] as const;
}
