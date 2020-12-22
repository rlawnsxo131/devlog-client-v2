import * as React from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import zIndexes from '../../lib/styles/zIndexes';

type CommentEditModalProps = {};

function CommentEditModal(props: CommentEditModalProps) {
  return (
    <Block>
      <Header>댓글 수정/삭제</Header>
    </Block>
  );
}

const Block = styled.div`
  position: fixed;
  top: 15%;
  left: calc(100vw / 2);
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  background: white;
  z-index: ${zIndexes.commentEditModal};
  padding: 1rem;
  border: 1px solid black;

  ${media.xsmall} {
    width: 320px;
    height: 300px;
  }
  ${media.small} {
    width: 600px;
  }
`;

const Header = styled.h4`
  margin: 0;
  padding: 0;
  font-weight: 600;
`;

export default CommentEditModal;
