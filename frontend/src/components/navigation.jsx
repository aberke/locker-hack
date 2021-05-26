import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            Lockers &amp; Noise
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/ask" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/ask">
                  ASK
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/buy" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/buy">
                  BUY
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/about" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/my-stuff" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/my-stuff">
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
