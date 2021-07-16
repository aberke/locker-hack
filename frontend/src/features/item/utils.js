const AmazonProductURLRegex =
  /https:\/\/www.amazon.com\/(([A-z0-9]|-)+\/)?(d|g)p\/?(([A-z0-9_-])+[\?|\/])?(([A-z0-9]){10}[\?|\/]?)/g;
const associatesID = process.env.REACT_APP_AMAZON_ASSOCIATES_ID;

export const AsinRegex = new RegExp("/([a-zA-Z0-9]{10})");
export const getCleanProductURL = (url) => {
  let matched = url.match(AmazonProductURLRegex);
  if (!matched) return null;
  return matched[0];
};

export const getCleanAffiliatesLink = (url) => {
  let cleanURL = getCleanProductURL(url);
  if (!cleanURL) return null;
  return cleanURL + "?tag=" + associatesID;
};

export const extractAsin = (url) => {
  let m = url.match(AsinRegex);
  if (m) {
    const asin = m[0].replace(new RegExp("/|\\?", "g"), "");
    return asin;
  }
  return "";
};

export const makeAmazonProductTextImageIframeLink = (asin) => {
  let link = "//ws-na.amazon-adsystem.com/widgets/q?";
  link +=
    "ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link";
  link += "&language=en_US&marketplace=amazon&region=US";
  // link += "&placement=B0045TQLEG";
  link += "&asins=" + asin;
  link += "&tracking_id=" + associatesID;
  // can style it and stuff
  link += "&show_border=true";
  link += "&link_opens_in_new_window=true";
  return link;
};
