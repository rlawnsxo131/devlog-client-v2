import * as React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import zIndexes from '../../lib/styles/zIndexes';

type PopupBaseProps = {
  children: React.ReactNode;
  visible: boolean;
};

const { useState, useEffect, memo } = React;
function PopupBase({ children, visible }: PopupBaseProps) {
  const [closed, setClosed] = useState(true);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (visible) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!visible && closed) return null;

  return (
    <Block visible={visible}>
      <ChildrenWrapper visible={visible}>{children}</ChildrenWrapper>
    </Block>
  );
}

const Block = styled.div<{ visible: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  z-index: ${zIndexes.PopupBase};
  ${(props) =>
    props.visible
      ? css`
          animation: ${transitions.fadeIn} 0.25s forwards;
        `
      : css`
          animation: ${transitions.fadeOut} 0.25s forwards;
        `}
`;

const ChildrenWrapper = styled.div<{ visible: boolean }>`
  position: relative;
  top: -15%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px 10px 2px ${palette.gray3};
  ${(props) =>
    props.visible
      ? css`
          animation: ${transitions.popInFromBottom} 0.4s forwards ease-in-out;
        `
      : css`
          animation: ${transitions.popOutToBottom} 0.2s forwards ease-in-out;
        `};
`;

export default memo(PopupBase);
