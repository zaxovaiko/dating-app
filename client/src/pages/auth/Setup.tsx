import Layout from "../../components/layout/Layout";

export default function Setup() {
  // TODO: Add google maps https://github.com/google-map-react/google-map-react
  return (
    <Layout>
      <form className="align-self-center py-5">
        <h4 className="mb-3 fw-bolder">Set up your profile</h4>
        <div className="mb-3">
          <img
            className="rounded w-100"
            src="https://via.placeholder.com/350"
            alt=""
          />
        </div>
        <div className="mb-3">
          <label htmlFor="avatar" className="form-label">
            Choose a photo
          </label>
          <input
            className="form-control form-control-sm"
            id="avatar"
            type="file"
          />
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
              step="1"
            />
          </div>
          <div className="col">
            <label htmlFor="sex" className="form-label">
              Sex
            </label>
            <select id="sex" className="form-select">
              <option selected>Sex</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
              <option value="3">Another</option>
            </select>
          </div>
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

        <button type="button" className="btn btn-outline-danger float-end">
          Save and start
        </button>
      </form>
    </Layout>
  );
}
