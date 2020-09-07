import React, { Fragment, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Media from "react-media";

import LoadingSpinner from "../components/LoadingSpinner";
import BottomBar from "../components/BottomBar";
import TopBar from "../components/TopBar";
import ImageSlider from "../components/ImageSlider";
import Select from "../components/Select";
import StyledButton from "../components/StyledButton";
import Price from "../components/Price";
import FeedbackMessage from "../components/FeedbackMessage";
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
  const [selectsData, setSelectsData] = useState([]);
  const [feedbackMsg, setFeedbackMsg] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const { addProductToCart } = useContext(CartContext);
  const { style } = useContext(StyleContext);
  const { primaryColor } = style;

  let { id } = useParams();

  useEffect(() => {
    firebase.getDocByID(id, "products").then((prod) => setProduct(prod));
  }, []);

  useEffect(() => {
    if (product) {
      setAvailableStock(
        product.stock
          .map((option) => option.items)
          .reduce((acc, current) => parseInt(acc) + parseInt(current))
      );
      setSelectsData([
        {
          options: [{ val: "Color" }].concat(
            product.colors.map((color) => {
              return { val: color };
            })
          ),
          fn: (e) => setColor(e.target.value),
        },
        {
          options: [{ val: "Talle" }].concat(
            product.stock
              .filter(({ items }) => items != 0)
              .map(({ size }) => {
                return { val: size };
              })
          ),
          fn: (e) => setSize(e.target.value),
        },
      ]);
    }
  }, [product]);

  const handleAddToCartButton = () => {
    setFeedbackMsg(undefined);
    setErrorMsg(undefined);
    if (color && color != "Color" && size && size != "Color") {
      addProductToCart({ ...product, color, size, img: product.imgs[0] });
      setFeedbackMsg("Producto agregado");
    } else setErrorMsg("Debes seleccionar color y talle");
  };

  const getFinalPrice = (price, extra, dues) => {
    return ((price + (price * extra) / 100) / dues).toFixed(2);
  };

  return (
    <Wrapper>
      {!product ? (
        <LoadingSpinner />
      ) : (
        <>
          <TopBar />
          <Media
            queries={{
              small: "(max-width: 500px)",
              medium: "(min-width: 501px) and (max-width: 780px)",
            }}
          >
            {({ small, medium }) => (
              <Fragment>
                <Container flexDir={small || medium ? "column" : "row"}>
                  <ImageSlider
                    images={product.imgs.map((img) => {
                      return { original: img, originalClass: "sliderImg" };
                    })}
                  />

                  <DetailsWrapper
                    align={small || medium ? "center" : "flex-start"}
                  >
                    <Text>{product.name}</Text>
                    <Price color={primaryColor} price={product.price} />
                    {availableStock < 1 && <Text>SIN STOCK</Text>}

                    <DetailsText margin="0">{product.description}</DetailsText>

                    {product.payment.card && (
                      <PayModeContainer>
                        <CardSvg width={20} />
                        <DetailsText>{`${product.payment.card.dues} cuotas ${
                          product.payment.card.extra == 0 ? "sin interés" : ""
                        } de $${getFinalPrice(
                          product.price,
                          product.payment.card.extra,
                          product.payment.card.dues
                        )}`}</DetailsText>
                      </PayModeContainer>
                    )}

                    {product.payment.cash && (
                      <PayModeContainer>
                        <CashSvg />
                        <DetailsText>{`En efectivo ${
                          product.payment.cash.off > 0
                            ? `${product.payment.cash.off} % de descuento`
                            : `al recibirlo`
                        }`}</DetailsText>
                      </PayModeContainer>
                    )}

                    {product.payment.mercadopago && (
                      <DetailsText>🤝 Mercado pago</DetailsText>
                    )}
                    {selectsData.map(({ options, fn }) => {
                      return (
                        <Select
                          disabled={availableStock < 1 && true}
                          options={options}
                          onChangeFn={fn}
                          width="240px"
                        />
                      );
                    })}
                    {feedbackMsg && (
                      <FeedbackMessage
                        msg={feedbackMsg}
                        type="ok"
                        width="210px"
                      />
                    )}
                    {errorMsg && (
                      <FeedbackMessage
                        msg={errorMsg}
                        type="err"
                        width="210px"
                      />
                    )}
                    <StyledButton
                      onClickFn={() => handleAddToCartButton()}
                      title="Agregar al carrito"
                      width="240px"
                    />
                  </DetailsWrapper>
                </Container>
              </Fragment>
            )}
          </Media>
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
  alignItems: "center",
  display: "flex",
  flexDirection: (props) => props.flexDir,
  justifyContent: "space-evenly",
  padding: "120px 0",
  width: "90%",
});
const DetailsWrapper = styled.div({
  alignItems: (props) => props.align,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "380px",
});
const Text = styled.p({
  fontSize: (props) => props.fSize,
  fontWeight: "bold",
  margin: "8px 0",
});
const PayModeContainer = styled.div({
  alignItems: "flex-start",
  display: "flex",
  justifyContent: "flex-start",
  padding: "10px 0",
});
const DetailsText = styled.p({
  fontSize: "14px",
  margin: (props) => props.margin || "0 5px",
});
