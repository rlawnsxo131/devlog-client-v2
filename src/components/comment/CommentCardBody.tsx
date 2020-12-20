import * as React from 'react';
import styled from 'styled-components';

type CommentCardBodyProps = {
  comment: string;
};

function CommentCardBody({ comment }: CommentCardBodyProps) {
  return <Block>{comment}</Block>;
}

const Block = styled.div`
  font-weight: normal;
  white-space: pre-wrap;
  line-height: 1.5;
  word-break: break-all;
  margin-bottom: 2rem;
`;

export default CommentCardBody;
