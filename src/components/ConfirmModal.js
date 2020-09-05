import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ConfirmModal({
  callback,
  setIdToDelete,
  setProductsInACategory,
  setShowModal,
  data,
}) {
  const handleConfirmation = () => {
    callback();
    setShowModal(false);
  };

  const handleCancel = () => {
    setIdToDelete(undefined);
    setProductsInACategory && setProductsInACategory(undefined);
    setShowModal(false);
  };

  return (
    <Wrapper>
      {!data.text ? (
        <LoadingSpinner small />
      ) : (
        <>
          <Title>{data.title}</Title>
          <Text>{data.text}</Text>
          <Container>
            <Button color="darkgreen" onClick={() => handleConfirmation()}>
              Confirmar
            </Button>
            <Button color="red" onClick={() => handleCancel()}>
              Cancelar
            </Button>
          </Container>
        </>
      )}
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
  padding: "5px 5px 15px 5px",
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
  fontSize: "14px",
  textAlign: "center",
});
