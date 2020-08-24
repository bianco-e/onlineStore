import React, { useContext, useState } from "react";
import styled from "styled-components";
import StyleContext from "../context/StyleContext";
import SettableImageThumbnail from "./SettableImageThumbnail";
import StyledButton from "./StyledButton";
import firebase from "../firebase/client.js";

export default function AdminDesign() {
  const { style, setStyle } = useContext(StyleContext);
  const [loadedFile, setLoadedFile] = useState(undefined);
  const { storeName, storeLogo, primaryColor, secondaryColor } = style;

  const handleColor = (e, property) =>
    setStyle({ ...style, [property]: e.target.value });

  const newImgOnClickFn = (e) => {
    setLoadedFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setStyle({ ...style, storeLogo: url });
  };

  const saveChanges = () => {
    const id = "stylesheet";
    firebase.addImage("logo", loadedFile).then((imgUrl) => {
      firebase.editDoc(false, "style", id, {
        ...style,
        storeLogo: imgUrl,
      });
    });
  };

  return (
    <Container>
      <Title>Diseño</Title>
      <OptionBox>
        <OptionText>Nombre de la tienda</OptionText>
        <Input
          type="text"
          value={storeName}
          onChange={(e) => setStyle({ ...style, storeName: e.target.value })}
        />
      </OptionBox>
      <OptionBox>
        <OptionText>Logo de la tienda</OptionText>
        <SettableImageThumbnail
          src={storeLogo}
          onChangeFn={(e) => newImgOnClickFn(e)}
        />
      </OptionBox>
      <OptionBox>
        <OptionText>Color primario</OptionText>
        <ColorInput
          onChange={(e) => handleColor(e, "primaryColor")}
          type="color"
          value={primaryColor}
        />
      </OptionBox>
      <OptionBox>
        <OptionText>Color secundario</OptionText>
        <ColorInput
          onChange={(e) => handleColor(e, "secondaryColor")}
          type="color"
          value={secondaryColor}
        />
      </OptionBox>
      <StyledButton title="GUARDAR CAMBIOS" onClickFn={() => saveChanges()} />
    </Container>
  );
}

const Container = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  marginTop: "50px",
  minHeight: "100vh",
  width: "80%",
});
const Title = styled.h2({});
const OptionBox = styled.section({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  width: "55%",
});
const OptionText = styled.h4({});
const Input = styled.input({
  border: "0",
  textAlign: "right",
  width: "180px",
});
const ColorInput = styled.input({
  background: "none",
  border: "0",
  cursor: "pointer",
  height: "25px",
  padding: "0",
  width: "40px",
});
