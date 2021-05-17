import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

export default function Signup() {
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>Sign up</title>
      </Head>

      <form className="align-self-center py-5">
        <h4 className="mb-3 fw-bolder">Create profile</h4>
        <div className="row g-3 mb-3">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input type="text" id="firstName" className="form-control" />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input type="text" id="lastName" className="form-control" />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password confirmation
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <button
          type="button"
          className="btn btn-outline-danger float-end"
          onClick={() => router.push("/auth/setup")}
        >
          Continue
        </button>
      </form>
    </Layout>
  );
}
