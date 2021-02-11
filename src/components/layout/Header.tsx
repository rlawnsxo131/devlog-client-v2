import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import MenuIcon from '../../img/components/icons/MenuIcon';
import media from '../../lib/styles/media';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import zIndexes from '../../lib/styles/zIndexes';
import { RootState } from '../../modules';
// import { AiOutlineEllipsis } from 'react-icons/ai';
import DarkmodeToggle from '../common/DarkmodeToggle';

type HeaderProps = {};

const { useState, useMemo, useCallback, useEffect, memo } = React;
function Header(props: HeaderProps) {
  const { pathname } = useLocation();
  const darkmode = useSelector(
    (state: RootState) => state.core.darkmode.darkmode,
  );
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuColor = useMemo(() => {
    return darkmode ? palette.gray6 : palette.gray9;
  }, [darkmode]);
  const handleShowMenu = useCallback(() => {
    setShowMenu((state) => !state);
  }, []);

  useEffect(() => {
    if (!showMenu) return;
    handleShowMenu();
  }, [pathname]);

  return (
    <Block darkmode={darkmode}>
      <Content>
        <Link exact to="/">
          <h1>DevLog</h1>
        </Link>
        <Menu darkmode={darkmode}>
          <DarkmodeToggle />
          <MenuIcon
            fill={menuColor}
            height={30}
            width={30}
            onClick={handleShowMenu}
          />
        </Menu>
        {showMenu && (
          <DropdownMenu darkmode={darkmode}>
            <Link className="menu" exact to="/">
              새글
            </Link>
            <Link className="menu" to="/series">
              시리즈
            </Link>
            <Link className="menu" to="/tags">
              태그
            </Link>
            <Link className="menu" to="/info">
              소개
            </Link>
          </DropdownMenu>
        )}
      </Content>
    </Block>
  );
}

const Block = styled.header<{ darkmode: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  z-index: ${zIndexes.header};
  ${(props) =>
    props.darkmode
      ? css`
          background: ${darkmodeBackground.other};
          box-shadow: 1px 1px 10px 2px ${palette.gray9};
        `
      : css`
          background: white;
          box-shadow: 1px 1px 10px 2px ${palette.gray3};
        `}
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  ${media.xsmall} {
    width: 92vw;
  }
  ${media.medium} {
    width: 53rem;
  }
  ${media.large} {
    width: 64rem;
  }
`;

const Menu = styled.div<{ darkmode: boolean }>`
  display: flex;
  svg {
    font-size: 2rem;
    border-radius: 100%;
    ${(props) =>
      props.darkmode
        ? css`
            color: ${palette.gray3};
            box-shadow: 1px 1px 5px 2px ${palette.gray9};
            &:hover {
              cursor: pointer;
              box-shadow: 1px 1px 10px 2px black;
            }
          `
        : css`
            color: ${palette.gray9};
            box-shadow: 1px 1px 5px 2px ${palette.gray3};
            &:hover {
              cursor: pointer;
              box-shadow: 1px 1px 10px 2px ${palette.gray5};
            }
          `}
  }
`;

const DropdownMenu = styled.nav<{ darkmode: boolean }>`
  position: absolute;
  top: 125%;
  right: 0;
  width: 18rem;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  z-index: ${zIndexes.dropdownMenu};
  border-radius: 0.25rem;
  ${(props) =>
    props.darkmode
      ? css`
          background: ${darkmodeBackground.other};
          color: ${palette.gray3};
          box-shadow: 1px 1px 3px 1px ${palette.gray9};
        `
      : css`
          background: white;
          color: ${palette.gray9};
          box-shadow: 1px 1px 3px 1px ${palette.gray5};
        `}
`;

const Link = styled(NavLink)<{ shadowcolor?: string }>`
  display: inline-flex;
  flex-flow: row wrap;
  font-size: 1.25rem;
  padding: 0.5rem 0.25rem 0.5rem 0.25rem;
  h1 {
    margin: 0;
    padding: 0;
    font-weight: 600;
    font-size: 1.5rem;
  }
  &.menu {
    justify-content: space-around;
  }
  &.active {
    &.menu {
      font-weight: bold;
    }
  }
`;

export default memo(Header);
