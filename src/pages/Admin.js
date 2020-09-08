import React, { Fragment, useState } from "react";
import styled from "styled-components";
import Media from "react-media";

import AdminPanel from "../components/AdminPanel";
import AdminTopBar from "../components/AdminTopBar";
import AdminHome from "../components/AdminHome";
import SideTab from "../components/SideTab";

export default function Admin({ Child }) {
  const [showSidePanel, setShowSidePanel] = useState(false);
  return (
    <Wrapper>
      <Media
        queries={{
          small: "(max-width: 550px)",
          medium: "(min-width: 551px) and (max-width: 780px)",
        }}
      >
        {({ small, medium }) => (
          <Fragment>
            <AdminTopBar
              menuIcon={small ? true : false}
              showTab={() => setShowSidePanel(true)}
            />
            {small ? (
              <>
                {showSidePanel && (
                  <SideTab
                    bgColor="rgba(250, 250, 250, 0.5)"
                    setShowTab={setShowSidePanel}
                    showTab={showSidePanel}
                    side="left"
                  >
                    <AdminPanel buttonsHoverColor="#FFF" />
                  </SideTab>
                )}
              </>
            ) : (
              <>
                <AdminPanel />
              </>
            )}
            <Container margin={small ? "50px 0 0 0" : "50px 10px 0 190px"}>
              {Child ? <Child small={small} /> : <AdminHome />}
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
