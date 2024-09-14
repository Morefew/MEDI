import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const NavigationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 98%;
    margin: 0 auto;
    border-bottom: 0.5px solid #000;
`;

export const NavigationLogo = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #000;
    font-size: 1.5rem;
    font-weight: 700;

    h1 {
        margin: 0;
    }
`;

export const NavigationList = styled.ul`
    display: flex;
    list-style: none;
`;

const activeStyle = css`
    color: #f00;
`;

export const NavigationItem = styled(NavLink)`
    text-decoration: none;
    color: #000;
    font-size: 1rem;
    font-weight: 500;
    margin-left: 1rem;
    transition: color 0.3s;

    &:hover {
        color: #f00;
    }

    &.active{
        ${activeStyle}
    }
`;
