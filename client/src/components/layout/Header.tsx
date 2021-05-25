import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function Header() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
        <div className="container">
          <Link to="/">
            <span className="navbar-brand fw-bold">D❤ting App</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {auth.user && auth.user.completeSignup && (
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link to="/">
                    <span className="nav-link active">Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/chats">
                    <span className="nav-link">Chats</span>
                  </Link>
                </li>
                <Link to="/settings">
                  <span className="nav-link">Settings</span>
                </Link>
                <Link to="/profile">
                  <span className="nav-link">Profile</span>
                </Link>
              </ul>
            )}
            {auth.user && (
              <ul className="navbar-nav ms-auto">
                <span
                  onClick={() => logout()}
                  style={{ cursor: "pointer" }}
                  className="nav-link"
                >
                  Log out
                </span>
              </ul>
            )}
            {!auth.user && (
              <ul className="navbar-nav ms-auto">
                <Link to="/login">
                  <span className="nav-link">Log in</span>
                </Link>
                <Link to="/signup">
                  <span className="btn btn-outline-light">Sign up</span>
                </Link>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
