import React from "react";
import Select from "./Select";

export default function FilterButton({ categoriesNames, filterByCategory }) {
  const filterOptions = [{ val: "Filtrar por categoría", fn: () => {} }];

  const getCategories = () => {
    return filterOptions.concat(
      categoriesNames.map((cat) => {
        return { val: cat, fn: () => filterByCategory(cat) };
      })
    );
  };

  const handleSelect = (e) => {
    const selectedOption = getCategories().find(
      (opt) => opt.val === e.target.value
    );
    return selectedOption.fn();
  };

  return <Select options={getCategories()} onChangeFn={handleSelect} />;
}
