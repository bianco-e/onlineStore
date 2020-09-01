import React from "react";
import Select from "./Select";

export default function FilterButton({
  categoriesNames,
  filterByCategory,
  reset,
}) {
  const filterTitle = [{ val: "Filtrar por categoría", fn: () => {} }];
  const filterClean = { val: "Limpiar filtro", fn: () => reset() };

  const getCategories = () => {
    return filterTitle
      .concat(
        categoriesNames.map((cat) => {
          return { val: cat, fn: () => filterByCategory(cat) };
        })
      )
      .concat(filterClean);
  };

  const handleSelect = (e) => {
    const selectedOption = getCategories().find(
      (opt) => opt.val === e.target.value
    );
    return selectedOption.fn();
  };

  return <Select options={getCategories()} onChangeFn={handleSelect} />;
}
