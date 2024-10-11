import "./Navigation.css";
import { useNavigate } from "react-router-dom";

const Navigation = ({ isSignedIn, onSignOut }) => {
  const navigate = useNavigate(); // Hook pentru navigare

  const handleSignOut = () => {
    // Aici poți adăuga logica de delogare, dacă este necesar.
    // De exemplu, poți șterge token-urile de autentificare sau datele utilizatorului.
    onSignOut(); // Apelăm funcția onSignOut pentru a actualiza starea de autentificare
    navigate("/signin"); // Navigare către pagina de Signin
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
