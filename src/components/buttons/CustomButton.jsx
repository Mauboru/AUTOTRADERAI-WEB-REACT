import styled, { keyframes } from "styled-components";
import { FaSpinner } from "react-icons/fa";

export default function CustomButton({ children, loading, variant = "primary", ...props }) {
  return (
    <Button variant={variant} {...props} disabled={loading || props.disabled}>
      {loading ? (
        <>
          <SpinnerIcon />
        </>
      ) : (
        children
      )}
    </Button>
  );
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Button = styled.button`
  background-color: ${({ theme, variant }) => theme.colors[variant]};
  color: #FFF;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
  width: fit-content;
  align-self: center;

  &:hover {
    background-color: ${({ theme, variant }) => theme.colors[`${variant}Dark`] || theme.colors[variant]};
  }

  &:disabled {
    background-color: ${({ theme, variant }) => theme.colors[`${variant}Dark`] || theme.colors[variant]};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const SpinnerIcon = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
`;
