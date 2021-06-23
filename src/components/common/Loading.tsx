import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import palette from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import { RootState } from '../../modules';
import OpaqueLayer from './OpaqueLayer';
import LoadingIcon from '../../img/components/icons/LoadingIcon';

interface LoadingProps {}

function Loading(props: LoadingProps) {
  const { darkmode, loading } = useSelector((state: RootState) => ({
    darkmode: state.core.darkmode.darkmode,
    loading: state.core.loading,
  }));

  const fill = useMemo(() => {
    return darkmode ? palette.gray5 : palette.gray2;
  }, [darkmode]);

  if (!loading) return null;

  return (
    <OpaqueLayer visible={true} darkmode={darkmode}>
      <div css={block}>
        <LoadingIcon fill={fill} />
      </div>
    </OpaqueLayer>
  );
}

const block = css`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${transitions.rotation} 1.25s ease-in-out infinite;
`;

export default Loading;
