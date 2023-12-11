const Signin = () => {
  return (
    <div className="d-center text-center">
      <div
        style={{ background: "rgba(255, 255, 255, 0.1)", width: "30rem" }}
        className="border border-1 p-5 rounded shadow "
        children="card"
      >
        <h1 className="mb-4 fw-bold">Sign In</h1>
        {/* Email */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
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
          <button type="submit" className="btn btn-primary px-5 mb-3">
            Sign in
          </button>
          <p>Register</p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
