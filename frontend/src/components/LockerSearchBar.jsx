import React, { useEffect, useState } from "react";
import FlatList from "flatlist-react";
import fetch from "node-fetch";
import LockerPins from "./LockerPins";
import ReactMapGL, { Popup } from "react-map-gl";

const LockerInfo = (props) => {
  const { name, vicinity } = props.info;
  const addressItems = vicinity.replace("at ", "").split(",");
  return (
    <div className="flex-col flex">
      <div className="flex-row p-1 text-base font-bold border-b">{name}</div>
      <div className="flex-col p-1 border m-1 text-sm items-left">
        {addressItems.map((addressLine) => (
          <div key={addressLine.trim().split(" ").join("-")} className="flex-row justify-left">{addressLine}</div>
        ))}
      </div>
    </div>
  );
};

export const LockerMap = ({ lockers, selectedLocker, onLockerClicked, showPopup=false, zoom=11}) => {
  const [popupInfo, setPopupInfo] = useState();
  // default that really never gets used.
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: zoom,
  });

  useEffect(() => {
    if (selectedLocker) {
      console.log("selected Locker:", selectedLocker);
      console.log("selected Locker:", selectedLocker !== undefined);
      setViewport({
        ...viewport,
        latitude: selectedLocker.geometry.lat,
        longitude: selectedLocker.geometry.lng,
      });
      setPopupInfo(selectedLocker);
    }
  }, [selectedLocker]);

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/light-v10"
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      <LockerPins lockers={lockers} onLockerClicked={onLockerClicked} />
      {(popupInfo && showPopup) && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.geometry.lng}
          latitude={popupInfo.geometry.lat}
          closeOnClick={false}
          onClose={setPopupInfo}
        >
          <LockerInfo info={popupInfo} />
        </Popup>
      )}
    </ReactMapGL>
  );
};

const LockerList = ({ lockers, selectedLocker, onLockerClicked }) => {
  const LockerListItem = ({ locker }) => {
    console.log("rendering locker:", locker);
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

const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

const LockerSearchBar = ({ onSelectLocker }) => {
  const [lockers, setLockers] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [clickedLocker, setClickedLocker] = useState();

  // automatically set to the first result
  useEffect(() => {
    setClickedLocker(lockers[0]);
  }, [lockers]);

  const getZipCodeGeocode = async () => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?`;
    const params = new URLSearchParams();
    params.append("address", zipCode);
    params.append("key", API_KEY);
    const resp = await fetch(url + params, {
      headers: {},
      method: "GET",
    });
    return resp.json().then((obj) => {
      if (obj.results.length > 0) {
        console.log(obj.results[0]);
        console.log(
          "Setting zip code lat/lng to:",
          obj.results[0].geometry.location
        );
        const loc = obj.results[0].geometry.location;
        return loc;
      } else {
        console.log("no Results for zip code.");
        return {};
      }
    });
  };

  const getLockers = async (latLng) => {
    console.log("Getting Lockers...");
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const params = new URLSearchParams();
    console.log("Zip code lat lng:", latLng);
    params.append("key", API_KEY);
    params.append("keyword", "Amazon Locker");
    params.append("fields", "formatted_address,geometry,icon,photos")
    params.append("location", `${latLng.lat},${latLng.lng}`);
    params.append("rankby", "distance");

    const resp = await fetch(url + params, {
      headers: {},
      method: "GET",
    });
    resp.json().then((obj) => {
      console.log(obj.results)
      setLockers(
        obj.results.map((l) => {
          return {
            geometry: l.geometry.location,
            name: l.name,
            google_place_id: l.place_id,
            vicinity: l.vicinity,
          };
        })
      );
    });
  };

  const onLockerClick = (l) => {
    setClickedLocker(l);
  };

  const handleSubmitZipCode = async (event) => {
    event.preventDefault();
    getZipCodeGeocode()
      .then((l) => {
        return l;
      })
      .then(getLockers);
  };

  return (
    <div className="flex-col flex justify-start items-center">
      <p className="text-lg font-bold p-2">
        Enter a zip code to find a Locker
      </p>
      <form
        className="flex-row flex space-around justify-center pb-10"
        onSubmit={handleSubmitZipCode}
      >
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

      {lockers.length == 0 ? null : (
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

const mapStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

export const LockerMapAsk = LockerSearchBar;
