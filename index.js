// helper function to make nested objects
var assign = function(obj, keyPath, value) {
	var lastKeyIndex = keyPath.length - 1;
	for (var i = 0; i < lastKeyIndex; i++) {
		var key = keyPath[i];
		if (!(key in obj))
			obj[key] = {};
		obj = obj[key];
	}
	obj[keyPath[lastKeyIndex]] = value;
};

module.exports = function(hierarchy, data) {
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
		assign(output, item.ancestorPath, item.content);
	});

	// oh yes
	return output;
};
