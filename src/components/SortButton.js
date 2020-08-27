import React from "react";
import Select from "./Select";

export default function SortButton({ productsToShow, setProductsToShow }) {
  const sortOptions = [
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
  ];

  const handleSelect = (e) => {
    const selectedOption = sortOptions.find(
      (opt) => opt.val === e.target.value
    );
    return selectedOption.fn();
  };

  return (
    <Select
      onChangeFn={handleSelect}
      options={sortOptions}
      pos={{ name: "absolute", bottom: "35%", right: "25px" }}
    />
  );
}
