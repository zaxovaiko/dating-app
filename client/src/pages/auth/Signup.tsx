import validator from "validator";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { SyntheticEvent } from "react";
import { useAlert } from "react-alert";
import { AuthContext } from "../../contexts/AuthContext";
import { Helmet } from "react-helmet-async";

export default function Signup() {
  const alert = useAlert();
  const { signupAndSetAuth } = useContext(AuthContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (
      !validator.isEmail(form.email) ||
      validator.isEmpty(form.firstName) ||
      validator.isEmpty(form.lastName) ||
      validator.isEmpty(form.password) ||
      validator.isEmpty(form.password_confirmation)
    ) {
      return alert.error("Invalid data");
    }

    if (form.password !== form.password_confirmation) {
      return alert.error("Passwords must be equals");
    }

    signupAndSetAuth(form);
  }

  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>

      <form className="align-self-center py-5" onSubmit={handleSubmit}>
        <h4 className="mb-3 fw-bolder">Create profile</h4>
        <div className="row g-3 mb-3">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input
              value={form.firstName}
              onChange={(e) =>
                setForm((p: any) => ({ ...p, firstName: e.target.value }))
              }
              type="text"
              id="firstName"
              className="form-control"
            />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input
              value={form.lastName}
              onChange={(e) =>
                setForm((p: any) => ({ ...p, lastName: e.target.value }))
              }
              type="text"
              id="lastName"
              className="form-control"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            value={form.email}
            onChange={(e) =>
              setForm((p: any) => ({ ...p, email: e.target.value }))
            }
            type="email"
            className="form-control"
            id="email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            autoComplete="on"
            value={form.password}
            onChange={(e) =>
              setForm((p: any) => ({ ...p, password: e.target.value }))
            }
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password-confirmation" className="form-label">
            Password confirmation
          </label>
          <input
            autoComplete="on"
            value={form.password_confirmation}
            onChange={(e) =>
              setForm((p: any) => ({
                ...p,
                password_confirmation: e.target.value,
              }))
            }
            type="password"
            className="form-control"
            id="password-confirmation"
          />
        </div>
        <Link to="/login">I already have an account</Link>
        <button type="submit" className="btn btn-outline-danger float-end">
          Continue
        </button>
      </form>
    </>
  );
}
