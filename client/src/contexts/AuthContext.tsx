import jwtDecode from "jwt-decode";
import validator from "validator";
import { useState, createContext, ReactChild } from "react";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { login, refreshToken, signup } from "../api/auth";

type AuthState = {
  token: string | null;
  user: any;
};

type UserCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const initialState: AuthState = {
  token: null,
  user: null,
};

export const AuthContext = createContext<AuthState | any>(initialState);

export default function AuthContextProvider({
  children,
}: {
  children: ReactChild;
}) {
  const alert = useAlert();
  const history = useHistory();
  const [cookie, setCookie, removeCookie] = useCookies(["auth"]);
  const [authState, setAuthState] = useState<AuthState>({
    token: cookie.auth || null,
    user: cookie.auth ? jwtDecode(cookie.auth) : null,
  });

  function logoutAndSetAuth() {
    setAuthState(initialState);
    removeCookie("auth");
    history.push("/login");
    alert.info("You were logged out");
  }

  function refreshAndSetAuth() {
    return refreshToken(authState.token || "")
      .then((data) => setAuth(data.access_token, "Information were updated"))
      .catch(() => alert.error("Something went wrong"));
  }

  function setAuth(token: string, message = "You were logged in") {
    if (!validator.isJWT(token)) {
      return alert.error("Bad token");
    }
    setAuthState({
      token: "Bearer " + token,
      user: jwtDecode(token),
    });
    setCookie("auth", "Bearer " + token);
    history.push("/");
    alert.info(message);
  }

  function signupAndSetAuth({
    firstName,
    lastName,
    email,
    password,
  }: Partial<UserCredentials>) {
    return signup({ firstName, lastName, email, password })
      .then((data) => setAuth(data.access_token))
      .catch(() => alert.error("Something went wrong"));
  }

  function loginAndSetAuth({ email, password }: Partial<UserCredentials>) {
    return login({ email, password })
      .then((data) => setAuth(data.access_token))
      .catch(() => alert.error("Something went wrong"));
  }

  return (
    <AuthContext.Provider
      value={{
        auth: authState,
        setAuth,
        logoutAndSetAuth,
        refreshAndSetAuth,
        loginAndSetAuth,
        signupAndSetAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
