import * as React from 'react';
import WebNavigation from './WebNavigation';
import MobileNavigation from './MobileNavigation';

type NavigationProps = {};

const { memo } = React;
function Navigation(props: NavigationProps) {
  return (
    <>
      <WebNavigation />
      <MobileNavigation />
    </>
  );
}

export default memo(Navigation);
