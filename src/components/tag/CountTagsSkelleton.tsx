import { css } from '@emotion/react';
import Paragraph from '../common/Paragraph';

interface CountTagsSkelletonProps {}

function CountTagsSkelleton(props: CountTagsSkelletonProps) {
  return (
    <div css={block}>
      {Array.from({ length: 130 }).map((_, i) => (
        <Paragraph
          key={`count_tag_skelleton_${i}`}
          style={css`
            width: 7.5rem;
            height: 1.75rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            border-radius: 1rem;
          `}
        />
      ))}
    </div>
  );
}

const block = css`
  display: flex;
  flex-flow: row wrap;
`;

export default CountTagsSkelleton;
