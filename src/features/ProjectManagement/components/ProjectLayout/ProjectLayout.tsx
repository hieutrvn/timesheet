import React from 'react';
import Sidebar from 'src/layout/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

function ProjectLayout (): JSX.Element {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default ProjectLayout;
