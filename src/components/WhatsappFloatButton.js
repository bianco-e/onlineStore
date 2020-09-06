import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import Media from "react-media";

import WhatsappSvg from "./svg/WhatsappSvg";

import StyleContext from "../context/StyleContext";

export default function WhatsappFloatButton() {
  const { style } = useContext(StyleContext);
  const { whatsapp } = style;
  const [buttonDisplay, setButtonDisplay] = useState("visible");

  const buttonRef = useRef();

  /* useEffect(() => {
    buttonRef.current?.offsetTop >= document.body.scrollHeight + 46
      ? setButtonDisplay("hidden")
      : setButtonDisplay("visible");
  }); */

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
            <FloatButton
              visibility={buttonDisplay}
              ref={buttonRef}
              href={`http://wa.me/${whatsapp}`}
            >
              <WhatsappSvg fill="white" width={22} />
            </FloatButton>
          </Fragment>
        )}
      </Media>
    </>
  );
}

const FloatButton = styled.a({
  backgroundColor: "#4dc247",
  border: "0",
  borderRadius: "50%",
  boxShadow: "0 0 5px rgba(0, 0, 0, .4)",
  bottom: "30px",
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  padding: "12px",
  position: "fixed",
  right: "30px",
  visibility: (props) => props.visibility,
  ["&:hover"]: {
    boxShadow: "0 0 8px rgba(0, 0, 0, .6)",
  },
});
