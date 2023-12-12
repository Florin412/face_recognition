import "./Navigation.css";

const Navigation = ({ onChangeRoute }) => {
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
};

export default Navigation;
