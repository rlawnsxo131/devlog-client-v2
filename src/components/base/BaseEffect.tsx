import * as React from 'react';
import useDarkMode from '../../lib/hooks/useDarkMode';

type BaseEffectProps = {
  children: React.ReactNode;
};

function BaseEffect({ children }: BaseEffectProps) {
  useDarkMode();
  return <>{children}</>;
}

export default BaseEffect;
