import React, { useState } from "react";
import Button from "./Button";
import SideMenuModal from "./SideMenuModal";
import StyledInput from "./StyledInput";
import { useHistory } from "react-router-dom";

export default function SearchAndMenu() {
  const history = useHistory();
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const onChangeInputFn = (e) => setSearchValue(e.target.value);

  const handleSearch = () => history.push(`/busqueda/${searchValue}`);

  return (
    <>
      {showSideMenu && (
        <SideMenuModal
          showModal={showSideMenu}
          setShowModal={setShowSideMenu}
        />
      )}
      <Button fn={() => setShowSideMenu(!showSideMenu)}>≡</Button>
      <StyledInput
        ph="Búsqueda"
        val={searchValue}
        onChangeFn={onChangeInputFn}
        OKD={handleSearch}
        width={"55%"}
      />
    </>
  );
}
