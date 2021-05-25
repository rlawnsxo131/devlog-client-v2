import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorEnum, setError } from '../../modules/error';
import errorManager from '../errorManager';

export default function useError() {
  const dispatch = useDispatch();

  const handleError = useCallback(
    (error: any) => {
      const errorType = errorManager(error) as ErrorEnum;
      dispatch(setError({ errorType }));
    },
    [dispatch],
  );

  return [handleError] as const;
}
