import { Component } from "react";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInEmail: "",
      signInPassword: ""
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = () => {
    fetch("https://smart-brain-api-jklb.onrender.com/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          console.error("Error loggin in, email or password incorrect.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  render() {
    const { onRouteChange } = this.props;

    return (
      <form className="d-center text-center">
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
              name="email"
              onChange={this.onEmailChange}
              autoComplete="email"
              required
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
              name="current-password"
              onChange={this.onPasswordChange}
              autoComplete="current-password"
              minLength="6"
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          {/* Button */}
          <div className="d-center d-block mt-3">
            <button
              type="submit"
              className="btn btn-primary px-5 mb-3 fs-5"
              onClick={this.onSubmitSignIn}
            >
              Sign in
            </button>
            <p
              className="cursor-pointer fs-5"
              onClick={() => onRouteChange("register")}
            >
              Register
            </p>
          </div>
        </div>
      </form>
    );
  }
}

export default Signin;
