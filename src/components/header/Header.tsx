<<<<<<< HEAD
import { ActionButton, concatStyleSets, concatStyleSetsWithProps, DefaultPalette, FontWeights, IButtonStyles, Icon, IconButton, IIconProps, IStackItemStyles, IStackStyles, IStackTokens, ITextStyles, mergeStyles, mergeStyleSets, Stack, Text } from '@fluentui/react';
import React from 'react';
import { useStyletron } from 'styletron-react';

const boldStyle: Partial<ITextStyles> = {
    root: {
        fontWeight: FontWeights.semibold,
        color: DefaultPalette.white,
    }
};

// Styles definition
const stackStyles: IStackStyles = {
    root: {
        background: DefaultPalette.themePrimary,
    },
};

const titleStyles: IStackStyles = {
    root: {
        alignItems: 'left',
        color: DefaultPalette.white,
        display: 'flex',
        height: 50,
        justifyContent: 'start',
    },
};

const userInfoStyles: IStackItemStyles = {
    root: {
        alignItems: 'right',
        color: DefaultPalette.white,
        display: 'flex',
        height: 50,
        justifyContent: 'end',
    },
};

// Tokens definition
const stackTokens: IStackTokens = {
    childrenGap: 5,
    padding: 10,
};

const mailIcon: IIconProps = { iconName: 'Mail' };
const accountManagementIcon: IIconProps = { iconName: 'AccountManagement' };

const buttonStyles: IButtonStyles = {
    root: {
        padding: '5px',
        height: 'auto',
        background: DefaultPalette.white,
        boxShadow: 'rgb(0 0 0 / 35%) 0px 5px 15px',
    },
    icon: {
        fontSize: 35
    }
};

const mailIconStyles: IButtonStyles = {
    root: {
        padding: '5px',
        height: 'auto',
        background: DefaultPalette.white,
        boxShadow: 'rgb(0 0 0 / 35%) 0px 5px 15px',
        marginRight: '10px',
    },
    icon: {
        fontSize: 35
    }
};

export const Header: React.FunctionComponent = () => {
    const [css] = useStyletron();

    return (
        <header className={css({marginBottom: "20px"})}>
            <Stack horizontal styles={stackStyles} tokens={stackTokens}>
                <Stack.Item grow={3} styles={titleStyles}>
                    <Text variant="large" styles={boldStyle}>
                        Единна елетронна платформа за образователни услуги и съдържание
                    </Text>
                </Stack.Item>
                <Stack.Item grow styles={userInfoStyles}>
                    <Stack.Item grow styles={userInfoStyles}>
                        <Text variant="large" styles={boldStyle}>Иван Иванов</Text>
                    </Stack.Item>
                    <Stack.Item grow styles={userInfoStyles}>
                        <ActionButton iconProps={mailIcon} allowDisabledFocus disabled={false} checked={false} styles={mailIconStyles} />
                        <ActionButton iconProps={accountManagementIcon} allowDisabledFocus disabled={false} checked={false} styles={buttonStyles} />
                    </Stack.Item>
                </Stack.Item>
            </Stack>
        </header>
=======
import React from 'react';

export const Header: React.FunctionComponent = () => {
    return (
        <h1>Page Header</h1>
>>>>>>> 842101f51d4ca87515b9939876c250368780164c
    );
};
