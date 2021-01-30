import { useQuery } from '@apollo/client';
import * as React from 'react';
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
      {data?.series.map((v) => (
        <SeriesItem key={`series_${v.id}`} series={v} />
      ))}
    </MediaRatioWrapper>
  );
}

export default Series;
