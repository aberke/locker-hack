import React from "react";
import { Marker } from "react-map-gl";

import { ReactComponent as LockerSvg } from "./locker.svg";

const SIZE = 25;

const LockerPins = ({ lockers, onLockerClicked }) => {
  return lockers.map((l, i) => {
    return (
      <Marker key={l.name} longitude={l.geometry.lng} latitude={l.geometry.lat}>
        <LockerSvg
          height={SIZE}
          style={{
            cursor: "pointer",
            stroke: "none",
            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
          }}
          onClick={() => onLockerClicked(l)}
        ></LockerSvg>
      </Marker>
    );
  });
};

export default LockerPins;