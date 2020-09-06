import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "./Button";
import SideMenu from "./SideMenu";
import SideTab from "./SideTab";
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
        <SideTab
          showTab={showSideMenu}
          setShowTab={setShowSideMenu}
          side="left"
        >
          <SideMenu />
        </SideTab>
      )}
      <Button fn={() => setShowSideMenu(!showSideMenu)}>
        <MenuIcon fill={secondaryColor} />
      </Button>
      <StyledInput
        ph="Buscar"
        val={searchValue}
        onChangeFn={onChangeInputFn}
        OKD={handleSearch}
        width={"60%"}
      />
    </>
  );
}
