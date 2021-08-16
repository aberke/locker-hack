import React from "react";
import AskList from "../features/askList/AskList";
import { AskCookieManager } from "../helpers/AskManager";

function MyStuff() {
  const asksCodes = AskCookieManager.getAsks();
  const buysCodes = AskCookieManager.getAsks({type: "buy"});
  return (
    <div className="my-stuff">
      <div className="container">
        <div className="">
          <h1 className="font-weight-light">My Stuff</h1>
          <p>
            (A list of items the user saved as asks or buys on this device)
          </p>
          {!Object.keys(asksCodes).length && !Object.keys(buysCodes).length && (
            <p>No asks saved on this device</p>
          )}
        </div>
        <div>
          <div>
            <h2>Asks</h2>
            {!!Object.keys(asksCodes).length && (
              <AskList asksCodes={asksCodes} />
            )}
          </div>
          <div>
            <h2>Buys</h2>
            {!!Object.keys(buysCodes).length && (
              <AskList asksCodes={buysCodes} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStuff;
