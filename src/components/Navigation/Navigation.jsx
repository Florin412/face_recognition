import "./Navigation.css";
import { useNavigate } from "react-router-dom";

// Imports for Redux.
import { useSelector } from "react-redux";

const Navigation = ({ onSignOut }) => {
  const navigate = useNavigate();

  // Access data from redux store.
  const isSignedIn = useSelector((state) => state.user.isSignedIn);

  const handleSignOut = () => {
    // Apelăm funcția onSignOut pentru a actualiza starea de autentificare
    onSignOut();

    // Navigare către pagina de Signin
    navigate("/signin");
  };

  if (isSignedIn) {
    // Dacă utilizatorul este autentificat, arătăm opțiunea de Sign out.
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="fs-3 btn-link cursor p-3 text-dark opacity-hover mb-0"
          onClick={handleSignOut}
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    // Dacă utilizatorul nu este autentificat, arătăm opțiunile de Sign in și Register.
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          className="fs-3 btn-link cursor p-3 text-dark opacity-hover mb-0"
          onClick={() => navigate("/signin")} // Navigare către pagina de Signin
        >
          Sign in
        </p>

        <p
          className="fs-3 btn-link cursor p-3 text-dark opacity-hover mb-0"
          onClick={() => navigate("/register")} // Navigare către pagina de Register
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
