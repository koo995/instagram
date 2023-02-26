import React, { createContext, useReducer } from "react";

const initialState = {
  jwtAccessToken: "",
};

const AppContext = createContext();

const reducer = (prevState, action) => {
  //TODO:...
  return prevState;
};

const AppProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
