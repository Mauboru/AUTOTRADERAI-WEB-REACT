import { styled, keyframes } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaHome, FaSearch, FaPlusCircle, FaChartPie, FaUser, FaSpinner } from "react-icons/fa";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [spinning, setSpinning] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleReload = () => {
    setSpinning(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <Styled.FooterContainer>
      {/* <Styled.FooterButton onClick={() => navigate("/buscar")} $active={isActive("/buscar")}>
        <FaSearch />
        <Styled.Label>Buscar</Styled.Label>
      </Styled.FooterButton> */}

      {/* <Styled.FooterButton onClick={() => navigate("/inserir")} $active={isActive("/inserir")}>
        <FaPlusCircle />
        <Styled.Label>Inserir</Styled.Label>
      </Styled.FooterButton> */}

      <Styled.FooterButton onClick={handleReload} $active={isActive("/")}>
        {spinning ? <RotatingSpinner /> : <FaSpinner />}
      </Styled.FooterButton>

      {/* <Styled.FooterButton onClick={() => navigate("/dashboards")} $active={isActive("/dashboards")}>
        <FaChartPie />
        <Styled.Label>Gráficos</Styled.Label>
      </Styled.FooterButton> */}

      {/* <Styled.FooterButton onClick={() => navigate("/perfil")} $active={isActive("/perfil")}>
        <FaUser />
        <Styled.Label>Perfil</Styled.Label>
      </Styled.FooterButton> */}
    </Styled.FooterContainer>
  );
}

const Styled = {
  FooterContainer: styled.footer`
    position: fixed;
    bottom: -1px;
    width: 100%;
    height: 84px;
    background-color: #1b1b1b;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 1rem;
    border-top: 1px solid #333;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.3);
    z-index: 100;
  `,

  FooterButton: styled.button`
    background: ${({ $active }) =>
      $active ? "rgba(255, 255, 255, 0.08)" : "transparent"};
    border: none;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 12px;
    backdrop-filter: ${({ $active }) => ($active ? "blur(6px)" : "none")};
    box-shadow: ${({ $active }) =>
      $active ? "0 2px 8px rgba(0,0,0,0.4)" : "none"};
    transition: all 0.2s ease-in-out;
  `,

  Label: styled.span`
    font-size: 0.7rem;
    margin-top: 2px;
  `,
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatingSpinner = styled(FaSpinner)`
  animation: ${rotate} 2s linear infinite;
`;