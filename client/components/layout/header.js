import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand fw-bold">D❤ting App</a>
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Chats
                </a>
              </li>
              <Link href="/settings/settings">
                <a className="nav-link">Settings</a>
              </Link>
              <Link href="/profile/profile">
                <a className="nav-link">My Profile</a>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
