import { useMutation } from '@apollo/client';
import { useCallback, useRef } from 'react';
import { CreateCommentData, CREATE_COMMENT } from '../../../graphql/comment';
import useInputs from '../../../lib/hooks/useInputs';
import useLoading from '../../../lib/hooks/useLoading';
import useShowPopup from '../../../lib/hooks/useShowPopup';
import { normalizedString } from '../../../lib/utils';

interface UseCommentWriteProps {
  post_id: number;
  reply_comment_id?: number;
  handleShowCommentWrite?: () => void;
}

export default function useCommentWrite({
  post_id,
  reply_comment_id,
  handleShowCommentWrite,
}: UseCommentWriteProps) {
  const passwordRef = useRef<null | HTMLInputElement>(null);
  const [onShowPopup] = useShowPopup();
  const [startLoading, endLoading] = useLoading();
  const [state, onChange, onReset] = useInputs({
    password: '',
    writer: '',
    comment: '',
  });

  // need loading, error work
  const [CreateComment] = useMutation<{
    createComment: boolean;
    variables: CreateCommentData;
  }>(CREATE_COMMENT, {
    refetchQueries: ['Comments'],
  });

  const createComment = useCallback(async () => {
    const { writer, password, comment } = state;
    const validate = Object.entries(state).filter(([key, value]) =>
      normalizedString(value),
    );
    if (validate.length !== 3) {
      onShowPopup({
        title: '입력 항목을 확인해 주세요',
        message: '작성자, 비밀번호, 댓글은 필수 입력 사항 입니다.',
      });
      return;
    }
    try {
      startLoading();
      await CreateComment({
        variables: {
          post_id,
          reply_comment_id,
          writer,
          password,
          comment,
        },
      });
      endLoading();
      onShowPopup({
        title: '댓글 작성완료',
        message: '댓글 작성이 완료 되었습니다.',
      });
      onReset();
      if (passwordRef.current) {
        passwordRef.current.value = '';
      }
      if (handleShowCommentWrite) {
        handleShowCommentWrite();
      }
    } catch (e) {
      endLoading();
      onShowPopup({
        title: '댓글 작성실패',
        message: 'github 또는 email 로 에러제보 부탁드려요.',
      });
    }
  }, [state, post_id, reply_comment_id]);

  return {
    passwordRef,
    state,
    onChange,
    createComment,
  };
}
