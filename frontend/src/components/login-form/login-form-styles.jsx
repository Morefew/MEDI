import styled from "styled-components";

export const LoginFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 50px auto;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const LoginFormTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
`;

export const Label = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 14px;
`;

export const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;

    &:focus {
        border-color: #3f51b5;
        outline: none;
    }
`;

export const Select = styled.select`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
`;

export const Button = styled.button`
    background-color: #3f51b5;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    margin-top: 10px;

    &:hover {
        background-color: #2c3a9b;
    }
`;

export const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin-top: 5px;
`;
