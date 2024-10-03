import styled from "styled-components";

export const DateCard = styled.div`
    height: 90px;
    min-width: 70px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 10px;
    background-color: ${(props) => (props.selected ? '#3F51B5 !important' : 'transparent')};
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const Month = styled.div`
    font-size: 16px;
    color: ${(props) => (props.selected ? '#fff' : '#000')};
    font-weight: ${(props) => (props.selected ? 700 : 400)};
`;

export const DayNumber = styled.div`
    font-size: 16px;
    color: ${(props) => (props.selected ? '#fff' : '#000')};
    font-weight: ${(props) => (props.selected ? 700 : 400)};
`;

export const Day = styled.div`
    font-size: 16px;
    color: ${(props) => (props.selected ? '#fff' : '#000')};
    font-weight: ${(props) => (props.selected ? 700 : 400)};
`;
