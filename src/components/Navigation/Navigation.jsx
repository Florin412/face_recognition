import "./Navigation.css";

const Navigation = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <p className="fs-3 btn-link cursor p-3 text-dark opacity-hover mb-0 ">
        Sign out
      </p>
    </nav>
  );
};

export default Navigation;
