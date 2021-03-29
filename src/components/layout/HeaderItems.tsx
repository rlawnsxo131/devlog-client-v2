import { Fragment, useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { NavLink, useLocation } from 'react-router-dom';
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
      <div css={block(darkmode)}>
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
      </div>
      {showMenu && (
        <nav className="drop-menu-wrapper" css={navStyle(darkmode)}>
          <NavLink className="drop-menu" css={linkStyle} exact to="/">
            새글
          </NavLink>
          <NavLink className="drop-menu" css={linkStyle} to="/series">
            시리즈
          </NavLink>
          <NavLink className="drop-menu" css={linkStyle} to="/tags">
            태그
          </NavLink>
          <NavLink className="drop-menu" css={linkStyle} to="/info">
            소개
          </NavLink>
        </nav>
      )}
    </Fragment>
  );
}

const block = (darkmode: boolean) => css`
  display: grid;
  grid-auto-rows: 2rem;
  grid-template-columns: repeat(3, 1fr);
  gap: 0rem 1rem;
  justify-items: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  ${darkmode &&
  css`
    svg {
      fill: ${palette.gray5};
    }
  `}
`;

const navStyle = (darkmode: boolean) => css`
  position: absolute;
  top: 125%;
  right: 0;
  width: 18rem;
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  z-index: ${zIndexes.dropdownMenu};
  border-radius: 0.25rem;
  ${darkmode
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

const linkStyle = css`
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
