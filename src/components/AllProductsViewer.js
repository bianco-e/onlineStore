import React from "react";
import styled from "styled-components";
import IconButton from "./IconButton";
import ColorsCards from "./ColorsCards";
import StarButton from "./StarButton";

const tHeaders = [" ", "Producto", "Stock", "Precio", " "];

const showStock = (stock) => {
  var string = "";
  for (let prop in stock) {
    string += ` ${!stock[prop] ? 0 : stock[prop]} ${prop} |`;
  }
  return string;
};

export default function AllProductsViewer({
  deleteProduct,
  editProduct,
  products,
}) {
  return (
    <Table>
      <THead>
        <TR bgColor="#FFBA9F">
          {tHeaders.map((h) => (
            <TD>{h}</TD>
          ))}
        </TR>
      </THead>
      <TBody>
        {products.map((product, idx) => {
          const {
            category,
            colors,
            id,
            imgs,
            name,
            price,
            promo,
            stock,
          } = product;
          return (
            <TR bgColor={idx % 2 == 0 ? "#FFF" : "#FFBA9F"} key={id}>
              <TD width="5%"></TD>
              <TD width="45%">
                {imgs.map((img) => (
                  <ImgThumbnail src={img} />
                ))}
                <Text color="#777" fSize="8px">
                  {category}
                </Text>
                <Text color={idx % 2 == 0 ? "#FFBA9F" : "#FFF"} fSize="12px">
                  {name}
                </Text>
                <ColorsCards colors={colors} />
              </TD>
              <TD width="25%">{showStock(stock)}</TD>
              <TD width="15%">{`$${price.toFixed(2)}`}</TD>
              <TD width="10%">
                <StarButton color={promo} onClickFn={() => {}} />
                <IconButton edit onClickFn={() => editProduct(product)} />
                <IconButton onClickFn={() => deleteProduct(id)} />
              </TD>
            </TR>
          );
        })}
      </TBody>
    </Table>
  );
}

const Table = styled.table({
  border: "1px solid #EEE",
  borderRadius: "10px",
  width: "100%",
});
const THead = styled.thead({});
const TBody = styled.tbody({});
const TR = styled.tr({
  backgroundColor: (props) => props.bgColor,
});
const TD = styled.td({
  position: "relative",
  textAlign: "center",
  width: (props) => props.width,
});
const ImgThumbnail = styled.img({
  height: "25px",
  width: "25px",
});
const Text = styled.p({
  color: (props) => props.color,
  fontSize: (props) => props.fSize,
});
