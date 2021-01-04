import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { CommentType } from '../../graphql/comment';
import CommentCards from './CommentCards';
import Button from '../common/Button';
import CommentWrite from './CommentWrite';

type CommentCardFooterProps = {
  post_id: number;
  reply_id: number;
  level: number;
  deleted: boolean;
  replies: Array<CommentType>;
  has_replies: boolean;
  fullCount?: number;
};

const { useState, useCallback, useEffect, memo } = React;
function CommentCardFooter({
  post_id,
  reply_id,
  level,
  deleted,
  replies,
  has_replies,
  fullCount,
}: CommentCardFooterProps) {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [showCommentWrite, setShowCommentWrite] = useState<boolean>(false);
  const [replyTriggerIcon, setReplyTriggerIcon] = useState<boolean>(false);
  const [replyTriggerText, setReplyTriggerText] = useState<string>('');

  const handleShowReply = useCallback(() => {
    setShowReply((state) => !state);
  }, []);
  const handleShowCommentWrite = useCallback(() => {
    setShowCommentWrite((state) => !state);
  }, []);

  useEffect(() => {
    if (has_replies) {
      if (showReply) {
        setReplyTriggerText('숨기기');
        setReplyTriggerIcon(false);
        return;
      }
      if (!showReply) {
        setReplyTriggerText(
          fullCount ? `${fullCount}개의 댓글` : `${replies.length}개의 댓글`,
        );
        setReplyTriggerIcon(true);
        return;
      }
    }
    if (!has_replies) {
      if (showReply) {
        setReplyTriggerText('숨기기');
        setReplyTriggerIcon(false);
        setShowCommentWrite(true);
      }
      if (!showReply && !deleted) {
        setReplyTriggerText('답글 달기');
        setReplyTriggerIcon(true);
        setShowCommentWrite(false);
      }
      return;
    }
  }, [has_replies, showReply]);

  return (
    <Block level={level}>
      {level < 2 && (
        <ReplyTrigger onClick={handleShowReply}>
          {replyTriggerIcon ? (
            <IoAdd className="reply-icon" />
          ) : (
            <IoRemove className="reply-icon" />
          )}
          {replyTriggerText}
        </ReplyTrigger>
      )}
      {showReply && (
        <RepliesWrapper>
          <CommentCards replies={replies} />
        </RepliesWrapper>
      )}
      {level < 2 && showReply && (
        <CommentWriteWrapper>
          {showCommentWrite && (
            <CommentWrite
              post_id={post_id}
              reply_comment_id={reply_id}
              handleShowCommentWrite={handleShowCommentWrite}
            />
          )}
          {has_replies && (
            <Button
              color="pink"
              size="responsive"
              onClick={handleShowCommentWrite}
            >
              {showCommentWrite ? '숨기기' : '답글 달기'}
            </Button>
          )}
        </CommentWriteWrapper>
      )}
    </Block>
  );
}

const Block = styled.div<{ level: number }>`
  display: flex;
  flex-direction: column;
`;

const ReplyTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${palette.pink5};
  font-weight: 600;
  .reply-icon {
    font-size: 0.8rem;
    border: 1px solid ${palette.pink5};
  }
  &:hover {
    cursor: pointer;
    color: ${palette.pink4};
    .reply-icon {
      border: 1px solid ${palette.pink4};
    }
  }
`;

const RepliesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentWriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .comment-write-button-wrapper {
    /* margin-top: 1rem; */
  }
`;

export default memo(CommentCardFooter);
