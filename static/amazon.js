// hello world i have loaded
console.log('hello amazon');


const associatesID = 'mutualsupply-20';
const AmazonProductURLRegex = /https:\/\/www.amazon.com\/(([A-z0-9]|-)+\/)?(d|g)p\/([A-z0-9])+\/?/g;

// const AmazonProductURLRegex = /https:\/\/www.amazon.com\/([A-z0-9]|-)+\/(d|g)p\/([A-z0-9])+\/?/g;


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
const food_URL = 'https://www.amazon.com/gp/product/B00F6MFM3C/ref=ox_sc_act_image_1?smid=A10NTCWR0ILBQH&psc=1'
const computer_URL = 'https://www.amazon.com/dp/B07MXCQZ11/';

const urls = [
	pb_small_URL, pb_large_URL, food_URL, computer_URL,
	pb_large_URL.concat('/?some-stuff&and-more'),
	pb_large_URL.concat('/?track-me-bb'),
];
function testGoodUrl(url) {console.assert(url.match(AmazonProductURLRegex)[0])};
urls.forEach(testGoodUrl);

console.assert(food_URL.match(AmazonProductURLRegex)[0]);
console.assert(pb_small_URL.match(AmazonProductURLRegex)[0]);
console.assert(pb_large_URL.match(AmazonProductURLRegex)[0]);
console.assert(pb_large_URL.concat('/?some-stuff&and-more').match(AmazonProductURLRegex)[0]);
console.assert(pb_large_URL.concat('/?track-me-bb').match(AmazonProductURLRegex)[0]);

const bad_urls = [
	'https://www.not-amazon.com/Butter/dp/B07KWGSCW2',
	'https://www.amazon.com/Amazon-Brand-Creamy-Peanut-Butter/dp/',
];
bad_urls.forEach(function(url) {
	console.assert(url.match(AmazonProductURLRegex)==null);
});
