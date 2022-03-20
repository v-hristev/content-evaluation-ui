import React, { useEffect, useState } from 'react';
import { DefaultPalette, FontWeights, IStackTokens, ITextStyles, Stack, Text } from '@fluentui/react';
import { Nav } from '../../components/navigation/Nav';
import { styled, useStyletron } from 'styletron-react';
import { Link } from 'react-router-dom';
import { loadApprovedContent, loadPersonalContent, loadWaitingApprovalsContent } from '../../services/items';
import { Calendar } from '../../components/calendar/Calendar';

const stackTokens: IStackTokens = {
    maxWidth: 1200
};

const boldStyle: Partial<ITextStyles> = {
    root: {
        fontWeight: FontWeights.semibold,
        color: DefaultPalette.themeDark,
    }
};

export interface IDashboardSectionItem {
    id: string;
    to: string;
    text: string;
}

export interface IDashboardSectionProps {
    title: string;
    items: IDashboardSectionItem[];
}

const SectionStyled = styled(
    "section",
    {
        maxWidth: "350px",
    }
);

const ListStyled = styled(
    "ul",
    {
        textAlign: "left",
        paddingLeft: "15px",
        marginTop: "5px",
    }
);

const ListItemStyled = styled(
    "li",
    {
        color: DefaultPalette.themePrimary,
    }
);

const StyledLink = styled(
    Link,
    {
        textDecoration: "none",
        color: DefaultPalette.themePrimary,
    }
);

export const DashboardSection = ({
    title,
    items,
}: IDashboardSectionProps) => {
    return (
        <SectionStyled>
            <Text styles={boldStyle}>{title}</Text>
            <ListStyled>
                {items.map((x: IDashboardSectionItem) => (
                    <ListItemStyled key={x.id}>
                        <StyledLink to={x.to}>{x.text}</StyledLink>
                    </ListItemStyled>
                ))}
            </ListStyled>
        </SectionStyled>
    )
}

export const PersonalSection = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadPersonalContent()
            .then((response) => {
                setItems(response.map((x: any) => ({
                    id: x.id,
                    text: x.text,
                    to: `/personal/${x.id}`,
                })));
            });
    }, [setItems]);

    return (
        <DashboardSection title="Последни мои публикации" items={items} />
    )
}

export const WaitingApprovalsSection = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadWaitingApprovalsContent()
            .then((response) => {
                setItems(response.map((x: any) => ({
                    id: x.id,
                    text: x.text,
                    to: `/waiting-approvals/${x.id}`,
                })));
            });
    }, [setItems]);

    return (
        <DashboardSection title="ДОС чакащи за оценка" items={items} />
    )
}

export const ApprovedSection = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadApprovedContent()
            .then((response) => {
                setItems(response.map((x: any) => ({
                    id: x.id,
                    text: x.text,
                    to: `/approved/${x.id}`,
                })));
            });
    }, [setItems]);

    return (
        <DashboardSection title="Одобрени ДОС" items={items} />
    )
}

export const DashboardPage: React.FunctionComponent = () => {
    const [css] = useStyletron();

    return (
        <Stack horizontal tokens={stackTokens}>
            <Stack.Item grow={3}>
                <Nav />
            </Stack.Item>
            <Stack.Item grow={3} className={css({ textAlign: "left" })}>
                <PersonalSection />
                <WaitingApprovalsSection />
                <ApprovedSection />
            </Stack.Item>
            <Stack.Item grow={3}>
                <Calendar onChange={(start, end) => {
                    console.log('start ->', start?.toISOString());
                    console.log('end ->', end?.toISOString());
                }} />
            </Stack.Item>
        </Stack>
    );
};
