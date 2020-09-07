import React, { Fragment } from "react";
import styled from "styled-components";
import Media from "react-media";

import AdminPanel from "../components/AdminPanel";
import AdminTopBar from "../components/AdminTopBar";
import AdminHome from "../components/AdminHome";

export default function Admin({ Child }) {
  return (
    <Wrapper>
      <Media
        queries={{
          small: "(max-width: 500px)",
          medium: "(min-width: 501px) and (max-width: 780px)",
        }}
      >
        {({ small, medium }) => (
          <Fragment>
            {small ? (
              <AdminTopBar>
                <AdminPanel direction="row" />
              </AdminTopBar>
            ) : (
              <>
                <AdminPanel direction="column" />
                <AdminTopBar />
              </>
            )}
            <Container margin={small ? "50px 0 0 0" : "50px 10px 0 190px"}>
              {Child ? <Child /> : <AdminHome />}
            </Container>
          </Fragment>
        )}
      </Media>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "flex-start",
  display: "flex",
  justifyContent: "flex-start",
  minHeight: "100vh",
  width: "100%",
});
const Container = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  margin: (props) => props.margin,
  minHeight: "100vh",
  position: "relative",
  width: "100%",
});
