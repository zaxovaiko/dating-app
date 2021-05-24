import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/settings/Settings";
import Profile from "./pages/profile/Profile";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Setup from "./pages/auth/Setup";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/signup" component={Signup} />
        <Route exact={true} path="/setup" component={Setup} />
        <Route exact={true} path="/settings" component={Settings} />
        <Route exact={true} path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
