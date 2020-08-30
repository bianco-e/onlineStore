import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import ImageSlider from "../components/ImageSlider";
import Select from "../components/Select";
import StyledButton from "../components/StyledButton";
import CashSvg from "../components/svg/CashSvg";
import CardSvg from "../components/svg/CardSvg";

import CartContext from "../context/CartContext";
import StyleContext from "../context/StyleContext";
import firebase from "../firebase/client";

export default function BuyingProduct() {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [product, setProduct] = useState(undefined);
  const [availableStock, setAvailableStock] = useState(undefined);
  const { addProductToCart } = useContext(CartContext);
  const { style } = useContext(StyleContext);
  const { primaryColor } = style;

  let { id } = useParams();

  useEffect(() => {
    firebase.getDocByID(id, "products").then((prod) => setProduct(prod));
  }, []);

  useEffect(() => {
    product &&
      setAvailableStock(
        Object.values(product.stock).reduce(
          (acc, current) => parseInt(acc) + parseInt(current)
        )
      );
  }, [product]);

  const handleAddToCartButton = () => {
    if (color && color != "Color" && size && size != "Color") {
      addProductToCart({ ...product, color, size, img: product.imgs[0] });
    }
  };

  const selectColor = (e) => {
    setColor(e.target.value);
  };
  const selectSize = (e) => {
    setSize(e.target.value);
  };

  return (
    <Wrapper>
      {!product ? (
        <LoadingSpinner />
      ) : (
        <>
          <TopBar />
          <Container>
            <ImageSlider
              images={product.imgs.map((img) => {
                return { original: img, originalClass: "sliderImg" };
              })}
            />

            <DetailsWrapper>
              <Text>{product.name}</Text>
              <Text
                primary={primaryColor}
                fSize="15px"
              >{`$${product.price.toFixed(2)}`}</Text>
              {availableStock < 1 && <Text>SIN STOCK</Text>}
              <PayFormsContainer>
                <CardSvg width={20} />
                <DetailsText>{`3 cuotas sin interés de $${(
                  product.price / 3
                ).toFixed(2)}`}</DetailsText>
              </PayFormsContainer>
              <PayFormsContainer>
                <CashSvg width={22} />
                <DetailsText>{`En efectivo 10% de descuento`}</DetailsText>
              </PayFormsContainer>
              <Select
                disabled={availableStock < 1 && true}
                options={[{ val: "Color" }].concat(
                  product.colors.map((color) => {
                    return { val: color };
                  })
                )}
                onChangeFn={selectColor}
              />
              <Select
                disabled={availableStock < 1 && true}
                options={[{ val: "Talle" }].concat(
                  Object.keys(product.stock)
                    .filter((k) => product.stock[k] != 0)
                    .map((s) => {
                      return { val: s };
                    })
                )}
                onChangeFn={selectSize}
              />
              <StyledButton
                onClickFn={() => handleAddToCartButton()}
                title="AGREGAR AL CARRITO"
              />
            </DetailsWrapper>
          </Container>
          <BottomBar />
        </>
      )}
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
  justifyContent: "space-evenly",
  margin: "120px 0",
  padding: "20px 0",
  width: "90%",
});
const DetailsWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "380px",
});
const Text = styled.h2({
  color: (props) => props.primary,
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
