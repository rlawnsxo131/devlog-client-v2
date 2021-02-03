import * as React from 'react';
import styled, { css } from 'styled-components';
import Paragraph from '../common/Paragraph';

type CountTagsSkelletonProps = {};

function CountTagsSkelleton(props: CountTagsSkelletonProps) {
  return (
    <Block>
      {Array.from({ length: 130 }).map((_, i) => (
        <Paragraph
          key={`count_tag_skelleton_${i}`}
          css={css`
            width: 7.5rem;
            height: 1.75rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            border-radius: 1rem;
          `}
        />
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

export default CountTagsSkelleton;
