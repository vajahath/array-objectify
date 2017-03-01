// helper function to make nested objects
var assign = function(obj, keyPath, value, keepDuplications) {
	var lastKeyIndex = keyPath.length - 1;
	for (var i = 0; i < lastKeyIndex; i++) {
		var key = keyPath[i];
		if (!(key in obj))
			obj[key] = {};
		obj = obj[key];
	}
	if (!obj[keyPath[lastKeyIndex]]) {
		obj[keyPath[lastKeyIndex]] = {};
	}
	for (key in value) {
		if (obj[keyPath[lastKeyIndex]][key]) {
			if (keepDuplications) {
				obj[keyPath[lastKeyIndex]][key].push(value[key]);
			} else {
				if (obj[keyPath[lastKeyIndex]][key].indexOf(value[key]) < 0) {
					obj[keyPath[lastKeyIndex]][key].push(value[key]);
				}
			}
		} else {
			obj[keyPath[lastKeyIndex]][key] = [value[key]];
		}
	}

};

module.exports = function(hierarchy, data, keepRepetitoins) {
	var keepDuplications = keepRepetitoins || false;
	// generate raw data
	var raw = [];
	data.forEach(function(piece) {
		// figureout the ancestors
		var ancestors = [];
		hierarchy.forEach(function(field) {
			ancestors.push(piece[field]);
		});
		// figureout the content
		var content = {};
		for (var key in piece) {
			if (hierarchy.indexOf(key) > -1) {
				continue;
			}
			content[key] = piece[key];
		}
		// generate raw data
		raw.push({
			field: piece[hierarchy[hierarchy.length - 1]],
			ancestorPath: ancestors,
			content: content
		});
	});

	// build output
	var output = {};
	raw.forEach(function(item) {
		assign(output, item.ancestorPath, item.content, keepDuplications);
	});

	// oh yes
	return output;
};
