import React, { useState } from "react";
import { LockerMapAsk, LockerMap } from "../components/LockerSearchBar";
import ItemExtractor from "../components/ItemExtractor";
import { ReactComponent as LockerSvg } from "../components/locker.svg";

const SIZE = 50;
function Ask() {
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [lockerConfirmed, setLockerConfirmed] = useState(false);
  const [affiliatesLink, setAffiliatesLink] = useState("");

  return (
    <div>
      <div className="container flex-col w-full items-center">
        <div className="row items-center justify-center my-5">
          <div className="col-lg-10">
            <h1 className="font-weight-light">just ASK</h1>
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
                        <p className="text-lg font-bold text-left">{l}</p>
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
            {lockerConfirmed ? (
              <ItemExtractor setItemLink={(l) => setAffiliatesLink(l)} />
            ) : null}

            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ask;
