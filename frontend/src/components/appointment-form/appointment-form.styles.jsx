import styled from "styled-components";

export const AppointmentFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    margin: 50px auto;
    overflow: hidden;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const DoctorProfile = styled.div`
    display: flex;
    max-width: 100vw;
    margin: 0 auto;
    overflow: hidden;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ProfilePicture = styled.div`
    flex: 0.3;
    img {
        width: 300px;
        border-radius: 10px;
        background-color: #f0f0f0;
    }
`;

export const ProfileInfo = styled.div`
    flex: 0.7;
    padding: 0 20px;
    text-align: left;
    h2 {
        font-size: 24px;
        font-weight: 600;
    }
    p {
        font-size: 18px;
        margin: 10px 0;
        color: #666;
    }
`;

export const VerifiedIcon = styled.span`
    color: blue;
    margin-left: 5px;
`;

export const Experience = styled.div`
    background-color: #f0f8ff;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    color: #666;
`;

export const About = styled.p`
    margin: 20px 0;
    font-size: 16px;
    color: #555;
`;

export const Fee = styled.div`
    font-size: 18px;
    strong {
        font-weight: 600;
        color: #333;
    }
`;

export const BookingSection = styled.div`
    margin-top: 10px;
`;

export const BookingTitle = styled.h3`
    font-size: 20px;
    margin-bottom: 10px;
`;

export const DropdownContainer = styled.div`
    margin-top: 15px;

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    select {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 100%;
    }
`;

export const DaySelector = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

export const DayButton = styled.button`
    border: none;
    display: flex;
    flex-direction: column;
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    background-color: ${props => (props.selected ? "#3F51B5" : "#f9f9f9")};
    color: ${props => (props.selected ? "white" : "#333")};
    border-radius: 50px;
    width: 70px;
    height: 70px;
`;

export const SlotSelector = styled.div`
    display: flex;
    width: 90%;
    margin: 0 auto;
    gap: 10px;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none;  /* For Internet Explorer and Edge */

    &::-webkit-scrollbar {
        display: none; /* For Chrome, Safari, and Opera */
    }

`;

export const SlotButton = styled.button`
    border: none;
    padding: 10px;
    font-size: 14px;
    cursor: pointer;
    background-color: ${props => (props.selected ? "#3F51B5" : "#f9f9f9")};
    color: ${props => (props.selected ? "white" : "#333")};
    border-radius: 50px;
    width: 100px;
`;

export const BookButton = styled.button`
    display: block;
    width: 100%;
    margin-top: 30px;
    background-color: #3F51B5;
    color: white;
    font-size: 16px;
    padding: 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #2c3a9b;
    }
`;