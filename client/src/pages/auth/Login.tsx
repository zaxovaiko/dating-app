import { Helmet } from "react-helmet-async";
import validator from "validator";
import { Link } from "react-router-dom";
import { SyntheticEvent, useContext, useState } from "react";
import { useAlert } from "react-alert";
import Layout from "../../components/layout/Layout";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const alert = useAlert();
  const { loginAndSetAuth } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const { email, password } = form;
    if (!validator.isEmail(email) || validator.isEmpty(password)) {
      return alert.error("Invalid data");
    }

    loginAndSetAuth(form);
  }

  return (
    <Layout>
      <Helmet>
        <title>Log in</title>
      </Helmet>

      <form className="align-self-center" onSubmit={handleSubmit}>
        <h4 className="mb-4 text-center">Log in</h4>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            type="email"
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={form.password}
            onChange={(e) =>
              setForm((p) => ({ ...p, password: e.target.value }))
            }
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <Link to="/signup">Sign up</Link>
        <button className="btn btn-danger float-end">Log in</button>
      </form>
    </Layout>
  );
}
