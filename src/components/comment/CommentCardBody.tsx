import { memo } from 'react';
import { css } from '@emotion/react';

interface CommentCardBodyProps {
  comment: string;
}

function CommentCardBody({ comment }: CommentCardBodyProps) {
  return <div css={block}>{comment}</div>;
}

const block = css`
  font-weight: normal;
  white-space: pre-wrap;
  line-height: 1.5;
  word-break: break-all;
  margin-bottom: 2rem;
`;

export default memo(CommentCardBody);
