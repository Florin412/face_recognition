import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Imports for Redux store
import { useDispatch } from 'react-redux';
import { signIn } from "../../redux/actions/actions";

const Register = ({ connectionToBackendLink }) => {
  // Hook pentru navigare
  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  // Define state variables for name, email, and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const onRegisterSubmit = (event) => {
    // Prevent the default form submission
    event.preventDefault(); 

    fetch(connectionToBackendLink + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data.user.id) {
          // Când utilizatorul se autentifică cu succes, trimitem acțiunea de sign in
          dispatch(signIn(userData));
          
          // Navigare la pagina de Home după înregistrare reușită
          navigate("/home"); 

          // Stocăm token-ul în localStorage
          localStorage.setItem("token", data.token);
        } else {
          console.log("Unable to register. User ID not received.");
        }
      })
      .catch((err) => {
        console.error("Unable to register:", err);
      });
  };

  return (
    <form className="d-center text-center" onSubmit={onRegisterSubmit}>
      <div
        style={{ background: "rgba(255, 255, 255, 0.1)", width: "30rem" }}
        className="border border-1 p-5 rounded shadow"
      >
        <h1 className="mb-4 fw-bold">Register</h1>

        {/* Name */}
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Name"
            value={name} // Use the state variable for value
            onChange={(e) => setName(e.target.value)} // Update state on change
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
            value={email} // Use the state variable for value
            onChange={(e) => setEmail(e.target.value)} // Update state on change
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
            value={password} // Use the state variable for value
            onChange={(e) => setPassword(e.target.value)} // Update state on change
            name="new-password"
            autoComplete="new-password"
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        {/* Button */}
        <div className="d-center d-block mt-3">
          <button type="submit" className="btn btn-primary px-5 mb-3 fs-5">
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
