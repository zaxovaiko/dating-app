import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Setup from "./pages/auth/Setup";
import { AuthContext } from "./contexts/AuthContext";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="d-flex flex-column h-100">
      <Header />

      <main className="d-flex flex-column flex-grow-1 container justify-content-center">
        <Switch>
          {auth.user &&
            auth.user.completeSignup && [
              <Route key={1} exact path="/" component={Home} />,
              <Route key={2} path="/settings" component={Settings} />,
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
      </main>

      <Footer />
    </div>
  );
}

export default App;
