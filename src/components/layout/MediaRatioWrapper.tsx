import * as React from 'react';
import styled, { css } from 'styled-components';
import media, { mediaQuery } from '../../lib/styles/media';

type MediaRatioWrapperProps = {
  children: React.ReactNode;
  type: 'row' | 'column';
};

function MediaRatioWrapper({ children, type }: MediaRatioWrapperProps) {
  return <Block type={type}>{children}</Block>;
}

const Block = styled.div<{ type: string }>`
  display: flex;
  ${(props) =>
    props.type === 'row'
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
