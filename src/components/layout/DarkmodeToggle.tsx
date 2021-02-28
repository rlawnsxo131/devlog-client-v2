import { memo } from 'react';
import styled from 'styled-components';
import ModeLightIcon from '../../img/components/icons/ModeLightIcon';
import ModeNightIcon from '../../img/components/icons/ModeNightIcon';
import zIndexes from '../../lib/styles/zIndexes';
import useDarkmodeToggle from './hooks/useDarkmodeToggle';

interface DarkmodeToggleProps {}

function DarkmodeToggle(props: DarkmodeToggleProps) {
  const { darkmode, onToggle } = useDarkmodeToggle();
  return (
    <Block onClick={onToggle}>
      {darkmode ? <ModeNightIcon /> : <ModeLightIcon />}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.2rem;
  z-index: ${zIndexes.darkmodeToggle};
  border-radius: 100%;
`;

export default memo(DarkmodeToggle);
