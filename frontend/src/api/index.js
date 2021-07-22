import { getLockerInfoFromPlaceId } from "../features/lockers/api";

export const postAsk = async (askData) => {
  // Post an ask to our server with `askData`:
  // code: Ask code
  // locker_place_id: Google Place ID of the locker
  // note: Text note submitted by person
  // item_asin: Amazon ASIN of the item
  // item_url: URL of the item (amazon)
  let body = JSON.stringify(askData);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
  };
  const response = await fetch("/api/ask", requestOptions);

  if (response.status !== 201) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json().then((obj) => {
    return obj;
  });
};

export const getAsks = async () => {
  // Get all asks from server (unpaginated)
  const response = await fetch("/api/asks", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then(async (data) => {
    // Get Locker info as well, and attach it to ask object
    const lockerInfo = await Promise.all(
      data.asks.map((a) => getLockerInfoFromPlaceId(a.locker_place_id))
    );
    const asks = data.asks.map((ask, i) => {
      return {
        ...ask,
        locker: lockerInfo[i],
      };
    });
    console.log("asks:", asks);
    return asks;
  });
};

export const getAsk = async (askId) => {
  // Get ask from server
  const url = `/api/ask/${askId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json().then(async (ask) => {
    const lockerInfo = await getLockerInfoFromPlaceId(ask.locker_place_id);
    return {
      ...ask,
      locker: lockerInfo,
    };
  });
};
