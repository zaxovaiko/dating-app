import { useState, createContext } from "react";

export const initialState = {
  token: null,
  user: null,
};

export const AuthContext = createContext(initialState);

export default function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState(initialState);
  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  );
}
