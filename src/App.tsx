import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import { Route, Routes } from "react-router-dom";
import { ApprovedPage } from './routes/approved/Approved';
import { DashboardPage } from './routes/dashboard/Dashboard';
import { PersonalPage } from './routes/personal/Personal';
import { WaitingApprovalsPage } from './routes/waiting-approvals/WaitingApprovals';
import { Header } from './components/header/Header';
import { PersonalItemPage } from './routes/personal/PersonalItem';
import { ApprovedItemPage } from './routes/approved/ApprovedItem';
import { WaitingApprovalItemPage } from './routes/waiting-approvals/WaitingApprovalItem';

export const App: React.FunctionComponent = () => {
  return (
    <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="personal" element={<PersonalPage />} />
          <Route path="personal/:id" element={<PersonalItemPage />} />
          <Route path="waiting-approvals" element={<WaitingApprovalsPage />} />
          <Route path="waiting-approvals/:id" element={<WaitingApprovalItemPage />} />
          <Route path="approved" element={<ApprovedPage />} />
          <Route path="approved/:id" element={<ApprovedItemPage />} />
        </Routes>
    </div>
  );
};
