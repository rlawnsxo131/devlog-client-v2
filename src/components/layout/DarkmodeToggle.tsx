import { memo } from 'react';
import { css } from '@emotion/react';
import ModeLightIcon from '../../img/components/icons/ModeLightIcon';
import ModeNightIcon from '../../img/components/icons/ModeNightIcon';
import zIndexes from '../../lib/styles/zIndexes';
import useDarkmodeToggle from './hooks/useDarkmodeToggle';

interface DarkmodeToggleProps {}

function DarkmodeToggle(props: DarkmodeToggleProps) {
  const { darkmode, onToggle } = useDarkmodeToggle();
  return (
    <div css={block} onClick={onToggle}>
      {darkmode ? <ModeNightIcon /> : <ModeLightIcon />}
    </div>
  );
}

const block = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.2rem;
  z-index: ${zIndexes.darkmodeToggle};
  border-radius: 100%;
`;

export default memo(DarkmodeToggle);
