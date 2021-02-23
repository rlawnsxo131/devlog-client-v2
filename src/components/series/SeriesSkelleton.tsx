import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { RootState } from '../../modules';
import Paragraph from '../common/Paragraph';
import MediaRatioWrapper from '../layout/MediaRatioWrapper';

type SeriesSkelletonProps = {};

function SeriesItemSkelleton() {
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  return (
    <Block darkmode={darkmode}>
      <Paragraph
        css={css`
          width: 60%;
          height: 2rem;
        `}
      />
      {Array.from({ length: 3 }).map((_, i) => (
        <Paragraph
          key={`series_item_title_${i}`}
          css={css`
            height: 1.5rem;
            margin-top: 1rem;
            margin-left: 1.5rem;
          `}
        />
      ))}
    </Block>
  );
}

const Block = styled.div<{ darkmode: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  & + & {
    margin-top: 2rem;
  }
  ${(props) =>
    props.darkmode
      ? css`
          box-shadow: 1px 1px 5px 2px ${palette.gray9};
        `
      : css`
          box-shadow: 1px 1px 5px 2px ${palette.gray1};
        `};
`;

function SeriesSkelleton(props: SeriesSkelletonProps) {
  return (
    <MediaRatioWrapper type="column">
      {Array.from({ length: 10 }).map((_, i) => (
        <SeriesItemSkelleton key={`series_skelleton_${i}`} />
      ))}
    </MediaRatioWrapper>
  );
}

export default SeriesSkelleton;
