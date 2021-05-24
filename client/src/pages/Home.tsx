import { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <Layout>
      <Helmet>
        <title>Dating App</title>
      </Helmet>

      <main className="mx-auto">
        <h4>You need to be logged in to see the content</h4>
        <Link to="/auth/login">Log in</Link> or{" "}
        <Link to="/auth/signup">Sign up</Link>
      </main>
    </Layout>
  );
}
