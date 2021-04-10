import { memo } from 'react';
import { css } from '@emotion/react';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';

interface CommentCardHeaderProps {
  writer: string;
  deleted: boolean;
  created_at: Date;
  edited_at?: Date;
  handleSetVisible: () => void;
}

function CommentCardHeader({
  writer,
  deleted,
  created_at,
  edited_at,
  handleSetVisible,
}: CommentCardHeaderProps) {
  return (
    <div css={block}>
      <div css={info}>
        <p className="writer">{writer}</p>
        <time dateTime={`${edited_at ?? created_at}`}>
          {edited_at
            ? `${formatDate(edited_at)}(수정됨)`
            : formatDate(created_at)}
        </time>
      </div>
      {!deleted && (
        <div css={edit} onClick={handleSetVisible}>
          수정/삭제
        </div>
      )}
    </div>
  );
}

const block = css`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const info = css`
  display: flex;
  flex-direction: column;
  time {
    font-size: 1rem;
    color: ${palette.gray6};
    margin-top: 0.5rem;
  }
  p {
    font-weight: 600;
    margin: 0.25rem 0 0 0;
  }
`;

const edit = css`
  display: flex;
  flex-flow: row wrap;
  color: ${palette.gray6};
  &:hover {
    cursor: pointer;
    color: ${palette.gray5};
  }
`;

export default memo(CommentCardHeader);
