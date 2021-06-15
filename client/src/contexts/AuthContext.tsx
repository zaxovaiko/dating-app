import jwtDecode, { JwtPayload } from "jwt-decode";
import validator from "validator";
import { useState, createContext, ReactChild, useEffect } from "react";
import { useAlert } from "react-alert";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { login, refreshToken, signup } from "../api/auth";
import { IAuthContext, AuthState, UserCredentials } from "../types/context";

export const initialState: AuthState = {
  token: null,
  user: null,
};

export const AuthContext = createContext<IAuthContext>({
  auth: initialState,
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactChild;
}) {
  const alert = useAlert();
  const history = useHistory();
  const [cookie, setCookie, removeCookie] = useCookies(["jwt_token"]);
  const [authState, setAuthState] = useState<AuthState>({
    token: cookie.jwt_token,
    user: cookie.jwt_token ? jwtDecode(cookie.jwt_token) : null,
  });

  useEffect(() => {
    checkJWTExpirationDate(authState.token);
  }, []);

  function checkJWTExpirationDate(token: string | null): void {
    if (!token) {
      return;
    }
    const { exp } = jwtDecode(cookie.jwt_token) as JwtPayload;
    if (Date.now() >= (exp as number) * 1000) {
      logoutAndSetAuth();
    }
  }

  function logoutAndSetAuth() {
    setAuthState(initialState);
    removeCookie("jwt_token");
    history.push("/login");
    alert.info("You were logged out");
  }

  function refreshAndSetAuth() {
    return refreshToken(authState.token || "")
      .then((data) =>
        setAuth(data.access_token, "Information were updated", false)
      )
      .catch(() => alert.error("Something went wrong"));
  }

  function setAuth(
    token: string,
    message: string = "You were logged in",
    redirect: boolean = true
  ) {
    if (!validator.isJWT(token)) {
      return alert.error("Bad token");
    }
    const { exp, ...rest } = jwtDecode(token) as any;
    setAuthState({
      token: "Bearer " + token,
      user: rest,
    });
    setCookie("jwt_token", "Bearer " + token, {
      expires: new Date(exp * 1000),
    });
    if (redirect) {
      history.push("/");
    }
    alert.info(message);
  }

  function signupAndSetAuth({
    firstName,
    lastName,
    email,
    password,
  }: Partial<UserCredentials>) {
    return signup({ firstName, lastName, email, password })
      .then((data) => {
        if (data.access_token) {
          return setAuth(data.access_token);
        }
        alert.error(data.message);
      })
      .catch((err) => {
        console.log(err);
        alert.error("Something went wrong");
      });
  }

  function loginAndSetAuth({ email, password }: Partial<UserCredentials>) {
    return login({ email, password })
      .then((data) => {
        if (data.access_token) {
          return setAuth(data.access_token);
        }
        alert.error(data.message);
      })
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
