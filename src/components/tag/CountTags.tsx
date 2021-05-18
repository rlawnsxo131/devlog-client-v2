import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { GET_TAGS, TagData } from '../../graphql/tag';
import useError from '../../lib/hooks/useError';
import MediaRatioWrapper from '../layout/MediaRatioWrapper';
import CountTag from './CountTag';
import CountTagsSkeleton from './CountTagsSkeleton';

interface CountTagsProps {}

function CountTags(props: CountTagsProps) {
  const [handleError] = useError();
  const { loading, error, data } = useQuery<{ tags: Array<TagData> }>(GET_TAGS);

  useEffect(() => {
    if (!error) return;
    handleError(error);
  }, [error]);

  if (loading) {
    return (
      <MediaRatioWrapper type="row">
        <CountTagsSkeleton />
      </MediaRatioWrapper>
    );
  }
  if (error) return null;

  return (
    <MediaRatioWrapper type="row">
      <Helmet>
        <title>전체태그 - DevLog</title>
        <meta
          name="description"
          content={`전체태그 - DevLog(${data?.tags
            .map((v) => v.name)
            .slice(0, 25)
            .join()})`}
        />
        <meta property="og:description" content="전체태그 - DevLog" />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_SERVICE_URL}/tags`}
        />
        <link
          rel="canonical"
          href={`${process.env.REACT_APP_SERVICE_URL}/tags`}
        />
      </Helmet>
      {data?.tags.map((v) => (
        <CountTag key={`count_tag_${v.name}`} tag={v} />
      ))}
    </MediaRatioWrapper>
  );
}

export default CountTags;
