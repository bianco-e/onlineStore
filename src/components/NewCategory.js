import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function NewCategory({ img, title }) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(title);
  }, []);

  return (
    <Container>
      <Img src={img} />
      <Input value={name} onChange={(e) => setName(e.target.value)} />
    </Container>
  );
}

const Container = styled.div({
  alignItems: "center",
  border: "1px solid #DDD",
  display: "flex",
  height: "40px",
  marginBottom: "12px",
});
const Input = styled.input({
  cursor: "pointer",
  fontSize: "14px",
  height: "100%",
  width: "190px",
});
const Img = styled.img({
  height: "100%",
  width: "45px",
});
