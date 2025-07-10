import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
import styled from "styled-components";

const icons = {
  success: <FaCheckCircle color="green" size={28} />,
  error: <FaExclamationCircle color="red" size={28} />,
  info: <FaInfoCircle color="blue" size={28} />,
  warning: <FaExclamationTriangle color="orange" size={28} />,
};

const titles = {
  success: "Sucesso",
  error: "Erro",
  info: "Informação",
  warning: "Atenção",
};

const CustomModal = ({ show, onHide, type = "info", message, onConfirm }) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onHide();
  };

  return (
    <StyledModal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <StyledHeaderTitle>
          {icons[type]} <span className="ms-2">{titles[type]}</span>
        </StyledHeaderTitle>
      </Modal.Header>
      <Modal.Body>
        <MessageText>{message}</MessageText>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton onClick={handleConfirm}>Ok</StyledButton>
      </Modal.Footer>
    </StyledModal>
  );
};

export default CustomModal;

const StyledModal = styled(Modal)`
  .modal-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 500px;
    margin: auto;
  }

  .modal-content {
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    text-align: center;
  }

  .modal-body {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .modal-footer {
    justify-content: center;
    padding: 20px;
  }
`;

const StyledHeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: #0d6efd;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  
  &:hover {
    background-color: #0b5ed7;
    transform: scale(1.05);
  }

  &:focus {
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
`;

const MessageText = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 0;
  text-align: center;
`;
