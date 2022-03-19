import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { ApprovedPage } from './routes/approved/Approved';
import { DashboardPage } from './routes/dashboard/Dashboard';
import { PersonalPage } from './routes/personal/Personal';
import { WaitingApprovalPage } from './routes/waiting-approval/WaitingApproval';
import { Header } from './components/header/Header';

export const App: React.FunctionComponent = () => {
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="personal/:id" element={<PersonalPage />} />
          <Route path="waiting-approval/:id" element={<WaitingApprovalPage />} />
          <Route path="approved/:id" element={<ApprovedPage />} />
        </Routes>
    </div>
  );
};
