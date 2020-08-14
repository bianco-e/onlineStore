import React, { useState } from "react";
import styled from "styled-components";

import prueba1 from "../images/prueba1.png";

import Button from "./Button";
import SearchAndMenu from "./SearchAndMenu";
import SideCartModal from "./SideCartModal";

export default function TopBar() {
  const [showCartModal, setShowCartModal] = useState(false);
  return (
    <Wrapper>
      {showCartModal && (
        <SideCartModal
          showModal={showCartModal}
          setShowModal={setShowCartModal}
        />
      )}
      <Container>
        <SearchAndMenu />
      </Container>
      <Container>
        <Link href="/#">
          <Image src={prueba1} />
        </Link>
      </Container>
      <Container>
        <Button fn={() => setShowCartModal(!showCartModal)}>🛍</Button>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  backgroundColor: "#FFA07A",
  display: "flex",
  justifyContent: "space-between",
  padding: "5px 0",
  position: "fixed",
  top: "0",
  width: "100%",
  zIndex: "5",
});
const Image = styled.img({
  borderRadius: "50%",
  height: "50px",
  width: "50px",
});
const Container = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  width: "33%",
});
const Link = styled.a({});
