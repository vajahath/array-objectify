var arrayObjectify = require('./index');
var lme = require('lme');

var data = [{
	fruit: 'apple',
	color: 'yellow',
	content: 'Vitamin Y',
	nickName: 'Y-diple',
}, {
	fruit: 'apple',
	color: 'yellow',
	content: 'Vitamin X',
	nickName: 'X-diple',
}, {
	fruit: 'mango',
	color: 'red',
	content: 'Vitamin yellow',
	nickName: 'yellow-mango',
}, {
	fruit: 'mango',
	color: 'red',
	content: 'Vitamin yellow',
	nickName: 'yellow-mango-dupe',
}, {
	fruit: 'apple',
	color: 'green',
	content: 'Vitamin green',
	nickName: 'green-mango',
}];


var hierarchy = ['fruit', 'color'];

var objectified = arrayObjectify(hierarchy, data, true);

lme.s(objectified);
