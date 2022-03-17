import React from 'react';
import {
  BrowserRouter, Link, Route, Routes
} from "react-router-dom";
import { Stack, Text, FontWeights, IStackTokens, IStackStyles, ITextStyles } from '@fluentui/react';
import logo from './logo.svg';
import './App.css';
import { ApprovedPage } from './routes/approved/Approved';
import { DashboardPage } from './routes/dashboard/Dashboard';
import PersonalPage from './routes/personal/Personal';
import { WaitingApprovalPage } from './routes/waiting-approval/WaitingApproval';
import { Nav } from './components/navigation/Nav';
import { Header } from './components/header/Header';
import { useStyletron } from 'styletron-react';

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };
const stackTokens: IStackTokens = {
  maxWidth: 1200
};
const stackStyles: Partial<IStackStyles> = {
  root: {
    width: 'auto',
    margin: '0 auto',
    textAlign: 'center',
    color: '#605e5c',
  },
};

export const App: React.FunctionComponent = () => {
  const [css] = useStyletron();
  
  return (
    // <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}>
    //   <img className="App-logo" src={logo} alt="logo" />
    //   <Text variant="xxLarge" styles={boldStyle}>
    //     Welcome to your Fluent UI app
    //   </Text>
    //   <Text variant="large">For a guide on how to customize this project, check out the Fluent UI documentation.</Text>
    //   <Text variant="large" styles={boldStyle}>
    //     Essential links
    //   </Text>
    //   <Stack horizontal tokens={stackTokens} horizontalAlign="center">
    //     <Link href="https://developer.microsoft.com/en-us/fluentui#/get-started/web">Docs</Link>
    //     <Link href="https://stackoverflow.com/questions/tagged/office-ui-fabric">Stack Overflow</Link>
    //     <Link href="https://github.com/microsoft/fluentui/">Github</Link>
    //     <Link href="https://twitter.com/fluentui">Twitter</Link>
    //   </Stack>
    //   <Text variant="large" styles={boldStyle}>
    //     Design system
    //   </Text>
    //   <Stack horizontal tokens={stackTokens} horizontalAlign="center">
    //     <Link href="https://developer.microsoft.com/en-us/fluentui#/styles/web/icons">Icons</Link>
    //     <Link href="https://developer.microsoft.com/en-us/fluentui#/styles/web">Styles</Link>
    //     <Link href="https://aka.ms/themedesigner">Theme designer</Link>
    //   </Stack>
    // </Stack>
    <div className="App">
      {/* <Stack horizontalAlign="center" verticalAlign="center" verticalFill styles={stackStyles} tokens={stackTokens}> */}
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="personal/:id" element={<PersonalPage />} />
          <Route path="waiting-approval/:id" element={<WaitingApprovalPage />} />
          <Route path="approved/:id" element={<ApprovedPage />} />
        </Routes>
      {/* </Stack> */}
    </div>
  );
};
