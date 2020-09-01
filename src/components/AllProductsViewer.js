import React from "react";
import styled from "styled-components";
import IconButton from "./IconButton";
import ColorsCards from "./ColorsCards";
import StockCards from "./StockCards";
import StarButton from "./StarButton";
import SortButton from "./SortButton";
import FilterButton from "./FilterButton";

const tHeaders = [" ", "Producto", "Stock", "Precio", " "];

const copyProductLink = (id) => {
  // replace localhost:3000 with actual name
  const link = `https://localhost:3000/productos/${id}`;
  navigator.clipboard.writeText(link).then(() => {});
};

export default function AllProductsViewer({
  deleteProduct,
  editProduct,
  products,
  reset,
  setAllProducts,
  categoriesNames,
  filterByCategory,
}) {
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
          <TR bgColor="#FFBA9F">
            {tHeaders.map((h) => (
              <TD key={h}>{h}</TD>
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
              prom,
              stock,
            } = product;
            return (
              <TR bgColor={idx % 2 == 0 ? "#FFF" : "#FFBA9F"} key={id}>
                <TD width="5%">
                  <StarButton color={prom} />
                </TD>
                <TD width="45%">
                  <ProductContainer>
                    <ThumbnailsContainer>
                      {imgs.map((img) => (
                        <ImgThumbnail src={img} />
                      ))}
                    </ThumbnailsContainer>
                    <DetailsContainer>
                      <Text color="#777" fSize="10px">
                        {category}
                      </Text>
                      <Text
                        color={idx % 2 == 0 ? "#FFBA9F" : "#FFF"}
                        fSize="15px"
                      >
                        {name}
                      </Text>
                      <ColorsCards colors={colors} />
                    </DetailsContainer>
                  </ProductContainer>
                </TD>
                <TD width="23%">
                  <StockCards stock={stock} />
                </TD>
                <TD width="15%">{`$${price.toFixed(2)}`}</TD>
                <TD width="12%">
                  <IconButton link onClickFn={() => copyProductLink(id)} />
                  <IconButton edit onClickFn={() => editProduct(product)} />
                  <IconButton onClickFn={() => deleteProduct(id)} />
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
  margin: "5px 0",
  width: "100%",
});
const Table = styled.table({
  border: "1px solid #EEE",
  borderCollapse: "collapse",
  width: "100%",
});
const THead = styled.thead({});
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
const ThumbnailsContainer = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  paddingRight: "40px",
  width: "110px",
});
const ImgThumbnail = styled.img({
  height: "35px",
  width: "30px",
});
const Text = styled.p({
  color: (props) => props.color,
  fontSize: (props) => props.fSize,
  margin: "0 0 2px 0",
});
const ProductContainer = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-start",
});
const DetailsContainer = styled.div({
  alignItems: "flex-start",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});
