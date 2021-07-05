import React, { useState } from "react";
import fetch from "node-fetch";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

const LockerSearchBar = ({ google }) => {

  const [lockers, setLockers] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [zipCodeLatLng, setZipCodeLatLng] = useState({});
  const [mapCenter, setMapCenter] = useState({});
  const [clickedLocker, setClickedLocker] = useState("");
  const [activeMarker, setActiveMarker] = useState();
  const [showingMarkerInfo, setShowingMarkerInfo] = useState();

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
        setZipCodeLatLng(loc);
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
    params.append("location", `${latLng.lat},${latLng.lng}`);
    params.append("rankby", "distance");

    const resp = await fetch(url + params, {
      headers: {},
      method: "GET",
    });
    resp.json().then((obj) => {
      setLockers(
        obj.results.map((l) => {
          return {
            geometry: l.geometry.location,
            name: l.name,
            vicinity: l.vicinity,
          };
        })
      );
    });
  };

  const onLockerClick = (l) => {
    console.log("locker clicked:", l);
    setClickedLocker(l.name);
    setMapCenter(l.geometry);
  };

  const handleSubmitZipCode = async (event) => {
    event.preventDefault();
    getZipCodeGeocode()
      .then((l) => {
        return l;
      })
      .then(getLockers);
  };

  const LockerMarkers = () => {
    console.log(lockers[0]);
    const markers = lockers.map((l) => {
      return (
        <Marker
          onClick={(props, marker, e) => {
            onLockerClick(l);
            setActiveMarker(marker);
            setShowingMarkerInfo(true);
          }}
          name={l.name}
          key={l.name}
          title={l.name}
          position={l.geometry}
        />
      );
    });
    return markers;
  };

  const LockerListItem = ({ locker }) => {
    const isSelected = clickedLocker === locker.name;
    const selectedClass = isSelected ? "bg-gray-100 font-bold" : "";
    const className = `flex-col border-b mb-1 pl-1 pr-1 ${selectedClass}`;
    return (
      <button onClick={(e) => onLockerClick(locker)} className={className}>
        <h1>{locker.name}</h1>
      </button>
    );
  };

  return (
    <div className="flex-col flex justify-start items-center">
      <p className="text-lg font-bold p-2">
        Enter your zip code to find a Locker
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
            <Map
              containerStyle={mapStyle}
              google={google}
              zoom={12}
              initialCenter={zipCodeLatLng}
              center={mapCenter ? mapCenter : zipCodeLatLng}
            >
              {LockerMarkers()}
              <InfoWindow marker={activeMarker} visible={showingMarkerInfo}>
                <div>
                  <h1>{clickedLocker}</h1>
                </div>
              </InfoWindow>
            </Map>
          </div>
          <div className="h-full w-1/3 flex-col">
            <div className="bg-yellow">
              <p className="font-bold text-black text-lg">Lockers</p>
            </div>
            <div className="flex-col p-2 overflow-scroll h-full">
              {lockers.map((l) => (
                <LockerListItem locker={l} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

export const LockerMapAsk = GoogleApiWrapper({ apiKey: API_KEY })(LockerSearchBar);
