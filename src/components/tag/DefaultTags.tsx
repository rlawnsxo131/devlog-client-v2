import { css } from '@emotion/react';
import DefaultTag from './DefaultTag';

interface DefaultTagsProps {
  tags: Array<string>;
}

function DefaultTags({ tags }: DefaultTagsProps) {
  if (!tags.length) return null;
  return (
    <div css={block}>
      {tags.map((v, i) => (
        <DefaultTag key={`tag_${v}_${i}`} name={v} />
      ))}
    </div>
  );
}

const block = css`
  display: flex;
  flex-flow: row wrap;
`;

export default DefaultTags;
