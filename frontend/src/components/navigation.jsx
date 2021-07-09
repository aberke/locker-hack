import React from "react";
import { Link, withRouter } from "react-router-dom";

const active = "bg-yellow rounded text-gray";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark border-b border-yellow">
        <div className="container w-full flex flex-row justify-between">
          <div className="flex flex-row justify-self-start flex-grow justify-start">
            <Link className="text-gray border-b border-yellow align-self-center font-black font-mono" to="/">
              Lockers &amp; Noise
            </Link>

            <div className="flex flex-row font-black pl-10">
              <div
                className={`${
                  props.location.pathname === "/ask" ? active : ""
                }`}
              >
                <Link className="nav-link" to="/ask">
                  ASK
                </Link>
              </div>
              <div
                className={`nav-item  ${
                  props.location.pathname === "/buy" ? active : ""
                }`}
              >
                <Link className="nav-link" to="/buy">
                  BUY
                </Link>
              </div>
              <div
                className={`nav-item  ${
                  props.location.pathname === "/about" ? active : ""
                }`}
              >
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </div>
            </div>
          </div>
          <div className="justify-self-end font-black">
            <div
              className={`nav-item  ${
                props.location.pathname === "/my-stuff" ? active : ""
              }`}
            >
              <Link className="nav-link" to="/my-stuff">
                My Stuff
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
