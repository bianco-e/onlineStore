import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import Select from "./Select";
import StyledButton from "./StyledButton";

import StyleContext from "../context/StyleContext";
import CartContext from "../context/CartContext";

export default function BuyingProductThumbnail({ product, setShowBuying }) {
  const [availableStock, setAvailableStock] = useState(undefined);
  const [color, setColor] = useState(undefined);
  const [size, setSize] = useState(undefined);
  const { style } = useContext(StyleContext);
  const { primaryColor } = style;
  const { addProductToCart } = useContext(CartContext);

  useEffect(() => {
    setAvailableStock(
      product.stock
        .map((option) => option.items)
        .reduce((acc, current) => parseInt(acc) + parseInt(current))
    );
  }, []);

  const selectColor = (e) => setColor(e.target.value);
  const selectSize = (e) => setSize(e.target.value);

  const handleAddToCartButton = () => {
    if (color && color != "Color" && size && size != "Color") {
      addProductToCart({ ...product, color, size, img: product.imgs[0] });
      setShowBuying(false);
    }
  };

  return (
    <Wrapper primary={primaryColor}>
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
          product.stock
            .filter((opt) => opt.items != 0)
            .map((opt) => {
              return { val: opt.size };
            })
        )}
        onChangeFn={selectSize}
      />
      <StyledButton title="Agregar" onClickFn={() => handleAddToCartButton()} />
    </Wrapper>
  );
}

const Wrapper = styled.div({
  background: "rgba(250, 250, 250, 0.7)",
  border: (props) => `1px solid ${props.primary}`,
  borderRadius: "10px",
  display: "flex",
  height: "160px",
  flexDirection: "column",
  justifyContent: "space-around",
  padding: "10px 15px",
  position: "absolute",
  top: "15px",
});
