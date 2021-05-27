import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Lockers &amp; Noise
          </Link>

          <div>
            <ul className="navbar-nav ml-auto">
              <li
                className={`nav-item  ${
                  props.location.pathname === "/ask" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/ask">
                  ASK
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/buy" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/buy">
                  BUY
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li
                className={`nav-item  ${
                  props.location.pathname === "/my-stuff" ? "active" : ""
                }`}
              >
                <Link className="nav-link" to="/my-stuff">
                  My Stuff
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
