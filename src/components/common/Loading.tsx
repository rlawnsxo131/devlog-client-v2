import { useSelector } from 'react-redux';
import styled from 'styled-components';
import LoopIcon from '../../img/components/icons/LoopIcon';
import palette from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import { RootState } from '../../modules';
import PopupBase from './PopupBase';

interface LoadingProps {}

function Loading(props: LoadingProps) {
  const { darkmode, loading } = useSelector((state: RootState) => ({
    darkmode: state.core.darkmode.darkmode,
    loading: state.core.loading,
  }));
  const fill = darkmode ? palette.gray5 : palette.gray9;
  if (!loading) return null;
  return (
    <PopupBase visible={loading}>
      <Block darkmode={darkmode}>
        <LoopIcon width={150} height={150} fill={fill} />
      </Block>
    </PopupBase>
  );
}

const Block = styled.div<{ darkmode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${transitions.rotation} 1.5s ease-in-out infinite;
`;

export default Loading;
