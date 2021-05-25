import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Helmet>
        <title>Dating App</title>
      </Helmet>

      <div className="mx-auto">
        <h4>You need to be logged in to see the content</h4>
        <Link to="/login">Log in</Link> or <Link to="/signup">Sign up</Link>
      </div>
    </Layout>
  );
}
