import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

export default function Settings() {
  const router = useRouter();
  return (
  <Layout>
    <Head>
      <title>Settings</title>
    </Head>

    <form className="align-self-center py-5">
        <h4 className="mb-3 fw-bolder">Settings</h4>
        <div className="mb-3">
          <img
            className="rounded w-100"
            src="https://via.placeholder.com/350"
            alt="image"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="avatar" className="form-label">
            Change a photo
          </label>
          <input
            className="form-control form-control-sm"
            id="avatar"
            type="file"
          />
        </div>
        <div className="row g-3 mb-3">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              First name
            </label>
            <input type="text" id="firstName" className="form-control" defaultValue={"Illia"} />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">
              Last name
            </label>
            <input type="text" id="lastName" className="form-control" defaultValue={"Hrebenko"}/>
          </div>
        </div>
        <div className="row g-3 mb-3">
          <div className="col">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="form-control"
              min="18"
              max="100"
              range="1"
              defaultValue="18"
            />
          </div>
          <div className="col">
            <label htmlFor="sex" className="form-label">
              Sex
            </label>
            <select id="sex" className="form-select" defaultValue={"1"}>
              <option selected>Sex</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Another</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" defaultValue="251527@student.pwr.edu.pl"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            New password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            New password confirmation
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="hobbies" className="form-label">
            Hobbies
          </label>
          <input
            type="text"
            className="form-control"
            id="hobbies"
            placeholder="Start typing"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="languages" className="form-label">
            Languages
          </label>
          <input
            type="text"
            className="form-control mb-2"
            id="languages"
            placeholder="Start typing"
          />
          <div>
            <span className="badge bg-danger me-1">Russian</span>
            <span className="badge bg-danger">English</span>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline-danger float-end"
          onClick={() => router.push("/")}
        >
          Save
        </button>
      </form>
  </Layout>
  );
}