import "./Navigation.css";

const Navigation = ({ onChangeRoute, isSignedIn }) => {
  if (isSignedIn) {
    //  If we are signed in the app, we should have the option to sign out.
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <p
          className="fs-3 btn-link cursor p-3 text-dark opacity-hover mb-0 "
          onClick={() => onChangeRoute("signin")}
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    //  If we are signed out the app, we should have the option to sign in or register.
    return (
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <p
          className="fs-3 btn-link cursor p-3 text-dark opacity-hover mb-0 "
          onClick={() => onChangeRoute("signin")}
        >
          Sign in
        </p>

        <p
          className="fs-3 btn-link cursor p-3 text-dark opacity-hover mb-0 "
          onClick={() => onChangeRoute("register")}
        >
          Resister
        </p>
      </nav>
    );
  }
};

export default Navigation;
