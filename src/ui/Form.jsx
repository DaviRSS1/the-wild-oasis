import styled, { css } from "styled-components";

const Form = styled.form`
  overflow: auto;
  max-height: 80vh;

  /* 🔥 Scroll bonito */
  scrollbar-width: thin;
  scrollbar-color: var(--color-grey-300) transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-grey-300);
    border-radius: 100px;
    transition: background-color 0.2s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-grey-400);
  }

  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}
    
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
