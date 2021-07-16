import { getNearbyPlaces, getPlaceInfo } from "../../api/googlePlaces";

export const getLockersNearLatLng = async (latLng) => {
  return getNearbyPlaces({ latLng, keyword: "Amazon Locker" }).then((obj) => {
    return obj.results.map((l) => {
      return {
        geometry: l.geometry.location,
        name: l.name,
        google_place_id: l.place_id,
        vicinity: l.vicinity,
      };
    });
  });
};

export const getLockerInfoFromPlaceId = async (placeId) => {
  return getPlaceInfo({ placeId })
    .then((obj) => {
      console.log("locker info:", obj);
      return obj;
    })
    .catch((err) => {
      console.log("whoops", err);
    });
};
