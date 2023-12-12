const Register = ({ onChangeRoute }) => {
  return (
    <div className="d-center text-center">
      <form
        style={{ background: "rgba(255, 255, 255, 0.1)", width: "30rem" }}
        className="border border-1 p-5 rounded shadow "
        children="card"
      >
        <h1 className="mb-4 fw-bold">Register</h1>

        {/* Name */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Full Name"
            name="full-name"
            autoComplete="name"
            required
          />
          <label htmlFor="floatingName">Full Name</label>
        </div>

        {/* Email */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="name@example.com"
            name="email"
            autoComplete="email"
            required
          />
          <label htmlFor="floatingEmail">Email address</label>
        </div>

        {/* Password */}
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="new-password"
            autoComplete="new-password"
            required
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
      </form>
    </div>
  );
};

export default Register;
