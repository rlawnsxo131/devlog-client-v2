import useDarkmode from '../../lib/hooks/useDarkmode';

type BaseEffectProps = {
  children: React.ReactNode;
};

function BaseEffect({ children }: BaseEffectProps) {
  useDarkmode();
  return <>{children}</>;
}

export default BaseEffect;
