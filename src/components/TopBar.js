import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import SearchAndMenu from "./SearchAndMenu";
import SideCartModal from "./SideCartModal";

import StyleContext from "../context/StyleContext";

export default function TopBar() {
  const [showCartModal, setShowCartModal] = useState(false);
  const { style } = useContext(StyleContext);
  const { storeLogo, primaryColor } = style;
  const navRef = useRef();

  console.log(navRef.current);

  return (
    <Wrapper primary={primaryColor} ref={navRef}>
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
          <Image src={storeLogo} />
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
  backgroundColor: (props) => props.primary,
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
