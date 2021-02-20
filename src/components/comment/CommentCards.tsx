import { memo } from 'react';
import styled from 'styled-components';
import { CommentType } from '../../graphql/comment';
import CommentCard from './CommentCard';

type CommentCardsProps = {
  replies?: Array<CommentType>;
};

// comment > sub_comment > sub_comment countes
function getFullCounts(replies?: Array<CommentType>) {
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
  const fullCounts = getFullCounts(replies);
  return (
    <Block>
      {replies?.map((v, i) => (
        <CommentCard
          key={`comments_${v.id}`}
          reply={v}
          fullCount={v.level === 0 ? fullCounts[i] : undefined}
        />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
`;

export default memo(CommentCards);
