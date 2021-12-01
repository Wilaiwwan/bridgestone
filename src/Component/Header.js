import React, { useState, useEffect } from "react";
import "../Sidebar/css/styles.css";
import { useHistory } from "react-router-dom";
import qs from "qs";
import api from "./api/api";

export default function Header(props) {
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [FirstName, setFirstName] = useState("");

  const handleDrawerToggle = () => {
    props.onDrawerToggle();
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  const fetchEmpData = async () => {
    try {
      const result = await api.post("/api/users/user");
      const _result = result.data.results;
      setFirstName(_result.fistName);

    } catch (error) {
      console.log("error => ", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEmpData();
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <div style={{ width: "100%", position: "sticky", top: 0, zIndex: 1 }}>
      {/* Page content wrapper*/}
      <div id="page-content-wrapper">
        {/* Top navigation*/}
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <div class="container-fluid">
            <span
              class="material-icons-outlined btn"
              id="sidebarToggle"
              onClick={handleDrawerToggle}
            >
              menu
            </span>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    href="/"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {FirstName}
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    {/* <a className="dropdown-item" href="#!">
                      Profile
                    </a>
                    <a className="dropdown-item" href="#!">
                      change password
                    </a> */}
                    <div className="dropdown-divider" />
                    <button className="dropdown-item" onClick={handleLogOut}>
                      Log out
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
