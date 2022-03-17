import React from 'react';
import { Link } from 'react-router-dom';
import { Link as Lnk } from '@fluentui/react';
import { styled, useStyletron } from 'styletron-react';

const StyledLink = styled(Link, { textDecoration: "none" });

export const Nav: React.FunctionComponent = () => {
    const [css] = useStyletron();

    return (
        <nav>
            <ul className={css({listStyle: "none", textAlign: "left"})}>
                <li>                    
                    <StyledLink className="ms-Link root-90" to="/personal/1">Personal</StyledLink>
                </li>
                <li>
                    <StyledLink className="ms-Link root-90" to="/waiting-approval/1">Waiting Approval</StyledLink>
                </li>
                <li>
                    <StyledLink className="ms-Link root-90" to="/approved/1">Approved</StyledLink>
                </li>
            </ul>
        </nav>
    );
};
