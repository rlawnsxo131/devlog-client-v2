import * as React from 'react';
import styled from 'styled-components';
import { CommentType } from '../../graphql/comment';
import CommentCard from './CommentCard';

type CommentCardsProps = {
  replies?: Array<CommentType>;
};

const { memo } = React;
function CommentCards({ replies }: CommentCardsProps) {
  let fullCounts: Array<number> = [];
  if (replies && replies[0].level === 0) {
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
