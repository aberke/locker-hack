// hello world i have loaded
console.log('hello amazon');


const associatesID = 'mutualsupply-20';
const AmazonProductURLRegex = /https:\/\/www.amazon.com\/([A-z0-9]|-)+\/dp\/([A-z0-9])+\/?/g;


function getCleanProductURL(url) {
	let matched = url.match(AmazonProductURLRegex);
	if (!matched) return null;
	return matched[0];
}
function getCleanAffiliatesLink(url) {
	cleanURL = getCleanProductURL(url);
	if (!cleanURL) return null;
	return cleanURL + '?tag=' + associatesID;
}


// TODO: write better unit tests
// poor unit tests:

const pb_small_URL = 'https://www.amazon.com/Amazon-Brand-Creamy-Peanut-Butter/dp/B07KWGSCW2';
const pb_large_URL = 'https://www.amazon.com/Amazon-Brand-Creamy-Peanut-Butter/dp/B07KWD9K4C';

console.assert(pb_small_URL.match(AmazonProductURLRegex)[0]);
console.assert(pb_large_URL.match(AmazonProductURLRegex)[0]);
console.assert(pb_large_URL.concat('/?some-stuff&and-more').match(AmazonProductURLRegex)[0]);
console.assert(pb_large_URL.concat('/?track-me-bb').match(AmazonProductURLRegex)[0]);

console.assert('https://www.not-amazon.com/Butter/dp/B07KWGSCW2'.match(AmazonProductURLRegex)==null);
console.assert('https://www.amazon.com/Amazon-Brand-Creamy-Peanut-Butter/dp/'.match(AmazonProductURLRegex)==null);
