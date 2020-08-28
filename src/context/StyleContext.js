import React, { useEffect, useState } from "react";
import firebase from "../firebase/client.js";

const StyleContext = React.createContext({});

export const StyleContextProvider = ({ children }) => {
  const [style, setStyle] = useState({});
  useEffect(() => {
    firebase
      .getDocByID("stylesheet", "style")
      .then((stylesheet) => setStyle(stylesheet));
  }, []);

  return (
    <StyleContext.Provider value={{ style, setStyle }}>
      {children}
    </StyleContext.Provider>
  );
};

export default StyleContext;
