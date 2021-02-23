import { useMutation } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RemoveCommentType,
  REMOVE_COMMENT,
  UpdateCommentType,
  UPDATE_COMMENT,
} from '../../../graphql/comment';
import errorTypeManager from '../../../lib/errorTypeManager';
import useInputs from '../../../lib/hooks/useInputs';
import useLoading from '../../../lib/hooks/useLoading';
import { normalizedString } from '../../../lib/utils';
import { RootState } from '../../../modules';
import {
  CommentErrorEnum,
  resetCommentError,
  setCommentError,
} from '../../../modules/comment';

type UseCommentEditModalProps = {
  writer: string;
  comment: string;
  comment_id: number;
  handleSetVisible: () => void;
};
type UseCommentEditModal = {
  state: {
    writer: string;
    password: string;
    comment: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  updateComment: () => Promise<void>;
  removeComment: () => Promise<void>;
  errorType: CommentErrorEnum | null;
  darkmode: boolean;
};

export default function useCommentEditModal({
  writer,
  comment,
  comment_id,
  handleSetVisible,
}: UseCommentEditModalProps): UseCommentEditModal {
  const dispatch = useDispatch();
  const errorType = useSelector((state: RootState) => state.comment.errorType);
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  const [startLoading, endLoading] = useLoading();
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

  const handleCommentError = useCallback((error: any) => {
    dispatch(
      setCommentError({
        errorType: errorTypeManager(error),
      }),
    );
  }, []);

  const updateComment = useCallback(async () => {
    const { writer, password, comment } = state;
    const validate = Object.entries(state).filter(([key, value]) =>
      normalizedString(value),
    );
    if (validate.length !== 3) {
      alert('작성자, 비밀번호, 댓글은 필수 입력 사항 입니다.');
      return;
    }
    const validate2 = globalThis.confirm('댓글을 수정하시겠어요?');
    if (!validate2) return;
    try {
      startLoading();
      await UpdateComment({
        variables: {
          comment_id,
          password,
          writer,
          comment,
        },
      });
      endLoading();
      handleSetVisible();
      // 여기 alert
      dispatch(resetCommentError({}));
    } catch (e) {
      endLoading();
      handleCommentError(e);
    }
  }, [state]);

  const removeComment = useCallback(async () => {
    const { password } = state;
    if (!normalizedString(password)) {
      alert('비밀번호를 입력하세요');
      return;
    }
    const validate2 = globalThis.confirm('댓글을 삭제하시겠어요?');
    if (!validate2) return;
    try {
      startLoading();
      await RemoveComment({
        variables: {
          comment_id,
          password,
        },
      });
      endLoading();
      handleSetVisible();
      // 여기 alert
      dispatch(resetCommentError({}));
    } catch (e) {
      endLoading();
      handleCommentError(e);
    }
  }, [comment_id, state.password]);

  useEffect(() => {
    if (!errorType) return;
    dispatch(resetCommentError({}));
  }, [state]);

  return {
    state,
    onChange,
    updateComment,
    removeComment,
    errorType,
    darkmode,
  };
}
