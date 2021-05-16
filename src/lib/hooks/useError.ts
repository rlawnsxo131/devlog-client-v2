import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorEnum, setError } from '../../modules/error';
import errorTypeManager from '../errorTypeManager';

export default function useError() {
  const dispatch = useDispatch();

  const handleError = useCallback(
    (error: any) => {
      const errorType = errorTypeManager(error) as ErrorEnum;
      dispatch(setError({ errorType }));
    },
    [dispatch],
  );

  return [handleError] as const;
}
