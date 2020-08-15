import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AdminPanel from "../components/AdminPanel";
import NewCategory from "../components/NewCategory";
import { categories } from "../data/data.js";
import addPhoto from "../images/photo.png";

export default function AdminCategories() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    setCats(categories);
  }, []);

  const handleAddCat = () => {
    setCats(cats.concat([{ img: addPhoto, title: "Agregar nombre" }]));
  };

  return (
    <Wrapper>
      <AdminPanel />
      <Container>
        <Header>
          <Title>Categorías</Title>
          <Button onClick={() => handleAddCat()}>✙ Agregar categoría</Button>
        </Header>
        {cats.map(({ img, title }) => {
          return <NewCategory key={title} img={img} title={title} />;
        })}
        <Button>GUARDAR</Button>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  alignItems: "flex-start",
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});
const Title = styled.h2({});
const Container = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "90%",
});
const Header = styled.section({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  width: "90%",
});
const Button = styled.button({
  border: "1px solid #FFA07A",
  borderRadius: "10px",
  backgroundColor: "#FFA07A",
  color: "white",
  cursor: "pointer",
  fontSize: "11px",
  padding: "8px 20px",
  transition: "background-color .6s ease",
  transition: "all .6s ease",
  ["&:hover"]: {
    backgroundColor: "rgba(250, 250, 250, .7)",
    border: "1px solid #FFA07A",
    color: "#FFA07A",
  },
});
