import React from "react";
import { Text, DefaultPalette, FontWeights, ITextStyles } from "@fluentui/react";
import { Link } from "react-router-dom";
import { styled } from "styletron-react";
import { DashboardSectionLoading } from "./DashboardSectionLoading";

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
    loading: boolean;
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
    loading,
}: IDashboardSectionProps) => {
    return (
        <SectionStyled>
            <Text styles={boldStyle}>{title}</Text>
            {loading && <DashboardSectionLoading />}
            {!loading && <ListStyled>
                {items.map((x: IDashboardSectionItem) => (
                    <ListItemStyled key={x.id}>
                        <StyledLink to={x.to}>{x.text}</StyledLink>
                    </ListItemStyled>
                ))}
            </ListStyled>}
        </SectionStyled>
    )
}