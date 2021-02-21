import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from '../../modules/error';
import errorTypeManager from '../errorTypeManager';

export default function useError() {
  const dispatch = useDispatch();

  const handleError = useCallback((error: any) => {
    const errorType = errorTypeManager(error);
    dispatch(setError({ errorType }));
  }, []);

  return [handleError] as const;
}
