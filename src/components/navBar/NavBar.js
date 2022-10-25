import { ThemeProvider } from 'grindery-ui';
import React from 'react';
import GrinderyNexusContextProvider from 'use-grindery-nexus';
import WorkspaceContextProvider from '../context/WorkspaceContext';

const NavBar = ({ moduleData }) => {
  return (
    <ThemeProvider>
      <GrinderyNexusContextProvider>
        <WorkspaceContextProvider>
          <WorkspaceMenu />
          <UserMenu />
        </WorkspaceContextProvider>
      </GrinderyNexusContextProvider>
    </ThemeProvider>
  );
};

export default NavBar;
