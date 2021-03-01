import { Fragment, useCallback, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import MenuIcon from '../../img/components/icons/MenuIcon';
import RssFeedIcon from '../../img/components/icons/RssFeedIcon';
import palette, { darkmodeBackground } from '../../lib/styles/palette';
import zIndexes from '../../lib/styles/zIndexes';
import DarkmodeToggle from './DarkmodeToggle';

interface HeaderItemsProps {
  darkmode: boolean;
}

function HeaderItems({ darkmode }: HeaderItemsProps) {
  const { pathname } = useLocation();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const handleShowMenu = useCallback(() => {
    setShowMenu((state) => !state);
  }, []);
  const onMenuOutSideClick = useCallback((e) => {
    const menuClass = [/drop-menu-icon/g, /drop-menu-wrapper/g, /drop-menu/g];
    const className = e.target.className;
    const svgBaseVal = className.baseVal;
    const valid = menuClass.some(
      (regex) => regex.test(className) || regex.test(svgBaseVal),
    );
    if (valid) return;
    setShowMenu(false);
  }, []);

  useEffect(() => {
    if (!showMenu) return;
    setShowMenu(false);
  }, [pathname]);

  useEffect(() => {
    globalThis.addEventListener('click', onMenuOutSideClick);
    return () => {
      globalThis.removeEventListener('click', onMenuOutSideClick);
    };
  }, []);

  return (
    <Fragment>
      <Block darkmode={darkmode}>
        <a
          style={{ display: 'flex', alignItems: 'center' }}
          href={`${process.env.REACT_APP_API_URI}/rss`}
          target="_blank"
        >
          <RssFeedIcon />
        </a>
        <DarkmodeToggle />
        <MenuIcon
          width={30}
          height={30}
          onClick={handleShowMenu}
          className="drop-menu-icon"
          darkmode={darkmode}
        />
      </Block>
      {showMenu && (
        <DropdownMenu className="drop-menu-wrapper" darkmode={darkmode}>
          <Link className="drop-menu" exact to="/">
            새글
          </Link>
          <Link className="drop-menu" to="/series">
            시리즈
          </Link>
          <Link className="drop-menu" to="/tags">
            태그
          </Link>
          <Link className="drop-menu" to="/info">
            소개
          </Link>
        </DropdownMenu>
      )}
    </Fragment>
  );
}

const Block = styled.div<{ darkmode: boolean }>`
  display: grid;
  grid-auto-rows: 2rem;
  grid-template-columns: repeat(3, 1fr);
  gap: 0rem 1rem;
  justify-items: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.darkmode &&
    css`
      svg {
        fill: ${palette.gray5};
      }
    `}
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
  &.drop-menu {
    justify-content: space-around;
  }
  &.active {
    &.drop-menu {
      font-weight: bold;
    }
  }
`;

export default HeaderItems;
