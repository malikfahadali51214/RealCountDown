// src/components/Navbar.js
import React, { useState } from 'react';
import AppBarComponent from './AppBar';
import DrawerComponent from './DrawerList';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMouseEnter = () => {
    setDrawerOpen(true);
  };

  const handleMouseLeave = () => {
    setDrawerOpen(false);
  };

  return (
    <React.Fragment>
      <AppBarComponent drawerOpen={drawerOpen} />
      <DrawerComponent
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </React.Fragment>
  );
}
