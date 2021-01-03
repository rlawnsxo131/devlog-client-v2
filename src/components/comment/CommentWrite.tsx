import { useMutation } from '@apollo/client';
import * as React from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { CreateCommentType, CREATE_COMMENT } from '../../graphql/comment';
import useInputs from '../../lib/hooks/useInputs';
import palette, { darkModeBackground } from '../../lib/styles/palette';
import { RootState } from '../../modules';
import Button from '../common/Button';
import Input from '../common/Input';

type CommentWriteProps = {
  post_id: number;
  reply_comment_id?: number;
  handleShowCommentWrite?: () => void;
};

const { useRef, useCallback, memo } = React;
function CommentWrite({
  post_id,
  reply_comment_id,
  handleShowCommentWrite,
}: CommentWriteProps) {
  const darkMode = useSelector(
    (state: RootState) => state.core.darkMode.darkMode,
  );
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const [state, onChange, onReset] = useInputs({
    password: '',
    writer: '',
    comment: '',
  });
  // need loading, error work
  const [CreateComment] = useMutation<{
    createComment: boolean;
    variables: CreateCommentType;
  }>(CREATE_COMMENT, {
    refetchQueries: ['Comments'],
  });

  const createComment = useCallback(async () => {
    const { writer, password, comment } = state;
    const validate = Object.entries(state).filter(
      ([key, value]) => value.length,
    );
    if (validate.length !== 3) {
      alert('작성자, 비밀번호, 댓글은 필수 입력 사항 입니다.');
      return;
    }
    try {
      await CreateComment({
        variables: {
          post_id,
          reply_comment_id,
          writer,
          password,
          comment,
        },
      });
      alert('성공');
      onReset();
      globalThis.scrollTo(0, globalThis.document.body.scrollHeight);
      if (passwordRef.current) {
        passwordRef.current.value = '';
      }
      if (handleShowCommentWrite) {
        handleShowCommentWrite();
      }
    } catch (e) {
      alert('작성 실패');
    }
  }, [state, post_id, reply_comment_id]);

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
        darkMode={darkMode}
      />
      <SaveButtonArea>
        <Button color="pink" onClick={createComment}>
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
    `}
`;

const InformationInputWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const CommentTextArea = styled.textarea<{ darkMode: boolean }>`
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
    props.darkMode
      ? css`
          border: 1px solid ${palette.gray6};
          background: ${darkModeBackground.main};
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
