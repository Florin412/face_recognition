import { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onRegisterSubmit = () => {
    fetch("https://smart-brain-api-jklb.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          console.log(user);
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      })
      .catch((err) => {
        console.log("Unable to register.");
      });
  };

  render() {
    return (
      <form className="d-center text-center">
        <div
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
              placeholder="Name"
              name="name"
              onChange={this.onNameChange}
              autoComplete="name"
              required
            />
            <label htmlFor="floatingName">Name</label>
          </div>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              name="email"
              onChange={this.onEmailChange}
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
              onChange={this.onPasswordChange}
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
              onClick={this.onRegisterSubmit}
            >
              Register
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Register;
