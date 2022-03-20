import React from "react";
import { DefaultPalette } from "@fluentui/react";
import { styled, StyleObject, useStyletron } from "styletron-react";
import { Link } from "react-router-dom";

const StyledLink = styled(
    Link, 
    {
        textDecoration: "none",
        color: DefaultPalette.white,
    }
);

const containerStyles: StyleObject = {
    listStyle: "none",
    textAlign: "left",
    padding: 0,
    margin: 0,
};

const commonContentStyles: StyleObject = {
    padding: "5px",
    borderBottomWidth: "3px",
    borderBottomStyle: "solid",
    borderBottomColor: DefaultPalette.white,
}

const personalContentStyles: StyleObject = {
    ...commonContentStyles,
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
};

const waitingApprovalContentStyles: StyleObject = {
    ...commonContentStyles,
    background: DefaultPalette.themeLight,
    color: DefaultPalette.black,
};

const approvedContentStyles: StyleObject = {
    background: DefaultPalette.themeLighter,
    color: DefaultPalette.black,
    padding: "5px",
};

export const Nav: React.FunctionComponent = () => {
    const [css] = useStyletron();

    return (
        <nav className={css({width: "150px"})}>
            <ul className={css(containerStyles)}>
                <li className={css(personalContentStyles)}>                    
                    <StyledLink to="/personal">Моето съдържание</StyledLink>
                </li>
                <li className={css(waitingApprovalContentStyles)}>
                    <StyledLink className={css({color: DefaultPalette.black})} to="/waiting-approvals">ДОС за оценка</StyledLink>
                </li>
                <li className={css(approvedContentStyles)}>
                    <StyledLink className={css({color: DefaultPalette.black})} to="/approved">Одобрени ДОС</StyledLink>
                </li>
            </ul>
        </nav>
    );
};
