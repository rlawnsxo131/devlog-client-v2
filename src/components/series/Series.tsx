import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { GET_SERIES, Series } from '../../graphql/series';
import useError from '../../lib/hooks/useError';
import MediaRatioWrapper from '../layout/MediaRatioWrapper';
import SeriesItem from './SeriesItem';
import SeriesSkelleton from './SeriesSkelleton';

interface SeriesProps {}

function Series(props: SeriesProps) {
  const [handleError] = useError();
  const { loading, error, data } = useQuery<{ series: Array<Series> }>(
    GET_SERIES,
  );

  useEffect(() => {
    if (!error) return;
    handleError(error);
  }, [error]);

  if (loading) return <SeriesSkelleton />;
  if (error) return null;

  return (
    <MediaRatioWrapper type="column">
      <Helmet>
        <title>시리즈 - DevLog</title>
        <meta
          name="description"
          content={`시리즈 - DevLog(${data?.series
            .map((v) => v.series_name)
            .slice(0, 20)
            .join()}...)`}
        />
        <meta property="og:title" content="DevLog" />
        <meta property="og:description" content="시리즈 - DevLog" />
        <meta
          property="og:url"
          content={`${process.env.REACT_APP_SERVICE_URL}/series`}
        />
        <link
          rel="canonical"
          href={`${process.env.REACT_APP_SERVICE_URL}/series`}
        />
      </Helmet>
      {data?.series.map((v) => (
        <SeriesItem key={`series_${v.id}`} series={v} />
      ))}
    </MediaRatioWrapper>
  );
}

export default Series;
