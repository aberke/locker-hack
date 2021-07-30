const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

export const geocodeAddress = async (address) => {
  console.log("looking up geocode location for address:", address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?`;
  const params = new URLSearchParams();
  params.append("address", address);
  params.append("key", API_KEY);
  const resp = await fetch(url + params, {
    headers: {},
    method: "GET",
  });
  if (!resp.ok) {
    throw new Error("Network response was not ok");
  }
  const obj = await resp.json();
  if (obj.results.length > 0) {
    return obj.results[0].geometry.location;
  } else {
    console.log("no Results for address", address);
    return {};
  }
};

export const getNearbyPlaces = async ({google, map, latLng, keyword}) => {
  return new Promise(function(resolve, reject) {
    const service = new google.maps.places.PlacesService(map);
    const request = {
      location: latLng,
      keyword: keyword,
      fields: ["icon", "formatted_address", "place_id", "geometry"],
      rankBy: google.maps.places.RankBy.DISTANCE,
    };
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(results);
      } else {
        throw new Error(`PlacesService response was not ok: ${status}`);
      }
    });
  });
};

export const getPlaceInfo = async (google, map, placeId) => {
  return new Promise(function (resolve, reject) {
    const service = new google.maps.places.PlacesService(map);
    const request = {
      placeId: placeId,
      fields: ["name", "formatted_address", "place_id", "geometry"],
    };
    service.getDetails(request, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
        resolve({
          ...place,
          location: place.geometry.location,
        });
      } else {
        throw new Error(`PlacesService response was not ok: ${status}`);
      }
    });
  });
};
