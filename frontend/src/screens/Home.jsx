import React from "react";
import AskList from "../features/askList/AskList";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <h1 className="font-weight-light">Lockers &amp; Noise</h1>
          </div>
        </div>
        <AskList />
      </div>
    </div>
  );
}

export default Home;
