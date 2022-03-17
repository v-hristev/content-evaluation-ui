import { ILinkProps } from '@fluentui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styletron-react';

const StyledLink = styled(Link, { textDecoration: "none" });

export const NavLink = ({to}: ILinkProps) => {
    return (
        <StyledLink className="ms-Link root-90" to={to}>Personal</StyledLink>
    );
};
