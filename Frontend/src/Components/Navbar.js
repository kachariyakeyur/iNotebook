import React, {useContext} from "react";
import {Link , useLocation , useNavigate} from "react-router-dom"
import noteContext from "../Context/Notes/noteContext";



function Navbar() {
      const navigate = useNavigate();
      const context = useContext(noteContext);
    const { clearNotes} = context;

        let location = useLocation();

          const handleLogout = () => {
            if (window.confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("token");
    clearNotes();
    navigate("/login");
  }

  };

        
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <h4 className="navbar-brand">
          iNotebook
        </h4>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <button className="btn logout mx-2" onClick={handleLogout}>LogOut</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
