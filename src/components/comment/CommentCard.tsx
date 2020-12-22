import * as React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { CommentType } from '../../graphql/comment';
import palette, { commentColor } from '../../lib/styles/palette';
import { RootState } from '../../modules';
import CommentCardBody from './CommentCardBody';
import CommentCardFooter from './CommentCardFooter';
import CommentCardHeader from './CommentCardHeader';

type CommentCardProps = {
  reply: CommentType;
  fullCount?: number;
};

const { memo } = React;
function CommentCard({ reply, fullCount }: CommentCardProps) {
  const darkMode = useSelector(
    (state: RootState) => state.core.darkMode.darkMode,
  );

  return (
    <Block level={reply.level} darkMode={darkMode}>
      <CommentCardHeader
        writer={reply.writer}
        created_at={reply.created_at}
        edited_at={reply.edited_at}
      />
      <CommentCardBody comment={reply.comment} />
      <CommentCardFooter
        post_id={reply.post_id}
        reply_id={reply.id}
        level={reply.level}
        deleted={reply.deleted}
        replies={reply.replies}
        has_replies={reply.has_replies}
        fullCount={fullCount}
      />
    </Block>
  );
}

const Block = styled.div<{ level: number; darkMode: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 1rem;
  ${(props) => {
    if (props.level === 0) {
      return css`
        & + & {
          border-top: 1px solid
            ${props.darkMode ? palette.gray6 : palette.gray1};
        }
      `;
    }
    if (props.level > 0) {
      return css`
        padding-left: 2rem;
        padding-right: 2rem;
        background: ${commentColor[props.level].background};
      `;
    }
  }}
`;

export default memo(CommentCard);
