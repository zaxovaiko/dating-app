import { Helmet } from "react-helmet-async";
import validator from "validator";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { SyntheticEvent, useContext, useState } from "react";
import { useAlert } from "react-alert";
import Layout from "../../components/layout/Layout";
import { AuthContext } from "../../contexts/AuthContext";
import { login } from "../../api/auth";

export default function Login() {
  const alert = useAlert();
  const { setAuth } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const { email, password } = form;
    if (!validator.isEmail(email) || validator.isEmpty(password)) {
      return alert.error("Invalid data");
    }

    login(form)
      .then((data) => {
        if (!data.access_token) {
          return alert.error("Something went wrong. Try again later.");
        }
        setAuth({
          user: jwtDecode(data.access_token),
          token: data.access_token,
        });
      })
      .catch(() => {
        alert.error("Something went wrong");
      });
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
