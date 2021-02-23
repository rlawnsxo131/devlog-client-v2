import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { CommentType } from '../../graphql/comment';
import palette, { commentColor } from '../../lib/styles/palette';
import { RootState } from '../../modules';
import { resetCommentError } from '../../modules/comment';
import CommentCardBody from './CommentCardBody';
import CommentCardFooter from './CommentCardFooter';
import CommentCardHeader from './CommentCardHeader';
import CommentEditModal from './CommentEditModal';

type CommentCardProps = {
  reply: CommentType;
  fullCount?: number;
};

function CommentCard({ reply, fullCount }: CommentCardProps) {
  const dispatch = useDispatch();
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  const [visible, setVisible] = useState<boolean>(false);
  const handleSetVisible = useCallback(() => {
    setVisible((state) => !state);
    dispatch(resetCommentError({}));
  }, []);

  return (
    <Block level={reply.level} darkmode={darkmode}>
      <CommentCardHeader
        writer={reply.writer}
        deleted={reply.deleted}
        created_at={reply.created_at}
        edited_at={reply.edited_at}
        handleSetVisible={handleSetVisible}
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
      <CommentEditModal
        visible={visible}
        writer={reply.writer}
        comment={reply.comment}
        comment_id={reply.id}
        handleSetVisible={handleSetVisible}
      />
    </Block>
  );
}

const Block = styled.div<{ level: number; darkmode: boolean }>`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 1rem;
  ${(props) => {
    if (props.level === 0) {
      return css`
        border-bottom: 1px solid
          ${props.darkmode ? palette.gray6 : palette.gray1};
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
