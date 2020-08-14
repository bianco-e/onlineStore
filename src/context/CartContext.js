import React, { useState } from "react";

const Context = React.createContext([]);

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addProductToCart = (product) => {
    setCart([...cart, product]);
  };
  const removeProductFromCart = (product) => {
    const filteredCart = cart.filter(
      (prodOnCart) => prodOnCart.id !== product.id
    );
    setCart(filteredCart);
  };

  return (
    <Context.Provider value={{ cart, addProductToCart, removeProductFromCart }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
