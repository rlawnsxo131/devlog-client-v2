import { memo } from 'react';
import { css } from '@emotion/react';
import { commentColor } from '../../lib/styles/palette';
import Button from '../common/Button';
import Input from '../common/Input';
import useCommentWrite from './hooks/useCommentWrite';
import TextArea from '../common/TextArea';

interface CommentWriteProps {
  post_id: number;
  reply_comment_id?: number;
  handleShowCommentWrite?: () => void;
}

function CommentWrite({
  post_id,
  reply_comment_id,
  handleShowCommentWrite,
}: CommentWriteProps) {
  const { passwordRef, state, onChange, createComment } = useCommentWrite({
    post_id,
    reply_comment_id,
    handleShowCommentWrite,
  });
  return (
    <div css={block(reply_comment_id)}>
      <div css={informationInputWrapper}>
        <Input
          type="text"
          name="writer"
          placeholder="작성자"
          value={state.writer}
          onChange={onChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호"
          inputRef={passwordRef}
          onChange={onChange}
        />
      </div>
      <TextArea
        name="comment"
        placeholder="댓글을 작성하세요"
        onChange={onChange}
        value={state.comment}
      />
      <div css={saveButtonWrapper}>
        <Button color="indigo" onClick={createComment}>
          댓글 작성
        </Button>
      </div>
    </div>
  );
}

const block = (reply_comment_id?: number) => css`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  ${reply_comment_id &&
  css`
    padding: 1.5rem 2rem 1.5rem 2rem;
    background: ${commentColor[1].background};
  `}
`;

const informationInputWrapper = css`
  display: flex;
  flex-flow: row wrap;
`;

const saveButtonWrapper = css`
  display: flex;
  justify-content: flex-end;
`;

export default memo(CommentWrite);
