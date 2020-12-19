import { useMutation } from '@apollo/client';
import * as React from 'react';
import styled from 'styled-components';
import { CreateCommentType, CREATE_COMMENT } from '../../graphql/comment';
import useInputs from '../../lib/hooks/useInputs';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

type CommentWriteProps = {
  post_id: number;
  reply_comment_id?: number;
};

const { useRef, useCallback, memo } = React;
function CommentWrite({ post_id, reply_comment_id }: CommentWriteProps) {
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const [state, onChange, onReset] = useInputs({
    password: '',
    writer: '',
    comment: '',
  });
  const [CreateComment] = useMutation<{
    createComment: { id: number };
    variables: CreateCommentType;
  }>(CREATE_COMMENT, {
    refetchQueries: ['GetComments'],
  });

  const createComment = useCallback(async () => {
    const { writer, password, comment } = state;
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
      onReset();
      if (!passwordRef.current) return;
      passwordRef.current.value = '';
    } catch (e) {
      alert('작성 실패');
    }
  }, [state, post_id, reply_comment_id]);

  return (
    <Block>
      <InformationInputWrapper>
        <InformationInput
          type="text"
          name="writer"
          placeholder="작성자"
          onChange={onChange}
          value={state.writer}
        />
        <InformationInput
          type="password"
          name="password"
          placeholder="비밀번호"
          ref={passwordRef}
          onChange={onChange}
        />
      </InformationInputWrapper>
      <CommentTextArea
        name="comment"
        placeholder="댓글을 작성하세요"
        onChange={onChange}
        value={state.comment}
      />
      <SaveButtonArea>
        <Button color="pink" onClick={createComment}>
          댓글 작성
        </Button>
      </SaveButtonArea>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

const InformationInputWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const InformationInput = styled.input`
  all: unset;
  border: 1px solid ${palette.gray2};
  border-radius: 4px;
  padding: 0.5rem;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: ${palette.gray5};
  }
`;

const CommentTextArea = styled.textarea`
  all: unset;
  resize: none;
  padding: 1rem 1rem 1.5rem 1rem;
  outline: none;
  border: 1px solid ${palette.gray2};
  margin-bottom: 1.5rem;
  border-radius: 4px;
  min-height: 6.125rem;
  line-height: 1.75;
  ::placeholder {
    color: ${palette.gray5};
  }
`;

const SaveButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default memo(CommentWrite);
