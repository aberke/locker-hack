// helper: Ask cookie manager 

export const AskCookieManager = {

	getCode: () => {
		// Gets a code already stored in the local browser cookies to reuse
		// Or generates a new one.
		// codes are 4 characters.
    	const codeLength = 4;
    	const code = Array.from(Array(codeLength), () => Math.floor(Math.random() * 36).toString(36)).join('');
 		return code;
	},

	storeAsk: (askId, code) => {
		// If the askId and code are not already in the local browser cookies
		// put them there
		console.log('storeAsk', askId, code)
		console.log('TODO');
	}
};

export const AskUrlManager = {
	getAskUrl: (askId, code) => {
		return '/ask/${askId}' + (code ? '?code=${code}' : '');
	}
}
