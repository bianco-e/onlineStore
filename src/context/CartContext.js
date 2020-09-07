import React, { useEffect, useState } from "react";

const Context = React.createContext([]);

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    cart.length &&
      setTotal(
        `$${cart
          .map((item) => item.price)
          .reduce((acc, current) => acc + current)
          .toFixed(2)}`
      );
  }, [cart]);

  const addProductToCart = (product) => {
    setCart(cart.concat(product));
  };
  const removeProductFromCart = (product) => {
    const filteredCart = cart.filter(
      (prodOnCart) => prodOnCart.id !== product.id
    );
    setCart(filteredCart);
  };

  return (
    <Context.Provider
      value={{ cart, addProductToCart, removeProductFromCart, total }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
