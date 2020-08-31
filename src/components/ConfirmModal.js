import React from "react";
import styled from "styled-components";

export default function ConfirmModal({
  callback,
  setIdToDelete,
  setShowModal,
}) {
  const handleConfirmation = () => {
    callback();
    setShowModal(false);
  };

  const handleCancel = () => {
    setIdToDelete(undefined);
    setShowModal(false);
  };
  return (
    <Wrapper>
      <Title>¿Seguro que deseas eliminar este producto?</Title>
      <Text>Una vez confirmado el producto será eliminado por completo.</Text>
      <Container>
        <Button color="darkgreen" onClick={() => handleConfirmation()}>
          Confirmar
        </Button>
        <Button color="red" onClick={() => handleCancel()}>
          Cancelar
        </Button>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  background: "#FFF",
  alignItems: "center",
  border: "1px solid #EEE",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  height: "200px",
  justifyContent: "space-between",
  padding: "10px",
  position: "absolute",
  top: "30%",
  width: "360px",
  zIndex: "3",
});
const Container = styled.div({
  display: "flex",
  justifyContent: "space-evenly",
  width: "90%",
});
const Button = styled.button({
  background: "none",
  border: "1px solid #EEE",
  borderRadius: "10px",
  color: (props) => props.color,
  cursor: "pointer",
  padding: "8px",
  transition: "all .6s ease",
  ["&:hover"]: {
    border: (props) => `1px solid ${props.color}`,
  },
});
const Title = styled.h4({
  textAlign: "center",
});
const Text = styled.p({
  textAlign: "center",
});
