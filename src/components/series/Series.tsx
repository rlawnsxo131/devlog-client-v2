import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Helmet } from 'react-helmet-async';
import { GET_SERIES, SeriesData } from '../../graphql/series';
import useError from '../../lib/hooks/useError';
import MediaRatioWrapper from '../layout/MediaRatioWrapper';
import SeriesItem from './SeriesItem';
import SeriesSkeleton from './SeriesSkeleton';

interface SeriesProps {}

function Series(props: SeriesProps) {
  const [handleError] = useError();
  const [series, setSeries] = useState<Array<SeriesData> | null>(null);
  const { loading, error, data } = useQuery<{ series: Array<SeriesData> }>(
    GET_SERIES,
    {
      onError: (error) => {
        handleError(error);
      },
    },
  );

  useEffect(() => {
    if (!data) return;
    setSeries([...data.series].sort((a, b) => b.id - a.id));
  }, [data]);

  if (loading) return <SeriesSkeleton />;
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
      {series &&
        series.map((v) => <SeriesItem key={`series_${v.id}`} series={v} />)}
    </MediaRatioWrapper>
  );
}

export default Series;
