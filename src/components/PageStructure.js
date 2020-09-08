import React, { Fragment, useRef, useState } from "react";
import styled from "styled-components";
import Media from "react-media";

import BottomBar from "../components/BottomBar";
import PageTitle from "../components/PageTitle";
import TopBar from "../components/TopBar";
import WhatsappFloatButton from "../components/WhatsappFloatButton";

import useScrollPosition from "../hooks/useScrollPosition";

export default function PageStructure({ children, title }) {
  const [showFloatButton, setShowFloatButton] = useState(true);
  const barRef = useRef();

  useScrollPosition(
    ({ currPos }) => {
      if (Math.abs(currPos.y) >= barRef.current.getBoundingClientRect().top)
        setShowFloatButton(false);
      else setShowFloatButton(true);
    },
    [showFloatButton]
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
            <BottomBar reference={barRef} />
            {!(!showFloatButton && small) && <WhatsappFloatButton />}
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
