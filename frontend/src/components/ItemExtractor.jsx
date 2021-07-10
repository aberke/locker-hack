import React, { useEffect, useState } from "react";



const ItemInputAndPreview = (props) => {
  const { setASIN } = props;

  const associatesID = "mutualsupply-20";
  const ASINRegex = new RegExp("/([a-zA-Z0-9]{10})");
  const AmazonProductURLRegex =
    /https:\/\/www.amazon.com\/(([A-z0-9]|-)+\/)?(d|g)p\/?(([A-z0-9_-])+[\?|\/])?(([A-z0-9]){10}[\?|\/]?)/g;

  const [userLink, setUserLink] = useState("");
  const [iframeLink, setIframeLink] = useState("");
  const [asin, setAsin] = useState("");
  const [affiliatesLink, setAffiliatesLink] = useState("");

  useEffect(() => {
    setASIN(asin);
  }, [asin]);

  const getCleanProductURL = (url) => {
    let matched = url.match(AmazonProductURLRegex);
    if (!matched) return null;
    return matched[0];
  };

  const getCleanAffiliatesLink = (url) => {
    let cleanURL = getCleanProductURL(url);
    if (!cleanURL) return null;
    return cleanURL + "?tag=" + associatesID;
  };

  const extractASIN = (url) => {
    var m = url.match(ASINRegex);
    if (m) {
      const asin = m[0].replace(new RegExp("/|\\?", "g"), "");
      setAsin(asin);
      return asin;
    }
    return "";
  };

  const makeAmazonProductTextImageIframeLink = (asin) => {
    let link = "//ws-na.amazon-adsystem.com/widgets/q?";
    link +=
      "ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link";
    link +=
      "&language=en_US&marketplace=amazon&region=US";
    // link += "&placement=B0045TQLEG";
    link += "&asins=" + asin;
    link += "&tracking_id=" + associatesID;
    // can style it and stuff
    link += "&show_border=false";
    link += "&link_opens_in_new_window=true";
    return link;
  };

  const handleSubmit = () => {
    const url = getCleanProductURL(userLink);
    const extractedAsin = extractASIN(url);
    setIframeLink(makeAmazonProductTextImageIframeLink(extractedAsin));
    const affiliatesLink = getCleanAffiliatesLink(url);
    if (!affiliatesLink) {
      console.log("invalid URL");
    } else if (!!affiliatesLink) {
      setAffiliatesLink(affiliatesLink);
      setASIN(extractASIN);
    }
  };

  const isValidASIN = (input) => {
    return input && input.length === 10 && ASINRegex.test(input);
  };

  return (
    <div>
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
          id="ask-btn">
          FIND
        </button>
        Updated URL{" "}
        <a id="updated-url" target="_blank" href={affiliatesLink}>
          {affiliatesLink}
        </a>
      </div>

      <iframe
        title="product-iframe"
        width="120px"
        height="240px"
        marginWidth="0"
        marginHeight="0"
        scrolling="no"
        frameBorder="0"
        src={iframeLink}
      ></iframe>
    </div>
  );
};

export default ItemInputAndPreview;
