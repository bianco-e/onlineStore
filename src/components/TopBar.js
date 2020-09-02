import React, { useContext, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import SearchAndMenu from "./SearchAndMenu";
import SideCartModal from "./SideCartModal";
import { useHistory } from "react-router-dom";

import StyleContext from "../context/StyleContext";
import BagSvg from "./svg/BagSvg";

export default function TopBar() {
  const [showCartModal, setShowCartModal] = useState(false);
  const { style } = useContext(StyleContext);
  const { storeLogo, primaryColor, secondaryColor } = style;

  const history = useHistory();

  return (
    <Wrapper primary={primaryColor}>
      {showCartModal && (
        <SideCartModal
          showModal={showCartModal}
          setShowModal={setShowCartModal}
        />
      )}
      <Container>
        <SearchAndMenu secondaryColor={secondaryColor} />
      </Container>
      <Container>
        <Button fn={() => history.push("/#")}>
          <Image src={storeLogo} />
        </Button>
      </Container>
      <Container>
        <Button fn={() => setShowCartModal(!showCartModal)}>
          <BagSvg fill={secondaryColor} height={25} width={27} />
        </Button>
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
