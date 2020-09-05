import React from "react";
import styled from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ConfirmModal({
  callback,
  children,
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
    setIdToDelete && setIdToDelete(undefined);
    setProductsInACategory && setProductsInACategory(undefined);
    setShowModal(false);
  };

  return (
    <BackScreen>
      <Wrapper>
        {!data.text ? (
          <LoadingSpinner small />
        ) : (
          <>
            <Title>{data.title}</Title>
            <Text>{data.text}</Text>
            {children}
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
    </BackScreen>
  );
}

const BackScreen = styled.div({
  background: "rgba(50, 50, 50, 0.3)",
  display: "grid",
  height: "100%",
  placeItems: "center",
  position: "absolute",
  left: "0",
  top: "0",
  width: "100%",
  zIndex: "3",
});
const Wrapper = styled.div({
  background: "#FFF",
  alignItems: "center",
  border: "1px solid #EEE",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  minHeight: "200px",
  justifyContent: "space-between",
  padding: "5px 15px 15px 15px",
  width: "370px",
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
