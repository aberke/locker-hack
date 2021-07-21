const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

export const geocodeAddress = async (address) => {
  console.log("looking up loc for address:", address);
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
  console.log("response!!!", resp);

  const obj = await resp.json();
  console.log("json:", obj);
  if (obj.results.length > 0) {
    console.log(obj.results[0]);
    console.log(
      "Setting zip code lat/lng to:",
      obj.results[0].geometry.location
    );
    const loc = obj.results[0].geometry.location;
    return loc;
  } else {
    console.log("no Results for zip code.");
    return {};
  }
};

export const getNearbyPlaces = async ({ latLng, keyword }) => {
  console.log("Getting Lockers...");
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
  const params = new URLSearchParams();
  console.log("Zip code lat lng:", latLng);
  params.append("key", API_KEY);
  params.append("keyword", keyword);
  params.append("fields", "formatted_address,geometry,icon,photos");
  params.append("location", `${latLng.lat},${latLng.lng}`);
  params.append("rankby", "distance");

  const resp = await fetch(url + params, {
    headers: {},
    method: "GET",
  });
  return resp.json();
};

export const getPlaceInfo = async (googlePlaceId) => {
  // Get the place details from the Google Places API.
  console.log("google place ID:", googlePlaceId);
  const url = "https://maps.googleapis.com/maps/api/place/details/json?";
  const params = new URLSearchParams();
  params.append("key", API_KEY);
  params.append("place_id", googlePlaceId);
  params.append("fields", "formatted_address,address_component,name,geometry");
  const resp = await fetch(url + params, {
    headers: {},
    method: "GET",
  });
  return resp.json();
};
