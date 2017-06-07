# Array Objectify
Hierarchically transform an array of similar objects into a single object.

[![npm](https://img.shields.io/npm/v/array-objectify.svg)](https://www.npmjs.com/package/array-objectify) [![Build Status](https://travis-ci.org/vajahath/array-objectify.svg?branch=master)](https://travis-ci.org/vajahath/array-objectify) [![Greenkeeper badge](https://badges.greenkeeper.io/vajahath/array-objectify.svg)](https://greenkeeper.io/) [![npm](https://img.shields.io/npm/dt/array-objectify.svg)](https://www.npmjs.com/package/array-objectify) 

![](https://raw.githubusercontent.com/vajahath/array-objectify/master/media/highlight.png)

## Install / Update

```bash
npm install --save array-objectify
```
### Syntax
```
output = arrayObjectify(hierarchy, data[, keepRepetetions])
```
- `hierarchy` is an `array`: Determines the order of parsing.
- `data` is an `obect`: Defines the data we want to transform.
- `keepRepetetions` is `boolean` (optional, default value is `false`): If this flag is set, child arrays of the result will contain the exact values gotten from the input data without checking for duplication. (look at the example)

## Usage


```javascript
const arrayObjectify = require('array-objectify');

// this is the data we want to parse into new object format
let data = [{
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
	fruit: 'apple',
	color: 'green',
	content: 'Vitamin green',
	nickName: 'green-mango',
}];

// now we've to mention the order of hierarchy in which array-objectify should parse the data
let hierarchy = ['fruit', 'color'];

// parse data in the order of given hierarchy
let objectified = arrayObjectify(hierarchy, data);
console.log(objectified);
/* output=>

{
	"apple": {
		"yellow": {
			"content": [
				"Vitamin Y",
				"Vitamin X"
			],
			"nickName": [
				"Y-diple",
				"X-diple"
			]
		},
		"green": {
			"content": [
				"Vitamin green"
			],
			"nickName": [
				"green-mango"
			]
		}
	},
	"mango": {
		"red": {
			"content": [
				"Vitamin yellow"
			],
			"nickName": [
				"yellow-mango"
			]
		}
	}
}

*/
```

## Things Explained
- We're passing an array of **similar objects** and we want that to be **hierarchically** parsed into an object.
- The syntax is `output = arrayObjectify(hierarchy, data, keepRepetetions)`.
  - `data` is the `array` of `objects` we want to convert.
  - `hierarchy` is an `array` of hierarchically ordered object field names in which the package should parse the data.
  - `keepRepetetions` is `Boolean` and this argument is optional. Default value is `false`.
  - The field names that are not mentioned in the `hierarchy` will be the child of the last parent. Consider the below example:
```js
let data =[
	{
		fruit: 'apple',
		color: 'yellow',
		content: 'Vitamin Y',
		nickName: 'Y-diple',
	},
	{
		fruit: 'apple',
		color: 'yellow',
		content: 'Vitamin X',
		nickName: 'X-diple',
	},
	{
		fruit: 'mango',
		color: 'red',
		content: 'Vitamin yellow',
		nickName: 'yellow-mango',
	},
	{
		fruit: 'mango',
		color: 'red',
		content: 'Vitamin yellow',
		nickName: 'yellow-mango-dupe',
	},
	{
		fruit: 'apple',
		color: 'green',
		content: 'Vitamin green',
		nickName: 'green-mango',
	}
]
```
Let's say we want to covert this whole array into an object, based on the field name `fruit`. And then each fruit need to be again ordered based on the field name `color`. Rest of the fields names (`content` and `nickName`) are local to each colored fruit. **So we should not want them to mention it on `hierarchy`**.
Thus the hierarchy goes like:
```js
let hierarchy = ['fruit', 'color'];
```
Those fields which are not mentioned in the `hierarchy` will come under the last hierarchical parent, in our case, the `color` field.
Now the parsed output would be as follows:
```js
let out = arrayObjectify(hierarchy, data); // keepRepetetions = fasle (default)
console.log(out);
```
output =>
```js
{
	"apple": {
		"yellow": {
			"content": ["Vitamin Y","Vitamin X"],
			"nickName": ["Y-diple","X-diple"]
		},
		"green": {
			"content": ["Vitamin green"],
			"nickName": ["green-mango"]
		}
	},
	"mango": {
		"red": {
			"content": ["Vitamin yellow"],
			"nickName": ["yellow-mango","yellow-mango-dupe"]
		}
	}
}

```
Let's run this again with `keepRepetetions` turned on, so that you can visually differentiate the action of `keepRepetetions` flag:
```js
let out = arrayObjectify(hierarchy, data, true);
console.log(out);
```
output =>
```js
{
	"apple": {
		"yellow": {
			"content": ["Vitamin Y","Vitamin X"],
			"nickName": ["Y-diple","X-diple"]
		},
		"green": {
			"content": ["Vitamin green"],
			"nickName": ["green-mango"]
		}
	},
	"mango": {
		"red": {
			"content": ["Vitamin yellow","Vitamin yellow"],
			"nickName": ["yellow-mango","yellow-mango-dupe"]
		}
	}
}
```
Look at the `mango` field: `Vitamin yellow` is repeating. In some usecases, it may requre things in that way. It will not repeat if `keepRepetetions` is turned off.

---

*Still unclear? Please rise an [issue](https://github.com/vajahath/array-objectify/issues).*

Enjoy :)

> Just in case, if you liked this package, [![PayPal][badge_paypal_donate]][paypal-donations]

## Change log
- **v1.0.1**
    - Better docs
	- Handling greenkeeper issues

- **v1.0.0**
    - Initial release

## License
MIT &copy; [Vajahath Ahmed](https://mycolorpad.blogspot.in)

[badge_paypal_donate]: https://cdn.rawgit.com/vajahath/cloud-codes/a01f087f/badges/paypal_donate.svg
[paypal-donations]: https://paypal.me/vajahath
