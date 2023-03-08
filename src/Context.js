const { createContext, useState } = require("react");

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

  const setAccessToken = (token) => {
    setToken(token);
    localStorage.setItem("ACCESS_TOKEN", token);
  };

  return (
    <Context.Provider value={{ user, setUser, token, setAccessToken }}>
      {children}
    </Context.Provider>
  );
};
