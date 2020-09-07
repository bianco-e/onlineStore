import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Media from "react-media";

import LogOutSvg from "./svg/LogOutSvg";

import { getRGBAFromHex } from "../utils/utils.js";
import StyleContext from "../context/StyleContext";
import AdminContext from "../context/AdminContext";

export default function AdminTopBar({ children }) {
  const history = useHistory();
  const { style } = useContext(StyleContext);
  const { primaryColor, secondaryColor } = style;
  const { logout } = useContext(AdminContext);

  return (
    <>
      <Media
        queries={{
          small: "(max-width: 500px)",
          medium: "(min-width: 501px) and (max-width: 780px)",
        }}
      >
        {({ small, medium }) => (
          <Fragment>
            {primaryColor && (
              <Wrapper
                bgColor={small ? getRGBAFromHex(primaryColor) : primaryColor}
              >
                <Container>{children}</Container>
                <Button
                  onClick={() => {
                    history.push("/");
                    logout();
                  }}
                  secondary={secondaryColor}
                >
                  <LogOutSvg />
                </Button>
              </Wrapper>
            )}
          </Fragment>
        )}
      </Media>
    </>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  backgroundColor: (props) => props.bgColor,
  display: "flex",
  justifyContent: "space-between",
  right: "0",
  padding: "5px",
  position: "fixed",
  top: "0",
  width: "100%",
  zIndex: "5",
});
const Container = styled.div({
  position: "relative",
  width: "85%",
});
const Button = styled.button({
  background: "none",
  border: "0",
  cursor: "pointer",
  zIndex: "6",
});
