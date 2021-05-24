import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-light py-3">
      <div className="container">
        <Link to="/">
          <span className="text-decoration-none link-dark">Github</span>
        </Link>
        <p className="float-end mb-0 text-muted">2021</p>
      </div>
    </footer>
  );
}
