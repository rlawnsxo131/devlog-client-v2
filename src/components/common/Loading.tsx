import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import LoopIcon from '../../img/components/icons/LoopIcon';
import palette from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import { RootState } from '../../modules';
import OpaqueLayer from './OpaqueLayer';

interface LoadingProps {}

function Loading(props: LoadingProps) {
  const { darkmode, loading } = useSelector((state: RootState) => ({
    darkmode: state.core.darkmode.darkmode,
    loading: state.core.loading,
  }));
  const fill = useMemo(() => {
    return darkmode ? palette.gray5 : palette.gray9;
  }, [darkmode]);
  if (!loading) return null;
  return (
    <OpaqueLayer visible={true} darkmode={darkmode}>
      <div css={block}>
        <LoopIcon width={150} height={150} fill={fill} />
      </div>
    </OpaqueLayer>
  );
}

const block = css`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${transitions.rotation} 1.5s ease-in-out infinite;
`;

export default Loading;
