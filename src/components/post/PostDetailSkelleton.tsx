import * as React from 'react';
import styled from 'styled-components';
import media, { mediaQuery } from '../../lib/styles/media';

type PostDetailSkelletonProps = {};

function PostDetailSkelleton(props: PostDetailSkelletonProps) {
  return <Block></Block>;
}

const Block = styled.div`
  flex-direction: column;
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

export default PostDetailSkelleton;
