import React, { useEffect, useState } from "react";

import {
  getCleanProductURL,
  getCleanAffiliatesLink,
  extractAsin,
  AsinRegex,
} from "./utils";
import ItemIframe from "./ItemIframe";

const ItemInputAndPreview = (props) => {
  const { setItemAsin, setItemAffiliatesLink } = props;

  const [userLink, setUserLink] = useState("");
  const [affiliatesLink, setAffiliatesLink] = useState("");
  const [asin, setAsin] = useState(null);

  useEffect(() => {
    setItemAffiliatesLink(affiliatesLink);
  }, [affiliatesLink]);

  const handleSubmit = () => {
    const url = getCleanProductURL(userLink);
    const extractedAsin = extractAsin(url);
    setItemAsin(extractedAsin);
    setAsin(extractedAsin);
    const affiliatesLink = getCleanAffiliatesLink(url);
    if (!affiliatesLink)
      return console.log("invalid URL - could not create affiliatesLink", url);
    if (!extractedAsin)
      return console.log("invalid URL - could not extract ASIN", url);
    setAffiliatesLink(affiliatesLink);
  };

  const isValidAsin = (input) => {
    return input && input.length === 10 && AsinRegex.test(input);
  };

  return (
    <div style={{ marginBottom: "50px" }}>
      <div>
        <label>URL</label>
        <input
          onChange={(e) => setUserLink(e.target.value)}
          placeholder="https://www.amazon.com/your-item-url/dp/product"
          type="url"
          id="product-url"
          name="product-url"
          required
          pattern="https?://.+"
        />
        <button
          onClick={handleSubmit}
          className="m-5 p-2 text-lg text-white bg-black font-bold rounded-xl"
          id="ask-btn"
        >
          FIND
        </button>
        <div>
          <a id="updated-url" target="_blank" href={affiliatesLink}>
            {affiliatesLink}
          </a>
          {asin && <ItemIframe asin={asin} />}
        </div>
      </div>
    </div>
  );
};

export default ItemInputAndPreview;
