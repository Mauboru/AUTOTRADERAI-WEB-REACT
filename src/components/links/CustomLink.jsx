import styled from "styled-components";

export default function CustomLink({ children, ...props }) {
  return <StyledLink {...props}>{children}</StyledLink>;
}

const StyledLink = styled.a`
  display: block;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  text-decoration: none;
  margin-top: 10px;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.linkPlaceholder};
  }
`;
