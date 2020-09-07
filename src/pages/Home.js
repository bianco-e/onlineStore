import React, { useContext, useEffect, useState } from "react";

import PageStructure from "../components/PageStructure";
import LoadingSpinner from "../components/LoadingSpinner";
import Services from "../components/Services";
import HomeBanners from "../components/HomeBanners";
import HomeNews from "../components/HomeNews";

import StyleContext from "../context/StyleContext";
import firebase from "../firebase/client.js";

export default function Home() {
  const [categories, setCategories] = useState(undefined);
  const [products, setProducts] = useState(undefined);
  const { style } = useContext(StyleContext);
  const { homeTitle } = style;

  useEffect(() => {
    firebase
      .getDocByID("categories", "categories")
      .then((cats) => setCategories(cats.categories));
    firebase.getPromotedProducts().then((prods) => setProducts(prods));
  }, []);

  return (
    <>
      {!products ? (
        <LoadingSpinner />
      ) : (
        <PageStructure title={homeTitle}>
          <Services />
          {categories && <HomeBanners categories={categories} />}
          {products && <HomeNews products={products} />}
        </PageStructure>
      )}
    </>
  );
}
