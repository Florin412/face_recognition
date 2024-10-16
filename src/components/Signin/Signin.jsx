import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Imports for Redux store
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/actions/actions";

const Signin = ({ connectionToBackendLink }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state variabiles
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // State for error message
  const [errorMessage, setErrorMessage] = useState("");

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIn = (event) => {
    // Prevent default form submission
    event.preventDefault();

    // Reset error message before making a new request
    setErrorMessage("");

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
      .then((data) => {
        if (data.user.id) {
          // Când utilizatorul se autentifică cu succes, trimitem acțiunea de sign in

          dispatch(signIn(data.user));

          // Navigare către pagina de Home după autentificare
          navigate("/home");

          // Stocăm token-ul în localStorage
          localStorage.setItem("token", data.token);
        } else {
          // Afișare mesaj de eroare dacă autentificarea nu reușește
          setErrorMessage("Email or password incorrect.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        setErrorMessage("Email or password incorrect. Please try again.");
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

        {/* Error Message */}
        {errorMessage && (
          <p className="text-danger mt-3 fw-bold">{errorMessage}</p> // Afișează mesajul de eroare
        )}

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
