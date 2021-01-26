import * as React from 'react';
import styled from 'styled-components';
import DefaultTag from './DefaultTag';

type DefaultTagsProps = {
  tags: Array<string>;
};

const { memo } = React;
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
