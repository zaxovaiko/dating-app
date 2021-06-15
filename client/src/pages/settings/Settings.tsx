import { Link, Switch, Route } from "react-router-dom";
import Information from "./sub/Information";
import Main from "./sub/Main";

export default function Settings() {
  return (
    <div className="row mb-0 pt-4 flex-grow-1">
      <div className="col-12 col-md-4 mb-3">
        <div className="list-group">
          <Link
            to="/settings"
            className="list-group-item list-group-item-action"
          >
            Main settings
          </Link>
          <Link
            to="/settings/info"
            className="list-group-item list-group-item-action"
          >
            Change information
          </Link>
        </div>
      </div>
      <div className="col-12 col-md-8">
        <Switch>
          <Route path="/settings" exact component={Main} />
          <Route path="/settings/info" exact component={Information} />
        </Switch>
      </div>
    </div>
  );
}
