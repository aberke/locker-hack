import React, { useEffect, useState } from "react";
import FlatList from "flatlist-react";
import { 
  Map, 
  InfoWindow,
  GoogleApiWrapper 
} from "google-maps-react";
import {
  LockerLoadingContainer, 
  MapContainerStyle, 
  MapStyle
} from "./LockerMapStyling";
import LockerInfo from "./LockerInfo";
import { getLockersNearLatLng } from "./api";
import { geocodeAddress } from '../../api/googlePlaces'
import LockerMarkers from "./LockerMarkers";


const LockerList = ({
  lockers, 
  selectedLocker, 
  onLockerClicked, 
  visible 
}) => {
  const LockerListItem = ({ locker }) => {
    const isSelected = !selectedLocker ? false : selectedLocker.name === locker.name;
    const selectedClass = isSelected ? "bg-gray-100 font-bold" : "";
    const className = `flex-col border-b mb-1 p-2 w-full items-center ${selectedClass}`;
    return (
      <button onClick={(e) => onLockerClicked(locker)} className={className}>
        <h1>{locker.name}</h1>
      </button>
    );
  };
  if (!visible) {
    return <span></span>;
  }
  return (
    <div className="flex-col">
      <div className="bg-yellow">
        <p className="font-bold text-black text-lg">Lockers</p>
      </div>
      <FlatList
        list={lockers}
        renderItem={(l) => {
          return <LockerListItem key={l.google_place_id} locker={l} />;
        }}
        keyExtractor={(l) => l.name}
      />
    </div>
  );
};

const LockerSearchBar = ({ 
  google,
  onSelectLocker,
  locker=null,
  zoom=11,
}) => {
  const [lockers, setLockers] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [map, setMap] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [selectedLocker, setSelectedLocker] = useState(locker);
  
  const mapReady = (mapProps, map) => {
    setMap(map);
    map.setOptions({ styles: MapStyle });
  }

  const handleLookupLockers = async (event) => {
    event.preventDefault(); // Prevent default submission
    const latLng = await geocodeAddress(zipCode);
    if ('lat' in latLng) {
      setMapCenter(latLng);
      getLockers(latLng);
    }
  }

  const getLockers = (latLng) => {
    return getLockersNearLatLng(google, map, latLng).then((lockers) => {
      setLockers(lockers);
      if (!lockers.length) return;
      setSelectedLocker(lockers[0]);
    });
  };

  // handle the case when parent component updates locker (e.g. to null)
  useEffect(() => {
    setSelectedLocker(locker);
  }, [locker]);

  useEffect(() => {
    if (selectedLocker) {
      setMapCenter(selectedLocker.location);
    }
  }, [selectedLocker]);

  // automatically set to the first result
  useEffect(() => {
    if (!lockers.length) return;
    setSelectedLocker(lockers[0]);
  }, [lockers]);

  const onLockerClick = (l) => {
    setSelectedLocker(l);
    setMapCenter(l.location);
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
        {!!map && (
          <button onClick={handleLookupLockers} className="rounded-lg bg-yellow p-1 m-2">
            <p className="font-bold text-black">Submit</p>
          </button>
        )}
      </form>

      <div className="flex-row w-full flex items-start h-96">
        <div className="flex-shrink w-2/3 h-full">
        <Map
            containerStyle={MapContainerStyle} 
            google={google}
            onReady={mapReady}
            zoom={zoom}
            center={mapCenter}
            visible={!!mapCenter}
          >
            { LockerMarkers({google: google, lockers: lockers, onLockerClicked: onLockerClick}) }

            {!!selectedLocker && (
              <InfoWindow 
                position={selectedLocker.location} 
                visible={true}
                >
                <LockerInfo info={selectedLocker} />
              </InfoWindow>
            )}
          </Map>
        </div>
        <div className="h-full w-1/3 overflow-scroll">
          <LockerList
            visible={!!mapCenter}
            lockers={lockers}
            selectedLocker={selectedLocker}
            onLockerClicked={onLockerClick}
          />
        </div>
      </div>
      {!!selectedLocker && (
        <button
          className="m-2 m-5 p-2 text-lg text-white bg-black font-bold rounded-lg"
          onClick={() => onSelectLocker(selectedLocker)}
        >
          Select This Locker
        </button>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
  LoadingContainer: LockerLoadingContainer,
})(LockerSearchBar);
