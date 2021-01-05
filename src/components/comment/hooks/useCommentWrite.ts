import { useMutation } from '@apollo/client';
import { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CreateCommentType, CREATE_COMMENT } from '../../../graphql/comment';
import useInputs from '../../../lib/hooks/useInputs';
import { normalizedString } from '../../../lib/utils';
import { RootState } from '../../../modules';

type UseCommentWriteProps = {
  post_id: number;
  reply_comment_id?: number;
  handleShowCommentWrite?: () => void;
};
type UseCommentWrite = {
  darkMode: boolean;
  passwordRef: React.MutableRefObject<HTMLInputElement | null>;
  state: {
    password: string;
    writer: string;
    comment: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  createComment: () => Promise<void>;
};

export default function useCommentWrite({
  post_id,
  reply_comment_id,
  handleShowCommentWrite,
}: UseCommentWriteProps): UseCommentWrite {
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
    const validate = Object.entries(state).filter(([key, value]) =>
      normalizedString(value),
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

  return {
    darkMode,
    passwordRef,
    state,
    onChange,
    createComment,
  };
}
