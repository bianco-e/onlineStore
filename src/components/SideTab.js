import React, { useContext, useEffect } from "react";
import styled from "styled-components";

import CloseButton from "./CloseButton";

import StyleContext from "../context/StyleContext";

export default function SideTab({ children, setShowTab, showTab, side }) {
  const { style } = useContext(StyleContext);
  const { primaryColor } = style;

  useEffect(() => {
    showTab && document.addEventListener("click", handleTab);
    return () => {
      document.removeEventListener("click", handleTab);
    };
  }, [showTab]);

  const sides = {
    right: {
      buttonCorner: "left",
      jContent: "flex-start",
    },
    left: {
      buttonCorner: "right",
      jContent: "center",
    },
  };

  const handleTab = () => setShowTab(!showTab);

  return (
    <Wrapper
      bgColor={primaryColor}
      jContent={sides[side].jContent}
      left={side == "left" ? "0" : undefined}
      right={side == "right" ? "0" : undefined}
    >
      <CloseButton
        onClickFn={() => handleTab()}
        corner={sides[side].buttonCorner}
      />
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  backgroundColor: (props) => props.bgColor,
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  justifyContent: (props) => props.jContent,
  padding: "15px",
  position: "fixed",
  left: (props) => props.left,
  right: (props) => props.right,
  top: "0",
  width: "35%",
  zIndex: "10",
});
