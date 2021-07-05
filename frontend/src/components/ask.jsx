import React from "react";


// TODO: remove amazon related helper functions to separate module

const associatesID = 'mutualsupply-20';
const AmazonProductURLRegex = /https:\/\/www.amazon.com\/(([A-z0-9]|-)+\/)?(d|g)p\/([A-z0-9])+\/?\/([A-z0-9])+\/?/g;
var ASINRegex = new RegExp("([a-zA-Z0-9]{10})");


class Ask extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      asin: '',
      amazonASINLink: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log('hello amazon/world I have loaded');
  }

  handleInputChange(event) {
    const target = event.target;
    const url = this.getCleanProductURL(target.value);
    const asin = this.extractASIN(url);

    let amazonASINLink = this.makeAmazonProductTextImageIframeLink(asin);
    this.amazonASINLink = amazonASINLink;
    
    this.setState({
      url: url,
      asin: asin,
      amazonASINLink: amazonASINLink,
    });
  }

  getCleanProductURL(url) {
    let matched = url.match(AmazonProductURLRegex);
    if (!matched) return null;
    return matched[0];
  }
  getCleanAffiliatesLink(url) {
    let cleanURL = this.getCleanProductURL(url);
    if (!cleanURL) return null;
    return cleanURL + '?tag=' + associatesID;
  }

  handleSubmit() {
    const urlInput = document.getElementById('product-url');
    const url = urlInput.value;
    const affiliatesLink = this.getCleanAffiliatesLink(url);
    if (!affiliatesLink) { console.log('invalid URL'); }
    else if (!!affiliatesLink) {
      document.getElementById('updated-url').innerHTML = affiliatesLink;
      document.getElementById('updated-url').href = affiliatesLink;
    }
  }

  extractASIN (url) {
    var m = url.match(ASINRegex);
    if (m) {
        return m[0].replace(new RegExp('\/|\\?', 'g'), '');
    }
    return '';
  }
  isValidASIN (input) {
    return input && input.length === 10 && ASINRegex.test(input);
  }

  makeAmazonProductTextImageIframeLink(asin) {
    let link = "//ws-na.amazon-adsystem.com/widgets/q?";
    link += "ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link";
    link += "&tracking_id=mutualsupply-20&language=en_US&marketplace=amazon&region=US";
    link += "&placement=B0045TQLEG";
    link += "&asins=" + asin;
    // can style it and stuff
    link += "&show_border=false";
    link += "&link_opens_in_new_window=true";
    return link;
  }

  render() {

    return (
      <div className="ask">
        <div className="container">
          <div className="row align-items-center my-5">
            <div className="col-lg-5">
              <h1 className="font-weight-light">just ASK</h1>
              <p>
                Do you want this? https://www.amazon.com/Amazon-Brand-Creamy-Peanut-Butter/dp/B07KWGSCW2
              </p>
              <p>
              Or this? https://www.amazon.com/gp/product/B00F6MFM3C/
              </p>
              <div>
                <label>URL</label>
                <input 
                  onChange={this.handleInputChange} 
                  placeholder="https://www.amazon.com/your-item-url/dp/product" 
                  type="url" 
                  id="product-url" 
                  name="product-url" 
                  required 
                  pattern="https?://.+" />
                
                <button onClick={this.handleSubmit} id='ask-btn'>ASK</button>

                Updated URL <a id="updated-url" target="_blank" href=""></a>
              </div>

              <iframe 
                width="120px"
                height="240px"
                marginWidth="0" 
                marginHeight="0" 
                scrolling="no" 
                frameBorder="0" 
                src={this.amazonASINLink}>
               </iframe>

              <br/>
              <br/>
              <br/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ask;
