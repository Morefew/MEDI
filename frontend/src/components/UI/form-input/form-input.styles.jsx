import styled, { css } from 'styled-components';

const subColor = 'grey';

/* const InputTextColors = css`
  @media (prefers-color-scheme: dark) {
    color: white;

    &:focus {
      color: white;
    }
  }

  @media (prefers-color-scheme: light) {
    color: black;

    &:focus {
      color: black;
    }
  }
`;

const InputColors = css`
  @media (prefers-color-scheme: dark) {
    background-color: #242424;
    color: white;
  }

  @media (prefers-color-scheme: light) {
    background-color: white;
    color: black;

    &:focus {
      background-color: black;
      color: white;
    }
  }
`; */

const shrinkLabelStyles = css`
  top: -8px;
  font-size: 0.75rem;
  color: black;
`;

export const FormInputLabel = styled.label`
  color: gray;
  font-size: 1rem;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 7px;
  transition: 300ms ease all;
  background-color: white;
  margin: 0 5px;
  &:focus {
    color: black;
  }
  
  ${({ shrink }) => shrink && shrinkLabelStyles};
`;

export const Input = styled.input`
  background: none;
  background-color: white;
  color: black;
  font-size: 1.125rem;
  padding: 5px 10px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border: 1px solid ${subColor};
  border-radius: 10px;

  &:focus {
    outline: none;
  }
  
  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles};
  }
`;

export const Group = styled.div`
  position: relative;
  
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;