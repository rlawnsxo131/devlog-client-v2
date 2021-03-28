import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import zIndexes from '../../lib/styles/zIndexes';
import { RootState } from '../../modules';

interface PopupBaseProps {
  children: React.ReactNode;
  visible: boolean;
}

function PopupBase({ children, visible }: PopupBaseProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  const [closed, setClosed] = useState(true);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (visible) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 250);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!visible && closed) return null;

  return (
    <Block visible={visible} darkmode={darkmode}>
      <PopupWrapper visible={visible} darkmode={darkmode}>
        {children}
      </PopupWrapper>
    </Block>
  );
}

const Block = styled.div<{ visible: boolean; darkmode: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${zIndexes.popupBase};
  ${(props) =>
    props.darkmode
      ? css`
          background: rgba(100, 100, 100, 0.5);
        `
      : css`
          background: rgba(255, 255, 255, 0.5);
        `}
  ${(props) =>
    props.visible
      ? css`
          animation: ${transitions.fadeIn} 0.25s forwards;
        `
      : css`
          animation: ${transitions.fadeOut} 0.25s forwards;
        `};
`;

const PopupWrapper = styled.div<{ visible: boolean; darkmode: boolean }>`
  position: relative;
  top: -5%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    props.darkmode ? darkmodeBackground.other : 'white'};
  box-shadow: 1px 1px 10px 2px
    ${(props) => (props.darkmode ? palette.gray9 : palette.gray3)};
  ${(props) =>
    props.visible
      ? css`
          animation: ${transitions.popInFromBottom} 0.25s forwards ease-in-out;
        `
      : css`
          animation: ${transitions.popOutToBottom} 0.25s forwards ease-in-out;
        `};
`;

export default memo(PopupBase);
