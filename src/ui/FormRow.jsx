import styled, { css } from "styled-components";

const FormRowStyled = styled.div`
  display: grid;
  align-items: start;
  grid-template-columns: 24rem 1fr;
  gap: 2.4rem;
  align-items: center;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  ${(props) =>
    props.type === "buttons" &&
    css`
      display: flex;
      justify-content: flex-end;
      gap: 1.2rem;
    `}
`;

const Label = styled.label`
  font-weight: 500;
`;

const FieldWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & > * {
    width: 100%;
  }
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, id, type }) {
  if (type === "buttons")
    return <FormRowStyled type="buttons">{children}</FormRowStyled>;

  return (
    <FormRowStyled>
      {label && <Label htmlFor={id}>{label}</Label>}

      <FieldWrapper>
        {children}
        {error && <Error>{error}</Error>}
      </FieldWrapper>
    </FormRowStyled>
  );
}

export default FormRow;
