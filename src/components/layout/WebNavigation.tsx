import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import zIndexes from '../../lib/styles/zIndexes';

type WebNavigationProps = {};

function WebNavigation(props: WebNavigationProps) {
  return (
    <Block>
      <ContentBlock>
        <Link1 to="/">
          <h1>DevLog</h1>
        </Link1>
        <LinkWrapper>
          <Link2 exact to="/">
            새 글
          </Link2>
          <Link2 to="/series">시리즈</Link2>
          <Link2 to="/tags">태그</Link2>
          <Link2 to="/info">소개</Link2>
        </LinkWrapper>
      </ContentBlock>
    </Block>
  );
}

const Block = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: ${zIndexes.navigation};
  ${media.xsmall} {
    display: none;
  }
  ${media.medium} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ContentBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  h1 {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
  }
  ${media.medium} {
    width: 53rem;
  }
  ${media.large} {
    width: 64rem;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-flow: row;
`;

const Link1 = styled(Link)`
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  font-size: 1.25rem;
  padding: 0.25rem;
`;

const Link2 = styled(NavLink)`
  display: inline-flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  font-size: 1.25rem;
  padding: 0.25rem;
  &.active {
    font-weight: bold;
  }
  & + & {
    margin-left: 2rem;
  }
`;

export default WebNavigation;
