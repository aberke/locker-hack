import React from "react";
import { Marker } from "google-maps-react";


const LockerMarkers = ({ 
    google, 
    lockers, 
    onLockerClicked = () => null,
}) => {
    return lockers.map((l, i) => {
        return(
            <Marker
                key={l.place_id || l.google_place_id}
                position={l.location}
                name={l.name}
                icon={{
                    url: "/locker.svg",
                    anchor: new google.maps.Point(32,32),
                    scaledSize: new google.maps.Size(32,32)
                }}
                onClick={(props, marker, e) => onLockerClicked(l, marker)}
            />
        );
    });
};

export default LockerMarkers;
