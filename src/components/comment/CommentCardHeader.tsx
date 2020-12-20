import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';

type CommentCardHeaderProps = {
  writer: string;
  created_at: Date;
  edited_at?: Date;
};

function CommentCardHeader({
  writer,
  created_at,
  edited_at,
}: CommentCardHeaderProps) {
  return (
    <Block>
      <HeaderInfo>
        <div className="writer">{writer}</div>
        <div className="date">
          {edited_at
            ? `${formatDate(edited_at)}(수정됨)`
            : formatDate(created_at)}
        </div>
      </HeaderInfo>
      <HeaderEdit>수정/삭제</HeaderEdit>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  .writer {
    font-weight: 600;
  }
  .date {
    color: ${palette.gray6};
  }
`;

const HeaderEdit = styled.div`
  display: flex;
  flex-flow: row wrap;
  color: ${palette.gray6};
  &:hover {
    cursor: pointer;
    color: ${palette.gray5};
  }
`;

export default CommentCardHeader;
