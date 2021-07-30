import React, { useState } from "react";
import { getPlaceInfo } from "../../api/googlePlaces";
import { 
    Map,
    GoogleApiWrapper 
} from "google-maps-react";
import LockerMarkers from "./LockerMarkers";
import {
    LockerLoadingContainer, 
    MapContainerStyle, 
    MapStyle
} from "./LockerMapStyling";


const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

const LockerLocation = ({ ask, google }) => {
    let zoom = 15;
    const [locker, setLocker] = useState(null);
    const lockerPlaceId = ask.locker_place_id;
    
    // get the place info
    const fetchPlaceInfo = async (mapProps, map) => {
        const {google} = mapProps;
        const resp = await getPlaceInfo(google, map, lockerPlaceId);
        setLocker(resp);
    }
    const mapLoaded = (mapProps, map) => {
        map.setOptions({ styles: MapStyle });
        fetchPlaceInfo(mapProps, map);
    }

    return (
        <div>
            <div className="flex-shrink w-64 h-64 m-3">
                <Map
                    containerStyle={MapContainerStyle} 
                    google={google}
                    onReady={mapLoaded}
                    zoom={zoom}
                    center={locker && locker.geometry ? locker.geometry.location : null}
                >
                    { LockerMarkers({google: google, lockers: locker ? [locker] : []}) }
                </Map>
            </div>
            <div className="flex-col">
                {locker && locker.name && (
                    <p className="font-bold text-left">
                        {locker.name}
                    </p>
                )}
                {locker ? locker.formatted_address.split(",").map((addressLine) => (
                    <div
                    key={addressLine.trim().split(" ").join("-")}
                    className="flex-row justify-left"
                    >
                    {addressLine}
                    </div>
                )) : null}
            </div>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: API_KEY,
    LoadingContainer: LockerLoadingContainer
})(LockerLocation);
