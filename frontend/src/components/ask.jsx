import React from "react";

function Ask() {
  console.log('hello amazon/world I have loaded');


  const associatesID = 'mutualsupply-20';
  const AmazonProductURLRegex = /https:\/\/www.amazon.com\/(([A-z0-9]|-)+\/)?(d|g)p\/([A-z0-9])+\/?/g;

  function getCleanProductURL(url) {
    let matched = url.match(AmazonProductURLRegex);
    if (!matched) return null;
    return matched[0];
  }
  function getCleanAffiliatesLink(url) {
    let cleanURL = getCleanProductURL(url);
    if (!cleanURL) return null;
    return cleanURL + '?tag=' + associatesID;
  }

  function submitURL() {
    const urlInput = document.getElementById('product-url');
    const url = urlInput.value;
    const affiliatesLink = getCleanAffiliatesLink(url);
    if (!affiliatesLink) { console.log('invalid URL'); }
    else if (!!affiliatesLink) {
      document.getElementById('updated-url').innerHTML = affiliatesLink;
      document.getElementById('updated-url').href = affiliatesLink;
    }
  }

  return (
    <div className="ask">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-5">
            <h1 class="font-weight-light">just ASK</h1>

            <p>
              Do you want this? https://www.amazon.com/Amazon-Brand-Creamy-Peanut-Butter/dp/B07KWGSCW2
              </p>
            <p>
            Or this? https://www.amazon.com/gp/product/B00F6MFM3C/
            </p>
            <div>
                <label>URL</label>
                <input placeholder="https://www.amazon.com/your-item-url/dp/product" type="url" id="product-url" name="product-url" required pattern="https?://.+" />

              
              <button onClick={submitURL} id='ask-btn'>ASK</button>

              Updated URL <a id="updated-url" target="_blank" href=""></a>
              </div>

            </div>
          </div>
        </div>
      </div>
  );
}

export default Ask;
