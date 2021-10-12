import React, { useState } from "react";
import "../Sidebar/css/styles.css";

export default function Header(props) {
  const handleDrawerToggle = () => {
    props.onDrawerToggle();
  };
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
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    V2N Developer
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="#!">
                      Profile
                    </a>
                    <a className="dropdown-item" href="#!">
                      change password
                    </a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#!">
                      Log out
                    </a>
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
