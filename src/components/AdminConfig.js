import React, { useContext, useState } from "react";
import styled from "styled-components";

import LoadingSpinner from "../components/LoadingSpinner";
import StyleContext from "../context/StyleContext";
import SettableImageThumbnail from "./SettableImageThumbnail";
import StyledButton from "./StyledButton";
import StyledInput from "./StyledInput";
import FeedbackMessage from "./FeedbackMessage";
import FormOption from "./FormOption";

import { Config } from "../data/data.js";
import firebase from "../firebase/client.js";

export default function AdminConfig() {
  const { style, setStyle } = useContext(StyleContext);
  const [loadedFile, setLoadedFile] = useState(undefined);
  const [feedbackMsg, setFeedbackMsg] = useState(undefined);
  const {
    homeTitle,
    storeName,
    storeLogo,
    primaryColor,
    promText,
    secondaryColor,
  } = style;

  const setValue = (e, property) =>
    setStyle({ ...style, [property]: e.target.value });

  const newImgOnClickFn = (file) => {
    setLoadedFile(file);
    const url = URL.createObjectURL(file);
    setStyle({ ...style, storeLogo: url });
  };

  const saveChanges = () => {
    const id = "stylesheet";
    loadedFile
      ? firebase.addImage("logo", loadedFile).then((imgUrl) => {
          firebase.editDoc(setFeedbackMsg, "style", id, {
            ...style,
            storeLogo: imgUrl,
          });
        })
      : firebase.editDoc(setFeedbackMsg, "style", id, style);
  };

  const makeInputFrom = (title) => {
    const propertyName = title.toLowerCase();
    const input = (
      <StyledInput
        val={style[propertyName]}
        onChangeFn={(e) => setValue(e, propertyName)}
        width="180px"
      />
    );
    return new Config(title, input);
  };

  const configs = [
    new Config(
      "Nombre de la tienda",
      (
        <StyledInput
          onChangeFn={(e) => setValue(e, "storeName")}
          val={storeName}
          width="180px"
        />
      )
    ),
    new Config(
      "Título de Home",
      (
        <StyledInput
          onChangeFn={(e) => setValue(e, "homeTitle")}
          val={homeTitle}
          width="180px"
        />
      )
    ),
    new Config(
      "Texto de promocionados",
      (
        <StyledInput
          onChangeFn={(e) => setValue(e, "promText")}
          val={promText}
          width="180px"
        />
      )
    ),
    new Config(
      "Logo de la tienda",
      (
        <SettableImageThumbnail
          src={storeLogo}
          onChangeFn={(e) => newImgOnClickFn(e.target.files[0])}
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
    makeInputFrom("Instagram"),
    makeInputFrom("Facebook"),
    makeInputFrom("Email"),
    makeInputFrom("Whatsapp"),
  ];

  return (
    <>
      <Title>Configuración</Title>

      {!style.storeLogo ? (
        <LoadingSpinner />
      ) : (
        <>
          {configs.map(({ text, element }) => {
            return (
              <FormOption key={text} text={text}>
                {element}
              </FormOption>
            );
          })}
          {feedbackMsg && <FeedbackMessage msg={feedbackMsg} type="ok" />}
          <StyledButton
            title="GUARDAR CAMBIOS"
            onClickFn={() => saveChanges()}
          />
        </>
      )}
    </>
  );
}

const Title = styled.h2({});
const ColorInput = styled.input({
  background: "none",
  border: "0",
  cursor: "pointer",
  height: "25px",
  padding: "0",
  width: "40px",
});
