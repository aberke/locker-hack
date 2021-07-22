import React, { useState, useEffect } from "react";
import {
  useParams,
  useLocation
} from "react-router-dom";
import { useQuery } from "react-query";
import { getAsk } from "../api";
import { AskCookieManager, AskUrlManager } from "../helpers/AskManager";
import ItemIframe from "../features/item/ItemIframe";
import LockerMap from "../features/lockers/LockerMap";

const URL = "http://mutual.supply";

function Ask() {
  /*
    /ask/:id
      user goes here to view or buy or interact with the ask
    /ask/:id?code=code
      user has interacted with the ask --> show all notes; save code in cookie
    /ask/:id?code=code&new=true
      user has just created this ask and been redirect here.
      prompt to save email; save code in cookie
  */
  let { id } = useParams();

  // things from the query parameters
  const [code, setCode] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [ask, setAsk] = useState(null);
  const [saveCode, setSaveCode] = useState(true);


  let query = new URLSearchParams(useLocation().search);
  let qsCode = query.get("code");
  let qsIsNew = !!query.get("new");

  useEffect(() => {
    let code = "";
    if (AskCookieManager.isValidCode(qsCode)) {
      code = qsCode;
    } else {
      code = AskCookieManager.getAskCodeCookie(id);
    }
    AskCookieManager.setAskCodeCookie(id, code);
    setCode(code);
    setIsNew(qsIsNew);
  }, []);

  const askQuery = useQuery(["ask", id], () => getAsk(id), {
    retry: 1, // this many retries upon error
    onSuccess: (data) => {
      console.log('ask data', data);
      setAsk(data);
    },
    onError: (e) => {
      console.log(`GET failed! ${e.message}`);
    },
  });

  const handleSaveCodeInCookieChange = (event) => {
    const saveInCookieValue = event.target.checked;
    setSaveCode(saveInCookieValue);
    if (saveInCookieValue == false) {
      AskCookieManager.deleteAskCodeCookie(id);
    } else {
      AskCookieManager.setAskCodeCookie(id, code);
    }
  }

  return (
    <div>
      <div className="container flex-col w-full items-center">
        <div className="row items-center justify-center my-5">
          <div className="col-lg-10">
            {(askQuery.status === 'loading') ? (
              <span>Loading...</span>
            ) : ((askQuery.status === 'error') ? (              
            <div>
              <span>Error: {askQuery.error.message}</span>
            </div>
             ) : null )}

             {/* the ask */}
             { !!ask && (
               <div id="ask container">
                <p>ask status: {ask.status}</p>
                {/* If this is a brand new ask: show the extra box to the user */}
                {(ask.status === "open" && isNew && (ask.code == code)) && (
                  <div style={{border: "1px solid black"}} id="new-ask-container">
                    <p>(This is a brand new ask. The user was redirected from the new ask page.)</p>
                    <h3>LIVE</h3>
                    <p>Your ASK is live!</p>
                    <p>
                      When someone buys this for you, they’ll post the details here. 
                      So make sure to save or bookmark this link!
                    </p>
                    <p>
                      There is a special code in this link so that only with
                      this special code can you see the purchase and delivery info.
                      
                    </p>
                    <p>TODO: better copy.</p>
                    <a href={AskUrlManager.getAskUrl(id) + '?code=' + ask.code}>{`${URL}/ask/${ask.id}?code=${ask.code}`}</a>

                    <div id="save-code-in-cookie-container">
                    <label>
                      Save the code in a cookie so that I can always see the info on this device.

                      <input
                        name="saveCode"
                        type="checkbox"
                        checked={saveCode}
                        onChange={handleSaveCodeInCookieChange} />
                    </label>
                    </div>

                  </div>
                )}
                <div>
                  <p>ASK item</p>
                  <div className="flex flex-row w-full items-center justify-start">
                    <ItemIframe asin={ask.item_asin} />
                    {ask.locker && (
                      <div className="flex flex-row w-full items-center justify-start">
                        <div className="flex-shrink w-64 h-64 m-3">
                          <div>
                            <div className="flex-col flex">
                              <div className="flex-col p-1 border m-1 text-sm items-left">
                                {ask.locker.address.split(",").map((addressLine) => (
                                  <div
                                    key={addressLine.trim().split(" ").join("-")}
                                    className="flex-row justify-left"
                                  >
                                    {addressLine}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink w-64 h-64 m-3">
                          <LockerMap
                            lockers={[ask.locker]}
                            selectedLocker={ask.locker}
                            zoom={15}
                          ></LockerMap>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ask;
