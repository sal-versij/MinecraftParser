{ // Global methods
	function loadJS(url) {
		$.getScript(url, function () {
			console.debug(url + ' loaded');
		});
	}

	function log(..._) {
		console.log([..._]);
		return _[0];
	}

	function  * range(a, b = undefined, c = undefined, l = undefined) {
		!b && ([b, a] = [a, 0]);
		if (l) {
			while (a < 0)
				a += l;
			while (a >= l)
				a -= l;
			while (b < 0)
				b += l;
			while (b >= l)
				b -= l;
		}
		c = !c && (a > b ? -1 : 1) || c;
		if ((a > b) ^ (c < 0))
			return;
		if (a < b)
			for (var i = a; i <= b; i += c)
				yield i;
		else
			for (var i = a; i >= b; i += c)
				yield i;
	}

	// String's methods
	String.prototype.hash = function () {
		var str = this;
		var hash = 0;
		if (str.length <= 0)
			return hash;
		for (i = 0; i < str.length; i++) {
			char = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash;
		}
		return hash;
	};

	String.prototype.f = function (..._) {
		var s = this;
		for (var i in _) {
			s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), _[i]);
		}
		return s;
	};

	String.prototype.format = function (_) {
		var s = this;
		for (var i in _) {
			s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), _[i]);
		}
		return s;
	};

	// Array's methods
	Array.prototype.iterate = function  * (a, b, c) {
		var l = this.length;
		for (i of range(a, b, c, l)) {
			yield this[i];
		}
	};

	Array.prototype.get = function (a, b, c) {
		return [...this.iterate(a, b, c)];
	};
}

function extend(_, __) {
	[_a, __a] = [_, __];
	for (i in __a) {
		if (i in _a) {
			if (log(_a[i], "array")instanceof Array)
				_a[i].concat(__a[i]);
			else if (log(_a[i], "Object")instanceof Object)
				extend(_a[i], __a[i]);
			else
				_a[i] = log(__a[i], typeof __a[i]);
		}
	}
}

var literal = /(\w+)/i;
var parameter = /<i>(.*?)<\/i>/i;
var multi_literal = /(\w+(\|\w+)+)/i;

var optional = /\[(.*?)\]/i;

var objs = {};

$.each($('code'), function (i, e) {
	var htmls = log($(e).html().split(/\s+/), "htmls");

	var htmls0 = literal.exec(log(htmls.shift(), "htmls[0]"));
	if (!htmls0)
		return;
	var obj = {
		type: "command",
		name: htmls0[1],
		needed: true,
		children: []
	};

	var actual = [obj];

	// {"type": "","name": "","needed": true,"children": []}
	var _;
	for (var html of htmls) {
		log(html, "html");
		if (log((_ = parameter.exec(html)), "parameter")) {
			var needed = html.match(optional) == null;
			$.each(actual, function (i, e) {
				e.children.push({
					type: "parameter",
					name: _[1],
					needed: needed,
					children: []
				});
				actual[i] = actual[i].children[0];
			});
		} else if (log((_ = multi_literal.exec(html)), "multi_literal")) {
			_ = _[1].split('|');
			var needed = html.match(optional) == null;
			var _a = [];
			$.each(actual, function (i, e) {
				for (var j of _) {
					e.children.unshift({
						type: "attribute",
						name: j,
						needed: needed,
						children: []
					});
					_a.push(e.children[0]);
				}
			});
			actual = _a;
		} else if (log((_ = literal.exec(html)), "literal")) {
			var needed = html.match(optional) == null;
			$.each(actual, function (i, e) {
				e.children.push({
					type: "attribute",
					name: _[1],
					needed: needed,
					children: []
				});
				actual[i] = actual[i].children[0];
			});
		}
	}

	$('<button>')
	.text("GET")
	.on('click',
		(event) => {
		log(event)
		if (obj.name in objs)
			extend(objs[obj.name], obj);
		else
			objs[obj.name] = obj;
		log(obj);
	})
	.insertAfter($(e));
});
