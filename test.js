var arrayObjectify = require('./index');
var lme = require('lme');

var data = [{
	fruit: 'apple',
	color: 'red',
	content: 'Vitamin Red',
	nickName: 'red-diple',
},{
	fruit: 'apple',
	color: 'yellow',
	content: 'Vitamin yellow',
	nickName: 'yellow-diple',
},{
	fruit: 'apple',
	color: 'blue',
	content: 'Vitamin blue',
	nickName: 'blue-diple',
}];

var hierarchy = ['fruit', 'color'];

var objectified = arrayObjectify(hierarchy, data);

lme.s(objectified);
