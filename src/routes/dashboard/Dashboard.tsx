import React from 'react';
import { IStackItemStyles, IStackTokens, Stack } from '@fluentui/react';
import { Nav } from '../../components/navigation/Nav';
import { PersonalSection } from '../../components/dashboard-sections/PersonalSection';
import { WaitingApprovalsSection } from '../../components/dashboard-sections/WaitingApprovalsSection';
import { ApprovedSection } from '../../components/dashboard-sections/ApprovedSection';
import { PeriodSection } from '../../components/dashboard-sections/PeriodSection';

const stackTokens: IStackTokens = {
    maxWidth: 1200
};

const stackItemStyles: Partial<IStackItemStyles> = {
    root: {
        textAlign: "left",
    }
};

export const DashboardPage: React.FunctionComponent = () => {
    return (
        <Stack horizontal tokens={stackTokens}>
            <Stack.Item grow={3}>
                <Nav />
            </Stack.Item>
            <Stack.Item grow={3} styles={stackItemStyles}>
                <PersonalSection />
                <WaitingApprovalsSection />
                <ApprovedSection />
            </Stack.Item>
            <Stack.Item grow={3}>
                <PeriodSection />
            </Stack.Item>
        </Stack>
    );
};
