import styled from "styled-components";

export const DateSection = styled.div`
    margin: 0 auto;
    width: 100%;
    padding: 10px;
    overflow: hidden;
`;

export const ScrollWrapper = styled.div`
    display: flex;
    margin: 0 auto;
    width: 90%;
    gap: 10px;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none;  /* For Internet Explorer and Edge */

    &::-webkit-scrollbar {
        display: none; /* For Chrome, Safari, and Opera */
    }
`;
