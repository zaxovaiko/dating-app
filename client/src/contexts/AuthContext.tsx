import jwtDecode from "jwt-decode";
import { useState, createContext, ReactChild } from "react";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

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
  const alert = useAlert();
  const history = useHistory();
  const [cookie, setCookie, removeCookie] = useCookies(["auth"]);
  const [authState, setAuthState] = useState<AuthStateType>({
    token: cookie.auth || null,
    user: cookie.auth ? jwtDecode(cookie.auth) : null,
  });

  function logout() {
    setAuthState(initialState);
    removeCookie("auth");
    history.push("/login");
    alert.info("You were logged out");
  }

  function setAuth(value: AuthStateType) {
    setAuthState(value);
    setCookie("auth", "Bearer " + value.token);
    history.push("/");
    alert.info("You were logged in");
  }

  return (
    <AuthContext.Provider value={{ auth: authState, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
