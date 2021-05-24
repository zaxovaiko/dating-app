import { Link } from "react-router-dom";

export default function Header() {
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
          </div>
        </div>
      </nav>
    </header>
  );
}
