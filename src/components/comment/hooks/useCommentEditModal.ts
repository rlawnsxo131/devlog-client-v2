import { useMutation } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  RemoveCommentData,
  REMOVE_COMMENT,
  UpdateCommentData,
  UPDATE_COMMENT,
} from '../../../graphql/comment';
import errorTypeManager from '../../../lib/errorTypeManager';
import useInputs from '../../../lib/hooks/useInputs';
import useLoading from '../../../lib/hooks/useLoading';
import useShowPopup from '../../../lib/hooks/useShowPopup';
import { normalizedString } from '../../../lib/utils';
import { RootState } from '../../../modules';
import {
  CommentErrorEnum,
  resetCommentError,
  setCommentError,
} from '../../../modules/comment';

interface UseCommentEditModalProps {
  writer: string;
  comment: string;
  comment_id: number;
  handleSetVisible: () => void;
}

interface UseCommentEditModal {
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
}

export default function useCommentEditModal({
  writer,
  comment,
  comment_id,
  handleSetVisible,
}: UseCommentEditModalProps): UseCommentEditModal {
  const dispatch = useDispatch();
  const errorType = useSelector((state: RootState) => state.comment.errorType);
  const [onShowPopup] = useShowPopup();
  const [startLoading, endLoading] = useLoading();
  const [state, onChange] = useInputs({
    writer: writer,
    password: '',
    comment: comment,
  });

  const [UpdateComment] = useMutation<{
    updateCommnet: boolean;
    variables: UpdateCommentData;
  }>(UPDATE_COMMENT, {
    refetchQueries: ['Comments'],
  });
  const [RemoveComment] = useMutation<{
    removeComment: boolean;
    variables: RemoveCommentData;
  }>(REMOVE_COMMENT, {
    refetchQueries: ['Comments'],
  });

  const handleCommentError = useCallback(
    (error: any) => {
      dispatch(
        setCommentError({
          errorType: errorTypeManager(error),
        }),
      );
    },
    [dispatch],
  );

  const updateComment = useCallback(async () => {
    const { writer, password, comment } = state;
    const validate = Object.entries(state).filter(([key, value]) =>
      normalizedString(value),
    );
    if (validate.length !== 3) {
      dispatch(
        setCommentError({
          errorType: CommentErrorEnum.CHECK_REQUIRE_ITEM,
        }),
      );
      return;
    }
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
      onShowPopup({
        title: '댓글 작성완료',
        message: '댓글 작성이 완료 되었습니다.',
      });
      dispatch(resetCommentError({}));
    } catch (e) {
      endLoading();
      handleCommentError(e);
    }
  }, [state]);

  const removeComment = useCallback(async () => {
    const { password } = state;
    if (!normalizedString(password)) {
      dispatch(
        setCommentError({
          errorType: CommentErrorEnum.ENTER_PASSWORD,
        }),
      );
      return;
    }
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
      onShowPopup({
        title: '삭제 완료',
        message: '댓글이 삭제되었습니다.',
      });
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
  };
}
