import { createContext } from "react";

export const AuthDataContext = createContext();

function AuthContext({ children }) {
  let serverUrl = "http://localhost:8030";

  return (
    <AuthDataContext.Provider value={{ serverUrl }}>
      {children}
    </AuthDataContext.Provider>
  );
}

export default AuthContext;
