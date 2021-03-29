import { css } from '@emotion/react';
import media, { mediaQuery } from '../../lib/styles/media';

interface MediaRatioWrapperProps {
  children: React.ReactNode;
  type: 'row' | 'column';
}

function MediaRatioWrapper({ children, type }: MediaRatioWrapperProps) {
  return <div css={block(type)}>{children}</div>;
}

const block = (type: 'row' | 'column') => css`
  display: flex;
  ${type === 'row'
    ? css`
        flex-flow: row wrap;
      `
    : css`
        flex-direction: column;
      `}
  ${media.xsmall} {
    width: calc(100vw - 2rem);
  }
  ${media.small} {
    width: 736px;
  }
  ${mediaQuery(800)} {
    width: 768px;
  }
`;

export default MediaRatioWrapper;
