import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Setup from "./pages/auth/Setup";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Switch>
      {auth.user &&
        auth.user.completeSignup && [
          <Route key={1} exact path="/" component={Home} />,
          <Route key={2} exact path="/settings" component={Settings} />,
          <Route key={3} exact path="/profile" component={Profile} />,
        ]}
      {auth.user && !auth.user.completeSignup && (
        <Route exact path="/" component={Setup} />
      )}
      {!auth.user && [
        <Route key={1} exact path={["/", "/login"]} component={Login} />,
        <Route key={2} exact path="/signup" component={Signup} />,
      ]}
      <Redirect to="/" />
    </Switch>
  );
}

export default App;
