import { useQuery } from '@apollo/client';
import * as React from 'react';
import { GET_TAGS, TagType } from '../../graphql/tag';
import useError from '../../lib/hooks/useError';
import MediaRatioWrapper from '../layout/MediaRatioWrapper';
import CountTag from './CountTag';
import CountTagsSkelleton from './CountTagsSkelleton';

type CountTagsProps = {};

const { useEffect } = React;
function CountTags(props: CountTagsProps) {
  const [handleError] = useError();
  const { loading, error, data } = useQuery<{ tags: Array<TagType> }>(GET_TAGS);

  useEffect(() => {
    if (!error) return;
    handleError(error);
  }, [error]);

  if (loading) {
    return (
      <MediaRatioWrapper type="row">
        <CountTagsSkelleton />
      </MediaRatioWrapper>
    );
  }
  if (error) return null;

  return (
    <MediaRatioWrapper type="row">
      {data?.tags.map((v) => (
        <CountTag key={`count_tag_${v.name}`} tag={v} />
      ))}
    </MediaRatioWrapper>
  );
}

export default CountTags;
