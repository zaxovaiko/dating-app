import { useEffect, useState, useContext } from "react";
import { getOneUser } from "../../api/user";
import { AuthContext } from "../../contexts/AuthContext";
import { useAlert } from "react-alert";
import { User } from "../../types/user";
import InformationList from "./components/InformationList";
import { Map, Placemark, YMaps } from "react-yandex-maps";
import { Helmet } from "react-helmet-async";

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
    <>
      <Helmet>
        <title>
          {auth.user?.firstName + " " + auth.user?.lastName} - profile
        </title>
      </Helmet>

      <div className="row py-5">
        <div className="col-6 offset-3">
          {!user.completeSignup && <h4>Could not load the profile</h4>}
          {user.information && (
            <>
              <div className="row mb-4">
                <div className="col-12 col-md-5">
                  <img
                    className="w-100 rounded mb-3"
                    src={user.avatar}
                    alt=""
                  />
                  <p>{user.information.status || ""}</p>
                </div>
                <div className="col-12 col-md-7">
                  <h3 className="d-flex align-items-center mb-4">
                    <span
                      className={`badge bg-${
                        user.information.sex === "male" ? "primary" : "danger"
                      } me-2`}
                    >
                      <i
                        className={`bi bi-gender-${
                          {
                            male: "male",
                            female: "female",
                            other: "ambiguous",
                          }[user.information.sex]
                        }`}
                      ></i>{" "}
                    </span>{" "}
                    {user.firstName} {user.lastName}{" "}
                    {new Date().getFullYear() -
                      new Date(user.information.birthDate).getFullYear() ||
                      null}
                  </h3>

                  {user.information.coordinates ? (
                    <YMaps query={{ lang: "en_US" }}>
                      <Map
                        style={{ width: "100%", height: "250px" }}
                        defaultState={{
                          center: Object.values(user.information.coordinates),
                          zoom: 5,
                        }}
                      >
                        <Placemark
                          key={Object.values(user.information.coordinates).join(
                            ","
                          )}
                          geometry={Object.values(user.information.coordinates)}
                        />
                      </Map>
                    </YMaps>
                  ) : (
                    "Unknown location"
                  )}
                </div>
              </div>

              <div className="row">
                <InformationList
                  title="Hobby"
                  list={user.information.hobbies}
                />
                <InformationList
                  title="Language"
                  list={user.information.languages}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
