import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import CartContext from "../context/CartContext";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import ImageSlider from "../components/ImageSlider";
import Select from "../components/Select";
import StyledButton from "../components/StyledButton";
import CashSvg from "../components/svg/CashSvg";
import CardSvg from "../components/svg/CardSvg";

import { saleProducts } from "../data/data.js";

export default function BuyingProduct() {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const { addProductToCart } = useContext(CartContext);
  let { id } = useParams();
  const { colors, img, name, payForm, price, sizes } = saleProducts[0];

  const handleAddToCartButton = () => {
    const product = { color, id, img, name, price, size };
    addProductToCart(product);
  };

  const selectColor = (e) => {
    setColor(e.target.value);
  };
  const selectSize = (e) => {
    setSize(e.target.value);
  };

  return (
    <Wrapper>
      <TopBar />
      <Container>
        <ImageSlider images={[{ original: img }]} />

        <DetailsWrapper>
          <Title>{name}</Title>
          <Title color={"#FFA07A"} fSize="15px">{`$${price.toFixed(2)}`}</Title>
          <PayFormsContainer>
            <CardSvg width={20} />
            <DetailsText>{payForm.card}</DetailsText>
          </PayFormsContainer>
          <PayFormsContainer>
            <CashSvg width={29} />
            <DetailsText>{payForm.cash}</DetailsText>
          </PayFormsContainer>
          <Select options={colors} onChangeFn={selectColor} />
          <Select options={sizes} onChangeFn={selectSize} />
          <StyledButton
            onClickFn={() => handleAddToCartButton()}
            title="AGREGAR AL CARRITO"
          />
        </DetailsWrapper>
      </Container>
      <BottomBar />
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  width: "100%",
});
const Container = styled.div({
  display: "flex",
  margin: "120px 0",
  width: "90%",
});
const DetailsWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "380px",
});
const Title = styled.h2({
  color: (props) => props.color,
  fontSize: (props) => props.fSize,
});
const PayFormsContainer = styled.div({
  alignItems: "flex-start",
  display: "flex",
  justifyContent: "flex-start",
  padding: "10px 0",
});
const DetailsText = styled.p({
  fontSize: "14px",
  margin: "0 5px",
});
