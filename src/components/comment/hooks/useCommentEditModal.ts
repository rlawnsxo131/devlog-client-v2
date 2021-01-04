import { useMutation } from '@apollo/client';
import { useCallback } from 'react';
import {
  RemoveCommentType,
  REMOVE_COMMENT,
  UpdateCommentType,
  UPDATE_COMMENT,
} from '../../../graphql/comment';
import errorManager from '../../../lib/errorManager';
import useInputs from '../../../lib/hooks/useInputs';
import { normalizedString } from '../../../lib/utils';

type UseCommentEditModalProps = {
  writer: string;
  comment: string;
  comment_id: number;
  handleSetVisible: () => void;
};

export default function useCommentEditModal({
  writer,
  comment,
  comment_id,
  handleSetVisible,
}: UseCommentEditModalProps) {
  const [state, onChange] = useInputs({
    writer: writer,
    password: '',
    comment: comment,
  });
  const [UpdateComment] = useMutation<{
    updateCommnet: boolean;
    variables: UpdateCommentType;
  }>(UPDATE_COMMENT, {
    refetchQueries: ['Comments'],
  });
  const [RemoveComment] = useMutation<{
    removeComment: boolean;
    variables: RemoveCommentType;
  }>(REMOVE_COMMENT, {
    refetchQueries: ['Comments'],
  });

  const updateComment = useCallback(async () => {
    const { writer, password, comment } = state;
    const validate = Object.entries(state).filter(([key, value]) =>
      normalizedString(value),
    );
    if (validate.length !== 3) {
      alert('작성자, 비밀번호, 댓글은 필수 입력 사항 입니다.');
      return;
    }
    try {
      await UpdateComment({
        variables: {
          comment_id,
          password,
          writer,
          comment,
        },
      });
      handleSetVisible();
    } catch (e) {
      errorManager(e);
    }
  }, [state]);

  const removeComment = useCallback(async () => {
    const { password } = state;
    if (!normalizedString(password)) {
      alert('비밀번호를 입력하세요');
      return;
    }
    try {
      await RemoveComment({
        variables: {
          comment_id,
          password,
        },
      });
      handleSetVisible();
    } catch (e) {
      errorManager(e);
    }
  }, [comment_id, state.password]);

  return {
    state,
    onChange,
    updateComment,
    removeComment,
  };
}
