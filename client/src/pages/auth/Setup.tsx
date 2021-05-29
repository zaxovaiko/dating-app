import { useState, memo, SyntheticEvent, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { updateInformation } from "../../api/user";
import Layout from "../../components/layout/Layout";
import { AuthContext } from "../../contexts/AuthContext";

type Coordinates = {
  longitude: number;
  latitude: number;
};

type UpdateUserDto = {
  birthDate?: string;
  sex: string;
  avatar: string;
  status: string;
  hobbies: string[];
  languages: string[];
  images: string[];
  coordinates: Coordinates;
};

type CustomForm = {
  hobby: string;
  language: string;
};

function Setup() {
  const { auth, refreshAndSetAuth } = useContext(AuthContext);
  const [form, setForm] = useState<UpdateUserDto & CustomForm>({
    birthDate: undefined,
    avatar: "",
    sex: "male",
    hobbies: [],
    languages: [],
    images: [],
    status: "",
    hobby: "",
    language: "",
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
  });

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    updateInformation(auth.user.id, form, auth.token)
      .then(() => refreshAndSetAuth())
      .catch((err) => console.log(err));
  }

  // TODO: Split by smaller components
  return (
    <Layout>
      <Helmet>
        <title>Set up</title>
      </Helmet>

      <div className="row">
        <div className="col-12 col-md-8 offset-md-2 mb-4">
          <form className="align-self-center py-5" onSubmit={handleSubmit}>
            <h4 className="mb-3 fw-bolder">Set up your profile</h4>
            <div className="mb-3 text-center">
              <img className="rounded w-50" src={form.avatar} alt="" />
            </div>
            <div className="mb-3">
              <label htmlFor="avatar" className="form-label">
                Choose a photo
              </label>
              <input
                onChange={(e) =>
                  setForm((p: any) => ({
                    ...p,
                    avatar:
                      e.target.files && URL.createObjectURL(e.target.files[0]),
                  }))
                }
                className="form-control form-control-sm"
                id="avatar"
                type="file"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="status" className="form-label">
                Write something about yourself
              </label>
              <textarea
                className="form-control"
                id="status"
                onChange={(e) =>
                  setForm((p) => ({ ...p, status: e.target.value }))
                }
                value={form.status}
              />
            </div>

            <div className="row g-3 mb-3">
              <div className="col">
                <label htmlFor="birthDate" className="form-label">
                  Birth date
                </label>
                <input
                  value={form.birthDate}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, birthDate: e.target.value }))
                  }
                  type="date"
                  id="birthDate"
                  className="form-control"
                  min={new Date(new Date().getFullYear() - 150, 1, 1)
                    .toJSON()
                    .slice(0, 10)}
                  max={new Date(new Date().getFullYear() - 18, 1, 1)
                    .toJSON()
                    .slice(0, 10)}
                  step="1"
                />
              </div>

              <div className="col">
                <label htmlFor="sex" className="form-label">
                  Sex
                </label>
                <select
                  id="sex"
                  className="form-select"
                  defaultValue={form.sex}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, sex: e.target.value }))
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="hobbies" className="form-label">
                Hobbies
              </label>
              <div className="input-group mb-2">
                <input
                  value={form.hobby}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, hobby: e.target.value }))
                  }
                  type="text"
                  className="form-control"
                  id="hobbies"
                  placeholder="Start typing"
                />
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() =>
                    setForm((p: any) => ({
                      ...p,
                      hobbies: Array.from(new Set([...p.hobbies, p.hobby])),
                      hobby: "",
                    }))
                  }
                >
                  Add
                </button>
              </div>
              <div className="d-flex flex-wrap">
                {form.hobbies.map((hobby) => (
                  <span
                    key={hobby}
                    className="badge bg-info me-1"
                    onClick={() =>
                      setForm((p) => ({
                        ...p,
                        hobbies: p.hobbies.filter((e) => e !== hobby),
                      }))
                    }
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="languages" className="form-label">
                Languages
              </label>
              <div className="input-group mb-2">
                <input
                  value={form.language}
                  onChange={(e) =>
                    setForm((p: any) => ({ ...p, language: e.target.value }))
                  }
                  type="text"
                  className="form-control"
                  id="languages"
                  placeholder="Start typing"
                />
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() =>
                    setForm((p: any) => ({
                      ...p,
                      languages: Array.from(
                        new Set([...p.languages, p.language])
                      ),
                      language: "",
                    }))
                  }
                >
                  Add
                </button>
              </div>
            </div>

            <div className="d-flex flex-wrap mb-3">
              {form.languages.map((lang) => (
                <span
                  key={lang}
                  className="badge bg-info me-1"
                  onClick={() =>
                    setForm((p) => ({
                      ...p,
                      languages: p.languages.filter((e) => e !== lang),
                    }))
                  }
                >
                  {lang}
                </span>
              ))}
            </div>

            <div className="mb-3">
              <p>Location</p>
              <YMaps query={{ lang: "en_US" }}>
                <Map
                  onClick={(e: any) => {
                    setForm((p) => ({
                      ...p,
                      coordinates: {
                        latitude: e.get("coords")[0],
                        longitude: e.get("coords")[1],
                      },
                    }));
                  }}
                  style={{ width: "100%", height: "300px" }}
                  defaultState={{ center: [0, 0], zoom: 1 }}
                >
                  <Placemark
                    key={Object.values(form.coordinates).join(",")}
                    geometry={Object.values(form.coordinates)}
                  />
                </Map>
              </YMaps>
            </div>

            <button type="submit" className="btn btn-outline-danger float-end">
              Save and continue
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default memo(Setup);
