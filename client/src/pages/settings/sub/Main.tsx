import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { Helmet } from "react-helmet-async";
import { updateName, updatePassword } from "../../../api/user";
import { AuthContext } from "../../../contexts/AuthContext";

export default function Main() {
  const alert = useAlert();
  const { auth, refreshAndSetAuth } = useContext(AuthContext);

  const [formName, setFormName] = useState({
    firstName: auth.user?.firstName || "",
    lastName: auth.user?.lastName || "",
  });
  const [formPassword, setFormPassword] = useState({
    old: "",
    new: "",
    repeat: "",
  });

  function handleChangeNameSubmit() {
    if (!auth.token || !auth.user) {
      return;
    }
    updateName(auth.user.id, auth.token, formName)
      .then((res) => {
        if (res.message) {
          return alert.error(res.message);
        }
        refreshAndSetAuth();
      })
      .catch(console.log);
  }

  function handleChangePassword() {
    if (formPassword.new !== formPassword.repeat) {
      return alert.error("Passwords must me the same");
    }

    if (!auth.token || !auth.user) {
      return;
    }

    updatePassword(auth.user.id, auth.token, {
      password: formPassword.old,
      newPassword: formPassword.new,
    })
      .then((res) => {
        if (res.message) {
          return alert.error(res.message);
        }
        refreshAndSetAuth();
      })
      .catch(console.log);
  }

  return (
    <>
      <Helmet>
        <title>Main settings</title>
      </Helmet>

      <div className="flex-grow-1">
        <h4>Name</h4>
        <div className="input-group mb-3">
          <span className="input-group-text">First and last name</span>
          <input
            value={formName.firstName}
            onChange={(e) =>
              setFormName((p) => ({ ...p, firstName: e.target.value }))
            }
            type="text"
            className="form-control"
          />
          <input
            value={formName.lastName}
            onChange={(e) =>
              setFormName((p) => ({ ...p, lastName: e.target.value }))
            }
            type="text"
            className="form-control"
          />
        </div>
        <button
          onClick={() => handleChangeNameSubmit()}
          className="btn btn-outline-danger mb-5"
        >
          Change name
        </button>

        <h4>Password</h4>
        <div className="mb-3">
          <label className="form-label" htmlFor="old-password">
            Old password
          </label>
          <input
            value={formPassword.old}
            onChange={(e) =>
              setFormPassword((p) => ({ ...p, old: e.target.value }))
            }
            id="old-password"
            type="password"
            className="form-control mb-3"
          />

          <div className="row">
            <div className="col">
              <label className="form-label" htmlFor="new-password">
                New password
              </label>
              <input
                value={formPassword.new}
                onChange={(e) =>
                  setFormPassword((p) => ({ ...p, new: e.target.value }))
                }
                id="new-password"
                type="password"
                className="form-control mb-3"
              />
            </div>

            <div className="col">
              <label className="form-label" htmlFor="repeat-new-password">
                Repeat new password
              </label>
              <input
                value={formPassword.repeat}
                onChange={(e) =>
                  setFormPassword((p) => ({ ...p, repeat: e.target.value }))
                }
                id="repeat-new-password"
                type="password"
                className="form-control"
              />
            </div>
          </div>

          <button
            onClick={() => handleChangePassword()}
            className="btn btn-outline-danger"
          >
            Change password
          </button>
        </div>
      </div>
    </>
  );
}
