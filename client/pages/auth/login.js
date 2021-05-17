import Head from "next/head";
import Layout from "../../components/layout";

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Log in</title>
      </Head>

      <form className="align-self-center">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button className="btn btn-danger float-end">Log in</button>
      </form>
    </Layout>
  );
}
