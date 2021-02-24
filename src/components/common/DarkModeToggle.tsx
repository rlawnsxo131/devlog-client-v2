import { memo } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import zIndexes from '../../lib/styles/zIndexes';
import useToggle from './hooks/useToggle';

interface DarkmodeToggleProps {}

function DarkmodeToggle(props: DarkmodeToggleProps) {
  const { visible, darkmode, onToggle } = useToggle();
  return (
    <Block onClick={onToggle}>
      <ToggleBlock>
        <span className="toggle-moon">&#127769;</span>
        <span className="toggle-sun">&#128262;</span>
        <Circle visible={visible} darkmode={darkmode} />
      </ToggleBlock>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.8rem;
  z-index: ${zIndexes.darkmodeToggle};
  background: black;
  border-radius: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const ToggleBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 3.423rem;
  z-index: ${zIndexes.darkmodeToggle};
  span {
    position: absolute;
    display: inline-block;
    font-size: 1rem;
  }
  .toggle-moon {
    left: 5%;
  }
  .toggle-sun {
    left: 56%;
  }
`;

const Circle = styled.div<{ visible: boolean; darkmode: boolean }>`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  background: white;
  border: 2.5px solid ${palette.indigo4};
  box-shadow: 1px 1px 10px 1px ${palette.indigo4};
  ${(props) =>
    props.darkmode
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `}
  ${(props) => {
    if (!props.visible) return null;
    return props.darkmode
      ? css`
          animation: ${transitions.slideRight} 0.125s ease-in both;
        `
      : css`
          animation: ${transitions.slideLeft} 0.125s ease-in both;
        `;
  }}
`;

export default memo(DarkmodeToggle);
