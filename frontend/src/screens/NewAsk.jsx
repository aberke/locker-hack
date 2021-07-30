import React, { useState } from "react";
import { useHistory } from 'react-router';
import LockerSearchBar from "../features/lockers/LockerSearchBar";
import ItemExtractor from "../features/item/ItemExtractor";
import { AskCookieManager } from "../helpers/AskManager";
import { postAsk } from "../api";
import { useQueryClient, useMutation } from "react-query";
import LockerLocation from "../features/lockers/LockerLocation";


function NewAsk() {
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [lockerConfirmed, setLockerConfirmed] = useState(false);
  const [itemAffiliatesLink, setItemAffiliatesLink] = useState("");
  const [itemAsin, setItemAsin] = useState("");
  const [note, setNote] = useState("");
  const [code, setCode] = useState("");
  const [askId, setAskId] = useState("");
  const [askerEmail, setAskerEmail] = useState("");
  const [saveAskerEmail, setSaveAskerEmail] = useState(true);
  const [saveAskCookie, setSaveAskCookie] = useState(true);
  const queryClient = useQueryClient();
  const history = useHistory();

  const submitAsk = useMutation(postAsk, {
    onSuccess: (d) => {
      // Invalidate and refetch
      console.log("got data from submit ask:", d);
      const askId = d.id;
      const code = d.code;
      setAskId(askId);
      setCode(code);
      console.log("successfully created ask.", d);
      // TODO: move this
      AskCookieManager.setAskCodeCookie(askId, code);
      const params = new URLSearchParams({['new']: true, ['code']: code });
      history.replace({ pathname: '/ask/'+askId, search:  params.toString() });
    },
    onError: (e) => {
      console.log(`POST failed! ${e.message}`);
    },
  });

  const handleSubmitAsk = async (event) => {
    event.preventDefault(); // Prevent default submission
    const code = AskCookieManager.getNewAskCode();
    const askData = {
      code: code,
      locker_place_id: selectedLocker.google_place_id,
      note: note,
      item_asin: itemAsin,
      item_url: itemAffiliatesLink,
    };
    submitAsk.mutate(askData);
  };


  return (
    <div>
      <div className="container flex-col w-full items-center">
        <div className="row items-center justify-center my-5">
          <div className="col-lg-10">
            {!askId ? (
              <div id="new-ask-container">
                <h1 className="font-weight-light">just ASK</h1>
                <ItemExtractor
                  setItemAsin={(asin) => setItemAsin(asin)}
                  setItemAffiliatesLink={(url) => setItemAffiliatesLink(url)}
                />
                {itemAsin && itemAffiliatesLink ? (
                  <div>
                    {selectedLocker === null ? (
                    <LockerSearchBar
                      locker={selectedLocker}
                      onSelectLocker={(l) => setSelectedLocker(l)}
                    />
                    ) : (
                      <div className="flex-col p-5">
                        <p className="text-lg font-bold p-2">Your Locker:</p>
                        <div
                          className={
                            !lockerConfirmed
                              ? "flex-row flex items-center justify-center border p-2"
                              : "flex-row flex items-center justify-center border-2 p-2"
                          }
                          >
                          <LockerLocation ask={{locker_place_id: selectedLocker.google_place_id}} />
                        </div>
                        <div className="flex flex-row justify-center">
                          <button
                            onClick={() => setSelectedLocker(null)}
                            className="m-5 p-2 text-lg text-black bg-white font-bold rounded-xl border-2"
                          >
                            Change
                          </button>
                          {!lockerConfirmed ? (
                            <button
                              onClick={() => setLockerConfirmed(true)}
                              className="m-5 p-2 text-lg text-white bg-black font-bold rounded-xl"
                            >
                              Confirm
                            </button>
                          ) : null}
                        </div>
                      </div>
                    )}
                    {itemAsin && itemAffiliatesLink && selectedLocker && lockerConfirmed ? (
                      <div>
                        <div className="ask-note-container">
                          <h4>ADD A NOTE</h4>
                          <p>
                            Optionally add a note for the person who might buy
                            this for you.
                          </p>
                          <textarea
                            className="note-input"
                            maxLength={1400}
                            name="note"
                            value={note}
                            label="note"
                            onChange={(e) => setNote(e.target.value)}
                          ></textarea>
                        </div>
                        <div>
                          <p>Review ASK...</p>
                          <p>This is how your ask will appear on the site</p>
                          <p>(TODO)</p>
                          <button
                            onClick={handleSubmitAsk}
                            className="m-5 p-2 text-lg text-white bg-black font-bold rounded-xl submit-btn"
                          >
                            Submit ASK
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : (
              <div>
                <p>The ask was created. Ask id : {askId}</p>
                <p>Do what is next: Make the pending ask/askId page </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewAsk;
