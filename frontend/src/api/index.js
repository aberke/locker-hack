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
  return response.json();
};
