import React, { useEffect, useState } from "react";
import FlatList from "flatlist-react";
import fetch from "node-fetch";
import LockerPins from "./LockerPins";
import ReactMapGL, { Popup } from "react-map-gl";
import LockerMap from "./LockerMap";
import LockerInfo from "./LockerInfo";
import { useQuery, useQueryClient } from "react-query";
import { getLockersNearLatLng } from "./api";
import { geocodeAddress } from '../../api/googlePlaces'

const LockerList = ({ lockers, selectedLocker, onLockerClicked }) => {
  const LockerListItem = ({ locker }) => {
    const isSelected =
      selectedLocker == undefined ? false : selectedLocker.name === locker.name;
    const selectedClass = isSelected ? "bg-gray-100 font-bold" : "";
    const className = `flex-col border-b mb-1 p-2 w-full items-center ${selectedClass}`;
    return (
      <button onClick={(e) => onLockerClicked(locker)} className={className}>
        <h1>{locker.name}</h1>
      </button>
    );
  };

  return (
    <div className="flex-col">
      <div className="bg-yellow">
        <p className="font-bold text-black text-lg">Lockers</p>
      </div>
      <FlatList
        list={lockers}
        renderItem={(l) => {
          return <LockerListItem locker={l} key={l.name} />;
        }}
        keyExtractor={(l) => l.name}
      />
    </div>
  );
};

const LockerSearchBar = ({ onSelectLocker }) => {
  const [lockers, setLockers] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [clickedLocker, setClickedLocker] = useState();

  const { status, refetch } = useQuery(
    ["geocodeAddress", zipCode],
    () => geocodeAddress(zipCode),
    {
      onSuccess: (data) => {
        console.log("Got loc for address:", data);
        getLockers(data);
      },
    }
  );

  const getLockers = (latLng) => {
    return getLockersNearLatLng(latLng).then((lockers) => {
      console.log(lockers);
      setLockers(lockers);
    });
  };

  // automatically set to the first result
  useEffect(() => {
    setClickedLocker(lockers[0]);
  }, [lockers]);

  const onLockerClick = (l) => {
    setClickedLocker(l);
  };

  return (
    <div className="flex-col flex justify-start items-center">
      <p className="text-lg font-bold p-2">Enter a zip code to find a Locker</p>
      <form className="flex-row flex space-around justify-center pb-10">
        <div className="flex-col justify-start">
          <input
            label="Zip Code"
            className="bg-white border p-1 m-2"
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <button className="rounded-lg bg-yellow p-1 m-2">
          <p className="font-bold text-black">Submit</p>
        </button>
      </form>

      {!(status == "loading" || status == "error") && (
        <div className="flex-row w-full flex items-start h-96">
          <div className="flex-shrink w-2/3 h-full">
            <LockerMap
              lockers={lockers}
              selectedLocker={clickedLocker}
              onLockerClicked={onLockerClick}
              showPopup={true}
            />
          </div>
          <div className="h-full w-1/3 overflow-scroll">
            <LockerList
              lockers={lockers}
              selectedLocker={clickedLocker}
              onLockerClicked={onLockerClick}
            />
          </div>
        </div>
      )}
      {clickedLocker !== undefined ? (
        <button
          className="m-2 m-5 p-2 text-lg text-white bg-black font-bold rounded-lg"
          onClick={() => onSelectLocker(clickedLocker)}
        >
          Select This Locker
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export const LockerMapAsk = LockerSearchBar;
