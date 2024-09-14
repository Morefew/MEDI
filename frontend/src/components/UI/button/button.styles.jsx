import styled, { css } from 'styled-components';

export const ButtonContainer = styled.button`
    border-radius: 5px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #5F6FFF;
    border: none;
    cursor: pointer;
    
    ${({ buttonType }) => buttonType === 'inverted' && css`
        background-color: white;
        border: 1px solid #5F6FFF;
    `}
`;

export const ButtonText = styled.span`
    color: white;
    
    ${({ buttonType }) => buttonType === 'inverted' && css`
        color: #5F6FFF;
    `}
`;

export const Spinner = styled.div`
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top: 4px solid white;
    width: 20px;
    height: 20px;
    animation: spin 2s linear infinite;

    ${({ buttonType }) => buttonType === 'inverted' && css`
        border-top: 4px solid #5F6FFF;
    `}
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;