import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';
import Paragraph from '../common/Paragraph';

interface CommentsSkelletonProps {}

function CommentsSkelleton(props: CommentsSkelletonProps) {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <div css={block}>
      <Paragraph
        style={css`
          height: 2rem;
          margin-top: 3rem;
        `}
      />
      <Paragraph
        style={css`
          margin-top: 1rem;
          height: 12rem;
        `}
      />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={`comments_skelleton_${i}`} css={commentCardBlock(darkmode)}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Paragraph
              key={`comment_card_text_${i}`}
              style={css`
                height: 1rem;
                margin-bottom: 1rem;
              `}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const block = css`
  display: flex;
  flex-direction: column;
`;

const commentCardBlock = (darkmode: boolean) => css`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 10px 2px ${darkmode ? palette.gray9 : palette.gray3};
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default CommentsSkelleton;
