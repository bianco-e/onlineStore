import React, { Fragment, useRef, useState } from "react";
import styled from "styled-components";
import Media from "react-media";

import BottomBar from "../components/BottomBar";
import PageTitle from "../components/PageTitle";
import TopBar from "../components/TopBar";
import WhatsappFloatButton from "../components/WhatsappFloatButton";

import useScrollPosition from "../hooks/useScrollPosition";

export default function PageStructure({ children, title }) {
  const [floatButtonVisibility, setFloatButtonVisibility] = useState("visible");
  const navRef = useRef();
  const wspButtonRef = useRef();

  useScrollPosition(
    ({ currPos }) => {
      if (Math.abs(currPos.y) >= navRef.current.getBoundingClientRect().y)
        setFloatButtonVisibility("hidden");
      else setFloatButtonVisibility("visible");
    },
    [floatButtonVisibility],
    wspButtonRef
  );

  return (
    <Wrapper>
      <Media
        queries={{
          small: "(max-width: 550px)",
        }}
      >
        {({ small }) => (
          <Fragment>
            <TopBar />
            {title && <PageTitle text={title} />}
            {children}
            <BottomBar reference={navRef} />

            <WhatsappFloatButton
              reference={wspButtonRef}
              visibility={small ? floatButtonVisibility : "visible"}
            />
          </Fragment>
        )}
      </Media>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  position: "relative",
  width: "100%",
});
