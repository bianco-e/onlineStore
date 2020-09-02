import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Button from "./Button";
import SideMenuModal from "./SideMenuModal";
import StyledInput from "./StyledInput";
import MenuIcon from "./svg/MenuIcon";

export default function SearchAndMenu({ secondaryColor }) {
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
      <Button fn={() => setShowSideMenu(!showSideMenu)}>
        <MenuIcon fill={secondaryColor} />
      </Button>
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

const Container = styled.div({
  alignItems: "center",
  display: "flex",
});
