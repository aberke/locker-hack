// helper: Ask cookie manager 


// codes are 4 characters.
const codeLength = 4;
// ask ids and codes are stored in a list of key-value pairs:
// asks=ask1-code1,ask2-code2,...askN-codeN
const asksCookieName = 'asks';
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function getAsksCookie() { return getCookie(asksCookieName); };


export const AskCookieManager = {

	generateCode: () => {
		return Array.from(Array(codeLength), () => Math.floor(Math.random() * 36).toString(36)).join('');
	},

	getCode: () => {
		// Gets a code already stored in the local browser cookies to reuse
		// Or generates a new one.
		let code = null;
		// check for code in cookies
		let asksCookie = getAsksCookie();
		let asksCodes = asksCookie.split(",");  // list of ["ask1-code1", ...]
		let codes = asksCodes.map((askCode) => askCode.split("-")[1]);
		code = codes[0] || AskCookieManager.generateCode();
		return code;
	},

	storeAsk: (askId, code) => {
		// If the askId and code are not already in the local browser cookies
		// put them there
		console.log('storeAsk', askId, code);
		// check for ask-code pair in cookies.
		let asksCookie = getAsksCookie();
		let asksCodes = asksCookie.split(",");  // list of ["ask1-code1", ...]
		let asks = asksCodes.map((askCode) => askCode.split("-")[0]);
		if (asks.indexOf(askId) < 0) {
			// add the new ask code
			asksCookie += ("," + askId + "-" + code);
		}
		let expires = "";
		let days = 365; // expire after 1 year unless updated.
		let date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
		document.cookie = asksCookieName + "=" + (asksCookie || "")  + expires + "; path=/";
	}
};

export const AskUrlManager = {
	getAskUrl: (askId, code) => {
		return '/ask/${askId}' + (code ? '?code=${code}' : '');
	}
}
