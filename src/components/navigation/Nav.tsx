import React from "react";
import { Link } from "react-router-dom";
import { DefaultPalette } from "@fluentui/react";
import { styled, StyleObject, useStyletron } from "styletron-react";

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

const personalContentStyles: StyleObject = {
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    padding: "5px",
    borderBottom: "3px solid",
    borderBottomColor: DefaultPalette.white,
};

const waitingApprovalContentStyles: StyleObject = {
    background: DefaultPalette.themeLight,
    color: DefaultPalette.black,
    padding: "5px",
    borderBottom: "3px solid",
    borderBottomColor: DefaultPalette.white,
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
                    <StyledLink to="/personal/1">Моето съдържание</StyledLink>
                </li>
                <li className={css(waitingApprovalContentStyles)}>
                    <StyledLink className={css({color: DefaultPalette.black})} to="/waiting-approval/1">ДОС за оценка</StyledLink>
                </li>
                <li className={css(approvedContentStyles)}>
                    <StyledLink className={css({color: DefaultPalette.black})} to="/approved/1">Одобрени ДОС</StyledLink>
                </li>
            </ul>
        </nav>
    );
};
