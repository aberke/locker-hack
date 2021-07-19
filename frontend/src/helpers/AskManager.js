// helper: Ask cookie manager 


// codes are 4 characters.
const codeLength = 4;

// asks and codes are stored as individual cookies
// the key for the cookie is ask-{askid}. 
// The value is the code.

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


export const AskCookieManager = {

	isValidCode: (code) => {
		return (typeof(code) == "string" && code.length == codeLength);
	},

	generateCode: () => {
		return Array.from(Array(codeLength), () => Math.floor(Math.random() * 36).toString(36)).join('');
	},

	getNewAskCode: () => {
		return AskCookieManager.generateCode();
	},
	
	setAskCodeCookie: (askId, code) => {
		let expires = "";
		let days = 365; // expire after 1 year unless updated.
		let date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
		document.cookie = `ask-${askId}=${code}${expires}; path=/`;	
	},

	deleteAskCodeCookie: (askId) => {
		console.log("TODO: delete ask code cookie for ask id", askId);
	},
	
	getAskCodeCookie: (askId) => {
		return getCookie(`ask-${askId}`);
	},

	getAsks: () => {
		// for the my-stuff page
		// get asks from the cookies
		// returns dictionary: {askId: code, ... for each ask in cookies}
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		let askCodes = {};
		for(let i = 0; i <ca.length; i++) {
			let c = ca[i].split("ask-");
			if (c.length != 2)
				continue;
			let askCookie = c[1].split("=");
			if (askCookie.length != 2)
				continue;
			let askId = askCookie[0];
			let code = askCookie[1];
			askCodes[askId] = code;
		}
		return askCodes;
	},
};

export const AskUrlManager = {
	getAskUrl: (askId, code) => {
		return `/ask/${askId}` + (code ? `?code=${code}` : ``);
	}
}
