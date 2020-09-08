import React, { useContext } from "react";
import styled from "styled-components";

import ColorsCards from "./ColorsCards";
import FilterButton from "./FilterButton";
import IconButton from "./IconButton";
import StockCards from "./StockCards";
import StarButton from "./StarButton";
import SortButton from "./SortButton";
import TableRow from "./TableRow";

import StyleContext from "../context/StyleContext";

const headers = {
  small: ["Producto"],
  large: ["Producto", "Stock", "Precio", ""],
};

const copyProductLink = (id) => {
  const link = `${window.location.hostname}/productos/${id}`;
  navigator.clipboard.writeText(link).then(() => {});
};

export default function AllProductsViewer({
  categoriesNames,
  confirmToDeleteProduct,
  editProduct,
  filterByCategory,
  products,
  reset,
  setAllProducts,
  small,
}) {
  const { primaryColor, secondaryColor } = useContext(StyleContext).style;
  return (
    <>
      <ButtonsGroup>
        <FilterButton
          categoriesNames={categoriesNames}
          filterByCategory={filterByCategory}
          reset={reset}
        />
        <SortButton
          productsToShow={products}
          setProductsToShow={setAllProducts}
        />
      </ButtonsGroup>
      <Table>
        <THead>
          <TR bgColor={primaryColor}>
            {small
              ? headers.small.map((h) => <TD key={h}>{h}</TD>)
              : headers.large.map((h) => <TD key={h}>{h}</TD>)}
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
              prom,
              stock,
            } = product;
            return small ? (
              <TableRow
                bgColor={idx % 2 == 0 ? "#FFF" : primaryColor}
                confirmToDeleteProduct={confirmToDeleteProduct}
                copyProductLink={copyProductLink}
                editProduct={editProduct}
                key={id}
                product={product}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
              />
            ) : (
              <TR bgColor={idx % 2 == 0 ? "#FFF" : primaryColor} key={id}>
                <TD width="55%">
                  <ProductContainer>
                    <StarButton color={prom} />
                    <ThumbnailsContainer>
                      {imgs.map((img) => (
                        <ImgThumbnail src={img} />
                      ))}
                    </ThumbnailsContainer>
                    <DetailsContainer>
                      <Text color={secondaryColor} fSize="10px">
                        {category}
                      </Text>
                      <Text
                        color={idx % 2 == 0 ? primaryColor : "#FFF"}
                        fSize="14px"
                      >
                        {name}
                      </Text>
                      <ColorsCards colors={colors} />
                    </DetailsContainer>
                  </ProductContainer>
                </TD>
                <TD width="22%">
                  <StockCards stock={stock} />
                </TD>
                <TD width="15%">
                  <Text color={secondaryColor} fSize="12px">
                    {`$${price.toFixed(2)}`}
                  </Text>
                </TD>
                <TD width="8%">
                  <IconButton link onClickFn={() => copyProductLink(id)} />
                  <IconButton edit onClickFn={() => editProduct(product)} />
                  <IconButton
                    onClickFn={() => confirmToDeleteProduct(id, name)}
                  />
                </TD>
              </TR>
            );
          })}
        </TBody>
      </Table>
    </>
  );
}
const ButtonsGroup = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-evenly",
  margin: "20px 0",
  width: "100%",
});
const Table = styled.table({
  border: "1px solid #EEE",
  borderCollapse: "collapse",
  width: "100%",
});
const THead = styled.thead({
  fontWeight: "bold",
});
const TBody = styled.tbody({});
const TR = styled.tr({
  backgroundColor: (props) => props.bgColor,
});
const TD = styled.td({
  padding: "5px 0",
  position: "relative",
  textAlign: "center",
  width: (props) => props.width,
});
const Text = styled.p({
  color: (props) => props.color,
  fontSize: (props) => props.fSize,
  margin: "0",
});
const ProductContainer = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-start",
  padding: "0 10px",
});
const DetailsContainer = styled.div({
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
const ThumbnailsContainer = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-around",
  padding: "0 15px",
  width: "100px",
});
const ImgThumbnail = styled.img({
  height: "35px",
  width: "30px",
});
