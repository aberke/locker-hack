import { getNearbyPlaces, getPlaceInfo } from "../../api/googlePlaces";

export const getLockersNearLatLng = async (google, map, latLng) => {
  return getNearbyPlaces({ google, map, latLng, keyword: "Amazon Locker" }).then((obj) => {
    return obj.map((l) => {
      return {
        location: l.geometry.location,
        name: l.name,
        google_place_id: l.place_id,
        vicinity: l.vicinity,
      };
    });
  });
};

export const getLockerInfoFromPlaceId = async (placeId) => {
  return getPlaceInfo(placeId)
    .then((obj) => {
      const l = obj.result;
      return {
        location: l.geometry.location,
        name: l.name,
        google_place_id: l.place_id,
        vicinity: l.vicinity,
        address: l.formatted_address,
      };
    })
    .catch((err) => {
      console.log("whoops", err);
    });
};
