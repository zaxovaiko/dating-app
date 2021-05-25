import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "../../components/layout/Layout";

export default function Setup() {
  const [form, setForm] = useState({
    birthDate: undefined,
    avatar: "",
    sex: "male",
    hobbies: [],
    languages: [],
    hobby: "",
    language: "",
  });

  // TODO: Add google maps https://github.com/google-map-react/google-map-react
  return (
    <Layout>
      <Helmet>
        <title>Set up</title>
      </Helmet>

      <form className="align-self-center py-5">
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
              <span key={hobby} className="badge bg-info me-1">
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
                  languages: Array.from(new Set([...p.languages, p.language])),
                  language: "",
                }))
              }
            >
              Add
            </button>
          </div>
          <div className="d-flex flex-wrap">
            {form.languages.map((lang) => (
              <span key={lang} className="badge bg-info me-1">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <button type="button" className="btn btn-outline-danger float-end">
          Save and continue
        </button>
      </form>
    </Layout>
  );
}
