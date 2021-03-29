import { css } from '@emotion/react';
import palette from '../../lib/styles/palette';
import { CommentData } from '../../graphql/comment';
import CommentCards from './CommentCards';
import Button from '../common/Button';
import CommentWrite from './CommentWrite';
import PlusIcon from '../../img/components/icons/PlusIcon';
import MinusIcon from '../../img/components/icons/MinusIcon';
import { memo, useCallback, useEffect, useState } from 'react';

interface CommentCardFooterProps {
  post_id: number;
  reply_id: number;
  level: number;
  deleted: boolean;
  replies: Array<CommentData>;
  has_replies: boolean;
  fullCount?: number;
}

function CommentCardFooter({
  post_id,
  reply_id,
  level,
  deleted,
  replies,
  has_replies,
  fullCount,
}: CommentCardFooterProps) {
  if (level > 1) return null;
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
    <div css={block}>
      <div css={replyTrigger} onClick={handleShowReply}>
        {replyTriggerIcon ? (
          <PlusIcon fill={palette.indigo5} width={14} height={14} />
        ) : (
          <MinusIcon fill={palette.indigo5} width={14} height={14} />
        )}
        {replyTriggerText}
      </div>
      {showReply && (
        <div css={repliesWrapper}>
          <CommentCards replies={replies} />
        </div>
      )}
      {showReply && (
        <div css={commentWriteWrapper}>
          {showCommentWrite && (
            <CommentWrite
              post_id={post_id}
              reply_comment_id={reply_id}
              handleShowCommentWrite={handleShowCommentWrite}
            />
          )}
          {has_replies && (
            <Button
              color="indigo"
              size="responsive"
              onClick={handleShowCommentWrite}
            >
              {showCommentWrite ? '숨기기' : '답글 달기'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

const block = css`
  display: flex;
  flex-direction: column;
`;

const replyTrigger = css`
  display: flex;
  align-items: center;
  color: ${palette.indigo5};
  font-weight: 600;
  svg {
    margin-right: 0.25rem;
    border: 1px solid ${palette.indigo5};
  }
  &:hover {
    cursor: pointer;
    color: ${palette.indigo4};
  }
`;

const repliesWrapper = css`
  display: flex;
  flex-direction: column;
`;

const commentWriteWrapper = css`
  display: flex;
  flex-direction: column;
`;

export default memo(CommentCardFooter);
