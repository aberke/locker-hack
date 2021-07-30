
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
    return data.asks;
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
  return response.json();
};

export const postAsk = async (askData) => {
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

export const postAskerEmail = async (data) => {
  const askId = data.id;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(`/api/ask/${askId}/asker-email`, requestOptions);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response;
}

export const postNote = async (data) => {
  const askId = data.askId;
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(`/api/ask/${askId}/note`, requestOptions);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json().then((ask) => {
    return ask.notes;
  });
}
