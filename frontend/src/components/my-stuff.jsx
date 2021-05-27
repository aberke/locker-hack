import React from "react";

function MyStuff() {
  return (
    <div className="my-stuff">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <h1 className="font-weight-light">My Stuff</h1>
          </div>
          <div className="col-lg-5">
            <p>
              TODO: A list of asks that this user has interacted with.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStuff;
