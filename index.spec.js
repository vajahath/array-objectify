/*global describe:true it:true*/

var expect = require('chai').expect;
var isEqual = require('lodash').isEqual;
var arrayObjectify = require('./index');
var lme = require('lme');

lme.s('starting tests');
lme.sline();

describe('Array to object converter', function() {
	it('successfully converts array to object with keepDuplications=true', function(done) {
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

		var expectedOutput = {
			'apple': {
				'yellow': {
					'content': [
						'Vitamin Y',
						'Vitamin X'
					],
					'nickName': [
						'Y-diple',
						'X-diple'
					]
				},
				'green': {
					'content': [
						'Vitamin green'
					],
					'nickName': [
						'green-mango'
					]
				}
			},
			'mango': {
				'red': {
					'content': [
						'Vitamin yellow',
						'Vitamin yellow'
					],
					'nickName': [
						'yellow-mango',
						'yellow-mango-dupe'
					]
				}
			}
		};

		var objectified = arrayObjectify(hierarchy, data, true);

		expect(isEqual(expectedOutput, objectified)).to.be.true;
		done();
	});
	it('successfully converts array to object with keepDuplications=false', function(done) {
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

		var expectedOutput = {
			'apple': {
				'yellow': {
					'content': [
						'Vitamin Y',
						'Vitamin X'
					],
					'nickName': [
						'Y-diple',
						'X-diple'
					]
				},
				'green': {
					'content': [
						'Vitamin green'
					],
					'nickName': [
						'green-mango'
					]
				}
			},
			'mango': {
				'red': {
					'content': [
						'Vitamin yellow'
					],
					'nickName': [
						'yellow-mango',
						'yellow-mango-dupe'
					]
				}
			}
		};

		var objectified = arrayObjectify(hierarchy, data, false);

		expect(isEqual(expectedOutput, objectified)).to.be.true;
		done();
	});

	it('successfully converts array to object without keepDuplications flag (equivallent to false)', function(done) {
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

		var expectedOutput = {
			'apple': {
				'yellow': {
					'content': [
						'Vitamin Y',
						'Vitamin X'
					],
					'nickName': [
						'Y-diple',
						'X-diple'
					]
				},
				'green': {
					'content': [
						'Vitamin green'
					],
					'nickName': [
						'green-mango'
					]
				}
			},
			'mango': {
				'red': {
					'content': [
						'Vitamin yellow'
					],
					'nickName': [
						'yellow-mango',
						'yellow-mango-dupe'
					]
				}
			}
		};

		var objectified = arrayObjectify(hierarchy, data);

		expect(isEqual(expectedOutput, objectified)).to.be.true;
		done();
	});
});
