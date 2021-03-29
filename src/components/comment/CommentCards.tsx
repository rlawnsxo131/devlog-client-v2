import { memo } from 'react';
import { css } from '@emotion/react';
import { CommentData } from '../../graphql/comment';
import CommentCard from './CommentCard';

interface CommentCardsProps {
  replies?: Array<CommentData>;
}

// comment > sub_comment > sub_comment countes
function getRepliesCount(replies?: Array<CommentData>) {
  let fullCounts: Array<number> = [];
  if (replies?.length && replies[0].level === 0) {
    replies.forEach((v, i) => {
      let count = 0;
      if (v.replies) {
        count += v.replies.length;
        v.replies.forEach((v) => {
          if (v.replies) {
            count += v.replies.length;
          }
        });
      }
      fullCounts[i] = count;
    });
  }
  return fullCounts;
}

function CommentCards({ replies }: CommentCardsProps) {
  const fullCounts = getRepliesCount(replies);
  return (
    <div css={block}>
      {replies?.map((v, i) => (
        <CommentCard
          key={`comments_${v.id}`}
          reply={v}
          fullCount={v.level === 0 ? fullCounts[i] : undefined}
        />
      ))}
    </div>
  );
}

const block = css`
  display: flex;
  flex-direction: column;
`;

export default memo(CommentCards);
