import React from 'react';
import './App.scss';
import ProjectList from 'src/features/ProjectManagement/pages/ProjectList/ProjectList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Login from 'src/features/Login/Login';
import ProjectLayout from './features/ProjectManagement/components/ProjectLayout/ProjectLayout';

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/project' element={<ProjectLayout />}>
          <Route path='list' element={<ProjectList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
