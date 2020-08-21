import React, { useContext, useState } from "react";
import styled from "styled-components";
import StyleContext from "../context/StyleContext";
import SettableImageThumbnail from "./SettableImageThumbnail";
import StyledButton from "./StyledButton";
import firebase from "../firebase/client.js";

export default function AdminConfig() {
  const { style, setStyle } = useContext(StyleContext);
  const [loadedFile, setLoadedFile] = useState(undefined);
  const { storeName, storeLogo, primaryColor, secondaryColor } = style;

  const setValue = (e, property) =>
    setStyle({ ...style, [property]: e.target.value });

  const newImgOnClickFn = (e) => {
    setLoadedFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setStyle({ ...style, storeLogo: url });
  };

  const saveChanges = () => {
    const id = "stylesheet";
    loadedFile
      ? firebase.addImage("logo", loadedFile).then((imgUrl) => {
          firebase.editDoc("style", id, {
            ...style,
            storeLogo: imgUrl,
          });
        })
      : firebase.editDoc("style", id, style);
  };

  class Config {
    constructor(text, element) {
      this.text = text;
      this.element = element;
    }
  }

  const getInputFrom = (title) => {
    const propertyName = title.toLowerCase();
    const input = (
      <Input
        type="text"
        value={style[propertyName]}
        onChange={(e) => setValue(e, propertyName)}
      />
    );
    return new Config(title, input);
  };

  const configs = [
    new Config(
      "Nombre de la tienda",
      (
        <Input
          type="text"
          value={storeName}
          onChange={(e) => setValue(e, "storeName")}
        />
      )
    ),
    new Config(
      "Logo de la tienda",
      (
        <SettableImageThumbnail
          src={storeLogo}
          onChangeFn={(e) => newImgOnClickFn(e)}
        />
      )
    ),
    new Config(
      "Color primario",
      (
        <ColorInput
          onChange={(e) => setValue(e, "primaryColor")}
          type="color"
          value={primaryColor}
        />
      )
    ),
    new Config(
      "Color secundario",
      (
        <ColorInput
          onChange={(e) => setValue(e, "secondaryColor")}
          type="color"
          value={secondaryColor}
        />
      )
    ),
    getInputFrom("Instagram"),
    getInputFrom("Facebook"),
    getInputFrom("Email"),
    getInputFrom("Whatsapp"),
  ];

  return (
    <Container>
      <Title>Configuración</Title>
      {configs.map((option) => {
        return (
          <OptionBox>
            <OptionText>{option.text}</OptionText>
            {option.element}
          </OptionBox>
        );
      })}
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
  borderBottom: "1px solid black",
  fontSize: "15px",
  textAlign: "right",
  width: "160px",
});
const ColorInput = styled.input({
  background: "none",
  border: "0",
  cursor: "pointer",
  height: "25px",
  padding: "0",
  width: "40px",
});
