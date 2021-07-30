import React from "react";
import { makeAmazonProductTextImageIframeLink } from "./utils";

export default ({ asin }) => (
  <iframe
    style={{ margin: "auto" }}
    title="product-iframe"
    width="120px"
    height="240px"
    marginWidth="0"
    marginHeight="0"
    scrolling="no"
    frameBorder="0"
    src={makeAmazonProductTextImageIframeLink(asin)}
  ></iframe>
);
