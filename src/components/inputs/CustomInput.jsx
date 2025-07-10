import React from "react";
import styled from "styled-components";
import { FloatingLabel, Form } from "react-bootstrap";

export default function CustomInput({ label, type = "text", name, value, onChange, required = false, placeholder = "", controlId }) {
  return (
    <InputWrapper as={FloatingLabel} controlId={controlId || name} label={label} className="mb-3">
      <Form.Control
        type={type}
        placeholder={placeholder || label}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </InputWrapper>
  );
}

const InputWrapper = styled.div`
  .form-control {
    background-color: ${({ theme }) => theme.colors.inputBg};
    border: 1px solid ${({ theme }) => theme.colors.inputBorder};
    color: ${({ theme }) => theme.colors.text};
    padding: 0.8rem 0.75rem;
    border-radius: 4px;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: none;
    }
  }

  label {
    color: ${({ theme }) => theme.colors.placeholder};
  }

  .form-control:focus ~ label {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
