import { useRef, useCallback } from 'react';

type ThrottleFunctionType = () => void;

export default function useThrottle(
  func: ThrottleFunctionType,
  delay: number,
): ThrottleFunctionType {
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const handler = useRef<ThrottleFunctionType | undefined>(undefined);

  handler.current = useCallback(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        func();
        timer.current = undefined;
      }, delay);
    }
  }, []);

  return handler.current;
}
