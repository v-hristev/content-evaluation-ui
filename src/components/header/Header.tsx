import React from 'react';
import { styled, useStyletron } from 'styletron-react';
import { Link } from 'react-router-dom';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { UserInformationCallout } from './UserInformation';
import { NotificationsCallout } from './Notifications';
import {
    ActionButton,
    DefaultPalette,
    FontWeights,
    IButtonStyles,
    IIconProps,
    IStackItemStyles,
    IStackStyles,
    IStackTokens,
    ITextStyles,
    Stack,
    Text
} from '@fluentui/react';

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

const StyledLink = styled(
    Link,
    {
        textDecoration: "none",
    }
);

export const Header: React.FunctionComponent = () => {
    const [css] = useStyletron();
    const [isUserCalloutVisible, { toggle: toggleIsUserCalloutVisible }] = useBoolean(false);
    const [isNotificationsCalloutVisible, { toggle: toggleIsNotificationsCalloutVisible }] = useBoolean(false);
    const notificationsButtonId = useId('notifications-button');
    const userButtonId = useId('user-button');

    return (
        <header className={css({ marginBottom: "20px" })}>
            <Stack horizontal styles={stackStyles} tokens={stackTokens}>
                <Stack.Item grow={3} styles={titleStyles}>
                    <StyledLink to="/">
                        <Text variant="large" styles={boldStyle}>
                            Единна елетронна платформа за образователни услуги и съдържание
                        </Text>
                    </StyledLink>
                </Stack.Item>
                <Stack.Item grow styles={userInfoStyles}>
                    <Stack.Item grow styles={userInfoStyles}>
                        <Text variant="large" styles={boldStyle}>Иван Иванов</Text>
                    </Stack.Item>
                    <Stack.Item grow styles={userInfoStyles}>
                        <ActionButton id={notificationsButtonId} iconProps={mailIcon} styles={mailIconStyles} onClick={toggleIsNotificationsCalloutVisible} />
                        {isNotificationsCalloutVisible && <NotificationsCallout id={notificationsButtonId} toggleCallout={toggleIsNotificationsCalloutVisible} />}
                        <ActionButton id={userButtonId} iconProps={accountManagementIcon} styles={buttonStyles} onClick={toggleIsUserCalloutVisible} />
                        {isUserCalloutVisible && <UserInformationCallout id={userButtonId} toggleCallout={toggleIsUserCalloutVisible} />}
                    </Stack.Item>
                </Stack.Item>
            </Stack>
        </header>
    );
};
