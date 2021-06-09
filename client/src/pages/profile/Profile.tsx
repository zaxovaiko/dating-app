import { useEffect, useState, useContext } from "react";
import Layout from "../../components/layout/Layout";
import { getOneUser } from "../../api/user";
import { AuthContext } from "../../contexts/AuthContext";
import { useAlert } from "react-alert";
import { User } from "../../types/User";
import InformationList from "./components/InformationList";

export default function Settings() {
  const alert = useAlert();
  const [user, setUser] = useState<Partial<User>>({});
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth.user || !auth.token) {
      return;
    }
    getOneUser(auth.user.id, auth.token)
      .then((res) => setUser(res))
      .catch(() => alert.error("Something went wrong"));
    return () => setUser({});
  }, []);

  return (
    <Layout>
      <div className="row py-5">
        <div className="col-6 offset-3">
          {!user.completeSignup && (
            <h4 className="">Could not load the profile</h4>
          )}
          {user.information && (
            <>
              <div className="mb-3">
                <img className="w-100 rounded mb-3" src={user.avatar} alt="" />
                <h3 className="d-flex align-items-center">
                  <span
                    className={`badge bg-${
                      user.information.sex === "male" ? "primary" : "danger"
                    } me-2`}
                  >
                    <i
                      className={`bi bi-gender-${
                        user.information.sex === "male" ? "" : "fe"
                      }male`}
                    ></i>{" "}
                  </span>{" "}
                  {user.firstName} {user.lastName}{" "}
                  {user.information.birthDate || null}
                </h3>
                <p className="mb-4">
                  {user.information.location
                    ? user.information.location
                    : "Unknown location"}
                </p>
                <p>{user.information.status || ""}</p>
              </div>

              <InformationList title="Hobby" list={user.information.hobbies} />
              <InformationList
                title="Language"
                list={user.information.languages}
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
