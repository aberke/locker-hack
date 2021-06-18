import React, { useState } from "react";
import fetch from "node-fetch";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const API_KEY = "";

const LockerSearchBar = ({ google, lat, lng }) => {
  const [lockers, setLockers] = useState([]);
  console.log(API_KEY);
  console.log("lat and lng:", lat, lng);
  const getLockers = async () => {
    console.log("Getting Lockers...");
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`;
    const params = new URLSearchParams();
    params.append("key", API_KEY);
    params.append("keyword", "Amazon Locker");
    params.append("location", `${lng},${lat}`);
    params.append("rankby", "distance");

    const resp = await fetch(url + params, {
      headers: {},
      // mode: "cors",
      method: "GET",
    });
    console.log("Recieved Response: ", resp);
    resp.json().then((obj) => {
      setLockers(
        obj.results.map((l) => {
          return {
            geometry: l.geometry.location,
            name: l.name,
            vicinity: l.vicinity,
          };
        })
      );
    });
  };

  const onMarkerClick = (e) => {
    console.log("marker clicked:", e);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getLockers();
  };

  const LockerMarkers = () => {
    const markers = lockers.map((l) => {
      return (
        <Marker
          onClick={onMarkerClick}
          name={l.name}
          key={l.name}
          position={l.geometry.location}
        />
      );
    });
    console.log("markers:", markers);
    return markers;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Submit" />
      </form>

      <Map google={google} zoom={14}>
        <LockerMarkers />
        <Marker onClick={onMarkerClick} name={"Current location"} />
      </Map>
    </>
  );
};

const MapContainer = (props) => {
  const [placeName, setPlaceName] = useState("");
  const onMarkerClick = () => {
    console.log("marker click!");
  };
  const onInfoWindowClose = () => {
    console.log("marker click!");
  };

  return (
    <Map google={props.google} zoom={14}>
      <Marker onClick={onMarkerClick} name={"Current location"} />

      <InfoWindow onClose={onInfoWindowClose}></InfoWindow>
    </Map>
  );
};

const LockerMap = GoogleApiWrapper({ apiKey: API_KEY })(LockerSearchBar);

function Ask() {
  console.log("hello amazon/world I have loaded");

  const associatesID = "mutualsupply-20";
  const AmazonProductURLRegex = /https:\/\/www.amazon.com\/(([A-z0-9]|-)+\/)?(d|g)p\/([A-z0-9])+\/?\/([A-z0-9])+\/?/g;

  function getCleanProductURL(url) {
    let matched = url.match(AmazonProductURLRegex);
    if (!matched) return null;
    return matched[0];
  }
  function getCleanAffiliatesLink(url) {
    let cleanURL = getCleanProductURL(url);
    if (!cleanURL) return null;
    return (
      cleanURL + "?tag=" + associatesID + "&linkCode=ll1" + "&ref_=as_li_ss_tl"
    );
  }

  function submitURL() {
    const urlInput = document.getElementById("product-url");
    const url = urlInput.value;
    const affiliatesLink = getCleanAffiliatesLink(url);
    if (!affiliatesLink) {
      console.log("invalid URL");
    } else if (!!affiliatesLink) {
      document.getElementById("updated-url").innerHTML = affiliatesLink;
      document.getElementById("updated-url").href = affiliatesLink;
    }
  }

  return (
    <div className="ask">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-5">
            <h1 className="font-weight-light">just ASK</h1>

            <p>
              Do you want this?
              https://www.amazon.com/Amazon-Brand-Creamy-Peanut-Butter/dp/B07KWGSCW2
            </p>
            <LockerMap lat={-71.1150457} lng={42.3158227} />
            <p>Or this? https://www.amazon.com/gp/product/B00F6MFM3C/</p>
            <div>
              <label>URL</label>
              <input
                placeholder="https://www.amazon.com/your-item-url/dp/product"
                type="url"
                id="product-url"
                name="product-url"
                required
                pattern="https?://.+"
              />
              <button onClick={submitURL} id="ask-btn">
                ASK
              </button>
              Updated URL <a id="updated-url" target="_blank" href=""></a>
            </div>
            <p>
              TODO: and then make the iframe that shows the product and links to
              it with our affiliates ID. Something like:
            </p>
            <iframe
              style={{ width: "120px", height: "240px" }}
              marginWidth="0"
              marginHeight="0"
              scrolling="no"
              frameBorder="0"
              src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=tf_til&ad_type=product_link&tracking_id=mutualsupply-20&marketplace=amazon&amp;region=US&placement=B0825TR4TK&asins=B0825TR4TK&linkId=43d5b9dedbb9ac53d31b4b96523cc07e&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"
            ></iframe>
            <p>How?</p>
            <p>
              Grab the ASIN, maybe do what they're doing:
              https://github.com/fromdev/tools/blob/master/amazon-affiliate-link-maker.html
            </p>
            <p>See this:</p>
            <p>https://tools.fromdev.com/amazon-affiliate-link-maker.html</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ask;
