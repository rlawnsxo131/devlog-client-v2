import { useQuery } from '@apollo/client';
import * as React from 'react';
import styled from 'styled-components';
import { GET_SERIES, SeriesType } from '../../graphql/series';
import useError from '../../lib/hooks/useError';
import media, { mediaQuery } from '../../lib/styles/media';
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
    <Block>
      {data?.series.map((v) => (
        <SeriesItem key={`series_${v.id}`} series={v} />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
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

export default Series;
