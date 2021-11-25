import { createContext, useContext, useState } from "react";

const LoggedInContext = createContext();

export const useLoggedInContext = () => {
  return useContext(LoggedInContext);
};

const LoggedInProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider
      value={{ loggedIn: loggedIn, setLoggedIn: setLoggedIn }}
    >
      {children}
    </LoggedInContext.Provider>
  );
};

export default LoggedInProvider;
