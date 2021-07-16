import React, { useEffect, useState } from "react";
import LockerPins from "./LockerPins";
import ReactMapGL, { Popup } from "react-map-gl";
import LockerInfo from "./LockerInfo";

export default ({
  lockers,
  selectedLocker,
  onLockerClicked,
  showPopup = false,
  zoom = 11,
}) => {
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
      <LockerPins
        lockers={lockers}
        onLockerClicked={onLockerClicked ? onLockerClicked : () => null}
      />
      {popupInfo && showPopup && (
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
