import { useQuery } from '@apollo/client';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { GET_SERIES, SeriesType } from '../../graphql/series';
import useError from '../../lib/hooks/useError';
import MediaRatioWrapper from '../layout/MediaRatioWrapper';
import SeriesItem from './SeriesItem';

type SeriesProps = {};

const { useEffect } = React;
function Series(props: SeriesProps) {
  const [handleError] = useError();
  const { loading, error, data } = useQuery<{ series: Array<SeriesType> }>(
    GET_SERIES,
  );

  useEffect(() => {
    if (!error) return;
    handleError(error);
  }, [error]);

  if (loading) return <div>loading</div>;
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
        <meta
          name="google-site-verification"
          content="cxSUqcooAfyS9ypQheVFaeT_mqAzuR_D8hjCLI5hP40"
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
