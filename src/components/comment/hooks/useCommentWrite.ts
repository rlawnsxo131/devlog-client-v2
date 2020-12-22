import { useMutation } from '@apollo/client';
import { CreateCommentType, CREATE_COMMENT } from '../../../graphql/comment';

export default function useCommentWrite() {
  const [CreateComment] = useMutation<{
    createComment: { id: number };
    variables: CreateCommentType;
  }>(CREATE_COMMENT, {
    refetchQueries: ['Comments'],
  });

  return {
    CreateComment,
  };
}
