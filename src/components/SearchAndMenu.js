import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import SideMenuModal from "./SideMenuModal";

export default function SearchAndMenu() {
  const [showSideMenu, setShowSideMenu] = useState(false);
  return (
    <>
      {showSideMenu && (
        <SideMenuModal
          showModal={showSideMenu}
          setShowModal={setShowSideMenu}
        />
      )}
      <Button fn={() => setShowSideMenu(!showSideMenu)}>≡</Button>
      <SearchInput placeholder="Buscar" />
    </>
  );
}
const SearchInput = styled.input({
  borderRadius: "9999px",
  backgroundColor: "transparent",
  border: "1px solid black",
  padding: "5px 12px",
  width: "60%",
});
