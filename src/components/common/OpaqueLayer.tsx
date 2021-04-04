import { css } from '@emotion/react';
import transitions from '../../lib/styles/transitions';
import zIndexes from '../../lib/styles/zIndexes';

interface OpaqueLayerProps {
  darkmode: boolean;
  visible: boolean;
  children: React.ReactNode;
}

function OpaqueLayer({ visible, darkmode, children }: OpaqueLayerProps) {
  return <div css={block(visible, darkmode)}>{children}</div>;
}

const block = (visible: boolean, darkmode: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${zIndexes.popupBase};
  ${darkmode
    ? css`
        background: rgba(100, 100, 100, 0.5);
      `
    : css`
        background: rgba(255, 255, 255, 0.5);
      `}
  ${visible
    ? css`
        animation: ${transitions.fadeIn} 0.25s forwards;
      `
    : css`
        animation: ${transitions.fadeOut} 0.25s forwards;
      `}
`;

export default OpaqueLayer;
