import { memo } from 'react';
import styled, { css } from 'styled-components';
import palette, {
  commentColor,
  darkmodeBackground,
} from '../../lib/styles/palette';
import Button from '../common/Button';
import Input from '../common/Input';
import useCommentWrite from './hooks/useCommentWrite';

type CommentWriteProps = {
  post_id: number;
  reply_comment_id?: number;
  handleShowCommentWrite?: () => void;
};

function CommentWrite({
  post_id,
  reply_comment_id,
  handleShowCommentWrite,
}: CommentWriteProps) {
  const {
    darkmode,
    passwordRef,
    state,
    onChange,
    createComment,
  } = useCommentWrite({
    post_id,
    reply_comment_id,
    handleShowCommentWrite,
  });
  return (
    <Block reply_comment_id={reply_comment_id}>
      <InformationInputWrapper>
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
      </InformationInputWrapper>
      <CommentTextArea
        name="comment"
        placeholder="댓글을 작성하세요"
        onChange={onChange}
        value={state.comment}
        darkmode={darkmode}
      />
      <SaveButtonArea>
        <Button color="indigo" onClick={createComment}>
          댓글 작성
        </Button>
      </SaveButtonArea>
    </Block>
  );
}

const Block = styled.div<{ reply_comment_id?: number }>`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
  ${(props) =>
    props.reply_comment_id &&
    css`
      padding: 1.5rem 2rem 1.5rem 2rem;
      background: ${commentColor[1].background};
    `}
`;

const InformationInputWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const CommentTextArea = styled.textarea<{ darkmode: boolean }>`
  all: unset;
  resize: none;
  padding: 1rem 1rem 1.5rem 1rem;
  outline: none;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  min-height: 6.125rem;
  line-height: 1.75;
  ::placeholder {
    color: ${palette.gray5};
  }
  ${(props) =>
    props.darkmode
      ? css`
          border: 1px solid ${palette.gray6};
          background: ${darkmodeBackground.main};
        `
      : css`
          border: 1px solid ${palette.gray2};
          background: white;
        `}
`;

const SaveButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default memo(CommentWrite);
