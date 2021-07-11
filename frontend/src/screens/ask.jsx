import React, { useState } from "react";
import { LockerMapAsk, LockerMap } from "../components/LockerSearchBar";
import ItemExtractor from "../components/ItemExtractor";
import { ReactComponent as LockerSvg } from "../components/locker.svg";


const SIZE = 50;
function Ask() {
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [lockerConfirmed, setLockerConfirmed] = useState(false);
  const [itemAffiliatesLink, setItemAffiliatesLink] = useState("");
  const [itemAsin, setItemAsin] = useState("");
  const [note, setNote] = useState("");
  const [code, setCode] = useState("");

  const postAsk = async () => {
    let body = JSON.stringify({
      code: code,
      locker_place_id: selectedLocker.google_place_id,
      note: note,
      item_asin: itemAsin,
      item_url: itemAffiliatesLink,
    });
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
    };
    console.log('POST-ing ask', body)
    const response = await fetch('/api/ask', requestOptions);
    if (response.status !== 201) {
      throw new Error(`Request failed: ${response.status}`); 
    }
    console.log('response', response)
    return response.json().then((obj) => { return obj });
  }

  const handleSubmitAsk = async (event) => {
    event.preventDefault(); // Prevent default submission
    console.log("POST ASK", 'check for code in cookies or create one')
    let code = "TODO";
    setCode(code);
    try {
      await postAsk()
        .then((obj) => {
        console.log('successfully created ask. obj', obj);
        console.log('TODO: do what is next')
      });
    } catch (e) {
      alert(`Registration failed! ${e.message}`);
    }
  }

  return (
    <div>
      <div className="container flex-col w-full items-center">
        <div className="row items-center justify-center my-5">
          <div className="col-lg-10">
            <h1 className="font-weight-light">just ASK</h1>
            <ItemExtractor
              setItemAsin={(asin) => setItemAsin(asin)}
              setItemAffiliatesLink={(url) => setItemAffiliatesLink(url)} />
            {itemAsin && itemAffiliatesLink ? (
              <div>
                {selectedLocker === null ? (
                  <LockerMapAsk onSelectLocker={(l) => setSelectedLocker(l)} />
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
                      <div className="flex-shrink w-64 h-64 m-3">
                        <LockerMap
                          lockers={[selectedLocker]}
                          selectedLocker={selectedLocker}
                          zoom={15}
                        ></LockerMap>
                      </div>
                      <div className="flex-col">
                        <p className="text-lg font-bold text-left underline">
                          {selectedLocker.name}
                        </p>
                        {selectedLocker.vicinity
                          .replace("at", "")
                          .split(",")
                          .map((l) => (
                            <p key={l.trim().split(" ").join("-")} className="text-lg font-bold text-left">{l}</p>
                          ))}
                      </div>
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
                
                {itemAsin && itemAffiliatesLink && lockerConfirmed ? (
                  <div>
                    <div className="ask-note-container">
                      <h4>ADD A NOTE</h4>
                      <p>Optionally add a note for the person who might buy this for you.</p>
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
                      <p>Review your ASK...</p>
                      <button
                        onClick={handleSubmitAsk}
                        className="m-5 p-2 text-lg text-white bg-black font-bold rounded-xl submit-btn" 
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ) : null}
                </div>
            ) : null }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ask;
