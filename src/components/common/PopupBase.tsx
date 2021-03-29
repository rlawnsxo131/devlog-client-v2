import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import { RootState } from '../../modules';
import OpaqueLayer from './OpaqueLayer';

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
    <OpaqueLayer visible={visible} darkmode={darkmode}>
      <div css={popup(visible, darkmode)}>{children}</div>
    </OpaqueLayer>
  );
}

const popup = (visible: boolean, darkmode: boolean) => css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${darkmode ? darkmodeBackground.other : 'white'};
  box-shadow: 1px 1px 10px 2px ${darkmode ? palette.gray9 : palette.gray3};
  ${visible
    ? css`
        animation: ${transitions.popInFromBottom} 0.25s forwards ease-in-out;
      `
    : css`
        animation: ${transitions.popOutToBottom} 0.25s forwards ease-in-out;
      `};
`;

export default memo(PopupBase);
