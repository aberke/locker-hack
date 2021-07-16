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
  return getPlaceInfo(placeId)
    .then((obj) => {
      const l = obj.result;
      return {
        geometry: l.geometry.location,
        name: l.name,
        google_place_id: l.place_id,
        vicinity: l.vicinity,
      };
    })
    .catch((err) => {
      console.log("whoops", err);
    });
};
