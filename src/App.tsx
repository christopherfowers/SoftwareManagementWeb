import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';
import { JiraApiProvider } from './providers/JiraApiProvider';
import ReadyToCommit from './pages/ReadyToCommit';

const App: React.FC = () => {
  const email = `cfowers@complyright.com`;
  const token = `ATATT3xFfGF0JSVz4hnqM0FQZ_mO6AcS4beMZmv1dJtSX9v_WI_ECcCT3AYSzI3LLbxfIvKncHRE3Z3cKyU35tGND6AzUQk2wdY5XyP58vKeBL-Bt28GhvlaX0mA9gxYSkOcc2zpGoNl4R3H5wfu3T6d0ztUyiLl-Zp9AaNKiGlmkXb7rfMqCmM=4794E640`;
  const apiCreds = `${btoa(`${email}:${token}`)}`;

  return (
    <Router>
      <JiraApiProvider apiToken={apiCreds}>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route path="/dashboard"  Component={Dashboard} />
            <Route path="/readyToCommit"  Component={ReadyToCommit} />
          </Routes>
        </Layout>
      </JiraApiProvider>
    </Router>
  );
}

export default App;
