import { useQuery } from '@apollo/client';
import * as React from 'react';
import styled from 'styled-components';
import { GET_TAGS, TagType } from '../../graphql/tag';
import useError from '../../lib/hooks/useError';
import media, { mediaQuery } from '../../lib/styles/media';
import CountTag from './CountTag';

type CountTagsProps = {};

const { useEffect } = React;
function CountTags(props: CountTagsProps) {
  const [handleError] = useError();
  const { loading, error, data } = useQuery<{ tags: Array<TagType> }>(GET_TAGS);

  useEffect(() => {
    if (!error) return;
    handleError(error);
  }, [error]);

  if (loading) return <div>loading</div>;
  if (error) return null;

  return (
    <Block>
      {data?.tags.map((v) => (
        <CountTag key={`count_tag_${v.name}`} tag={v} />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-flow: row wrap;
  ${media.xsmall} {
    width: calc(100vw - 2rem);
  }
  ${media.small} {
    width: 736px;
  }
  ${mediaQuery(800)} {
    width: 768px;
  }
`;

export default CountTags;
