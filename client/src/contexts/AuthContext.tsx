import { useState, createContext, ReactChild } from "react";

type AuthStateType = {
  token: string | null;
  user: any;
};

export const initialState: AuthStateType = {
  token: null,
  user: null,
};

export const AuthContext = createContext<AuthStateType | any>(initialState);

export default function AuthContextProvider({
  children,
}: {
  children: ReactChild;
}) {
  const [authState, setAuthState] = useState<AuthStateType>(initialState);
  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
}
