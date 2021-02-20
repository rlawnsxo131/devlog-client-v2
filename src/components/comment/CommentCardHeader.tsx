import { memo } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';

type CommentCardHeaderProps = {
  writer: string;
  deleted: boolean;
  created_at: Date;
  edited_at?: Date;
  handleSetVisible: () => void;
};

function CommentCardHeader({
  writer,
  deleted,
  created_at,
  edited_at,
  handleSetVisible,
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
      {!deleted && (
        <HeaderEdit onClick={handleSetVisible}>수정/삭제</HeaderEdit>
      )}
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
  .writer {
    font-weight: 600;
    margin-top: 0.25rem;
  }
  .date {
    color: ${palette.gray6};
    margin-top: 0.25rem;
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

export default memo(CommentCardHeader);
