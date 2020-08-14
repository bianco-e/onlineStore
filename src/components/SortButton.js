import React from "react";
import styled from "styled-components";

export default function SortButton({ productsToShow, setProductsToShow }) {
  const selectOptions = [
    { val: "Ordenar", fn: () => {} },
    {
      val: "Precio: Mayor a menor",
      fn: () =>
        setProductsToShow(
          [...productsToShow].sort((a, b) => b.price - a.price)
        ),
    },
    {
      val: "Precio: Menor a mayor",
      fn: () =>
        setProductsToShow(
          [...productsToShow].sort((a, b) => a.price - b.price)
        ),
    },
    {
      val: "A - Z",
      fn: () =>
        setProductsToShow(
          [...productsToShow].sort(
            (a, b) => a.name.toUpperCase() > b.name.toUpperCase()
          )
        ),
    },
    {
      val: "Z - A",
      fn: () =>
        setProductsToShow(
          [...productsToShow].sort(
            (a, b) => a.name.toUpperCase() < b.name.toUpperCase()
          )
        ),
    },
    {
      val: "Más reciente primero",
      fn: () => {
        // CUANDO TENGA LA DATE DE SUBIDA EN UNA PROPIEDAD COMPARAR CON ESO
      },
    },
  ];

  const handleSelect = (e) => {
    const selectedOption = selectOptions.find(
      (opt) => opt.val === e.target.value
    );
    return selectedOption.fn();
  };

  return (
    <Select onChange={(e) => handleSelect(e)}>
      {selectOptions.map((opt) => {
        return (
          <option key={opt.val} value={opt.val}>
            {opt.val}
          </option>
        );
      })}
    </Select>
  );
}

const Select = styled.select({
  border: "1px solid black",
  borderRadius: "9999px",
  backgroundColor: "transparent",
  cursor: "pointer",
  fontSize: "15px",
  padding: "8px 30px",
  position: "absolute",
  right: "25px",
  bottom: "35%",
  textAlign: "center",
  mozAppearance: "none",
  webkitAppearance: "none",
  appearance: "none",
});
