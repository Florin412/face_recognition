import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = ({ loadUser, onSignIn, connectionToBackendLink }) => {
  // Define state variables for email and password
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const navigate = useNavigate(); // Hook pentru navigare

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIn = (event) => {
    event.preventDefault(); // Prevent default form submission

    fetch(connectionToBackendLink + "signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error logging in, email or password incorrect");
        }
        return response.json();
      })
      .then((user) => {
        if (user.id) {
          console.log(user);
          loadUser(user);
          onSignIn(); // Trigger the sign-in action
          navigate("/home"); // Navigare către pagina de Home după autentificare
        } else {
          console.error("Error logging in, email or password incorrect.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <form className="d-center text-center" onSubmit={onSubmitSignIn}>
      <div
        style={{ background: "rgba(255, 255, 255, 0.1)", width: "30rem" }}
        className="border border-1 p-5 rounded shadow"
      >
        <h1 className="mb-4 fw-bold">Sign In</h1>
        {/* Email */}
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={signInEmail} // Use the state variable for value
            onChange={onEmailChange} // Update state on change
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
            value={signInPassword} // Use the state variable for value
            onChange={onPasswordChange} // Update state on change
            autoComplete="current-password"
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        {/* Button */}
        <div className="d-center d-block mt-3">
          <button type="submit" className="btn btn-primary px-5 mb-3 fs-5">
            Sign in
          </button>
          <p
            className="cursor-pointer fs-5"
            onClick={() => navigate("/register")} // Navigare la pagina de Register
          >
            Register
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signin;
