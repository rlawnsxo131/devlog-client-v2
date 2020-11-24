import * as React from 'react';
import WebNavigation from './WebNavigation';
import MobileNavigation from './MobileNavigation';

type NavigationProps = {};

function Navigation(props: NavigationProps) {
  return (
    <>
      <WebNavigation />
      <MobileNavigation />
    </>
  );
}

export default Navigation;
