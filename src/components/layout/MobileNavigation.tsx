import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { throttle } from 'throttle-debounce';
import media from '../../lib/styles/media';
import zIndexes from '../../lib/styles/zIndexes';

type MobileNavigationProps = {};
type ScrollDirectionType = 'UP' | 'DOWN';

const { useRef, useState, useCallback, useEffect } = React;
function MobileNavigation(props: MobileNavigationProps) {
  const prevScroll = useRef<number>(0);
  const [scrollDirection, setScrollDirection] = useState<
    ScrollDirectionType | undefined
  >(undefined);

  const handleScroll = useCallback(
    throttle(300, () => {
      const currentScroll = globalThis.scrollY;
      if (
        prevScroll.current < currentScroll &&
        currentScroll > 88 &&
        currentScroll > 0
      ) {
        setScrollDirection('DOWN');
      } else {
        setScrollDirection('UP');
      }
      prevScroll.current = currentScroll;
    }),
    [],
  );

  useEffect(() => {
    prevScroll.current = globalThis.scrollY;
    globalThis.addEventListener('scroll', handleScroll);
    return () => {
      globalThis.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Block scrollDirection={scrollDirection}>
      <Link to="/">
        <h1>DevLog</h1>
      </Link>
      <LinksWrapper>
        <Link to="/">새글</Link>
        <Link to="/series">시리즈</Link>
        <Link to="/tags">태그</Link>
        <Link to="/info">소개</Link>
      </LinksWrapper>
    </Block>
  );
}

const Block = styled.nav<{ scrollDirection?: ScrollDirectionType }>`
  position: fixed;
  width: 100%;
  padding: 0.5rem;
  z-index: ${zIndexes.navigation};
  transition: top 0.25s;
  ${media.xsmall} {
    display: flex;
    flex-direction: column;
    height: 4rem;
    top: ${(props) => (props.scrollDirection === 'DOWN' ? '-5.25rem' : '0')};
  }
  ${media.medium} {
    display: none;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const Link = styled(NavLink)`
  font-size: 1rem;
  h1 {
    display: inline-block;
    margin-top: 0.5rem;
    margin-bottom: 0.725rem;
    margin-left: 3vw;
    font-size: 1.25rem;
  }
`;

export default MobileNavigation;
