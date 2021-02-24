import { memo } from 'react';
import styled from 'styled-components';
import DefaultTag from './DefaultTag';

interface DefaultTagsProps {
  tags: Array<string>;
}

function DefaultTags({ tags }: DefaultTagsProps) {
  if (!tags.length) return null;
  return (
    <Block>
      {tags.map((v, i) => (
        <DefaultTag key={`tag_${v}_${i}`} name={v} />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export default memo(DefaultTags);
