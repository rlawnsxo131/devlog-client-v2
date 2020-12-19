import * as React from 'react';
import styled from 'styled-components';
import { CommentType } from '../../graphql/comment';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import CommentWrite from './CommentWrite';

type CommentCardProps = {
  reply: CommentType;
  fullCount?: number;
};

const { useState, useMemo, useCallback, memo } = React;
function CommentCard({ reply, fullCount }: CommentCardProps) {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [showCommentWrite, setShowCommentWrite] = useState<boolean>(false);
  const replyTriggerWord = useMemo(() => {
    if (reply.has_replies) {
      return showReply
        ? '숨기기'
        : `${fullCount ? fullCount : reply.replies.length} 개의 답글`;
    }
    if (!reply.has_replies) {
      return reply.deleted ? '' : '답글 남기기';
    }
  }, [reply.has_replies, showReply]);

  const onCommentWrite = useCallback(() => {
    setShowCommentWrite((state) => !state);
  }, []);

  return (
    <Block>
      <Header>
        <HeaderInfo>
          <div className="writer">{reply.writer}</div>
          <div className="date">
            {reply.edited_at
              ? formatDate(reply.edited_at)
              : formatDate(reply.created_at)}
          </div>
        </HeaderInfo>
        <HeaderEdit>수정/삭제</HeaderEdit>
      </Header>
      <Body>{reply.comment}</Body>
      <Footer>
        {reply.level < 2 && (
          <ReplyTrigger onClick={onCommentWrite}>
            {replyTriggerWord}
          </ReplyTrigger>
        )}
      </Footer>
      {showCommentWrite && (
        <CommentWrite post_id={reply.post_id} reply_comment_id={reply.id} />
      )}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  padding-bottom: 1rem;
  & + & {
    border-top: 1px solid ${palette.gray1};
  }
`;

const Header = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  .writer {
    font-weight: 600;
  }
  .date {
    color: ${palette.gray6};
  }
`;

const HeaderEdit = styled.div`
  display: flex;
  flex-flow: row wrap;
  color: ${palette.gray6};
  &:hover {
    cursor: pointer;
    color: ${palette.gray5};
  }
`;

const Body = styled.div`
  font-weight: normal;
  white-space: pre-wrap;
  line-height: 1.5;
  word-break: break-all;
  margin-bottom: 2rem;
`;

const Footer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const ReplyTrigger = styled.div`
  font-weight: bold;
  color: ${palette.pink6};
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  &:hover {
    cursor: pointer;
    color: ${palette.pink5};
  }
`;

export default memo(CommentCard);
