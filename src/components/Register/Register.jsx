const Register = ({ onChangeRoute }) => {
  return (
    <div className="d-center text-center">
      <div
        style={{ background: "rgba(255, 255, 255, 0.1)", width: "30rem" }}
        className="border border-1 p-5 rounded shadow "
        children="card"
      >
        <h1 className="mb-4 fw-bold">Register</h1>

        {/* First Name */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingFirstName"
            placeholder="First Name"
          />
          <label htmlFor="floatingInput">First Name</label>
        </div>

        {/* Last Name */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingLastName"
            placeholder="Last Name"
          />
          <label htmlFor="floatingInput">Last Name</label>
        </div>

        {/* Email */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        {/* Password */}
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        {/* Button */}
        <div className="d-center d-block mt-3">
          <button
            type="submit"
            className="btn btn-primary px-5 mb-3 fs-5"
            onClick={() => onChangeRoute("home")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
