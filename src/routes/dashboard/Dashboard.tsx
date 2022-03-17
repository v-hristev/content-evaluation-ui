import React from 'react';
<<<<<<< HEAD
import { FontWeights, IStackTokens, ITextStyles, Stack, Text } from '@fluentui/react';
import { Nav } from '../../components/navigation/Nav';
import { useStyletron } from 'styletron-react';

const stackTokens: IStackTokens = {
    maxWidth: 1200
};

const boldStyle: Partial<ITextStyles> = { root: { fontWeight: FontWeights.semibold } };

export const DashboardPage: React.FunctionComponent = () => {
    const [css] = useStyletron();
    
    return (
        <Stack horizontal tokens={stackTokens}>
            <Stack.Item grow={3}>
                <Nav />
            </Stack.Item>
            <Stack.Item grow={3} className={css({textAlign: "left"})}>
                <Text styles={boldStyle}>Последни мои публикации</Text>
                <ul className={css({textAlign: "left"})}>
                    <li>Урок 1: Електронни таблици (10 клас)</li>
                    <li>Урок 2: Презентации (9 клас)</li>
                    <li>Урок 3: Уеб сайтове (8 клас)</li>
                    <li>Урок 4: Електронен магазин (11 клас)</li>
                </ul>
            </Stack.Item>
            <Stack.Item grow={3}>
                <p>Calendar</p>
            </Stack.Item>
        </Stack>
=======

export const DashboardPage: React.FunctionComponent = () => {
    return (
        <h1>Dashboard</h1>
>>>>>>> 842101f51d4ca87515b9939876c250368780164c
    );
};
