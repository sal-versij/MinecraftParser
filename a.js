// Global methods
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
	if (a > b)
		for (var i = a; i >= b; i += c)
			yield i;
	else
		for (var i = a; i <= b; i += c)
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

function extend(_, __) {
	[_a, __a] = [_, __];
	log(_a, __a,"1");
	for (var i in __a) {
		log(i, __a[i],"2");
		if (i in _a) {
			log(_a[i],"3")
			if (_a[i] instanceof Object) {
				log(_a[i],__a[i],"4")
				extend(_a[i], __a[i]);
			} else if(__a[i]) {
				log(__a[i],"5")
				_a[i] = __a[i];
			}
		} else if(__a[i]) {
			log(i,"6")
			_a[i] = __a[i];
		}
	}
}

function multi_str(s, t){
	var str = "";
	for(var i of range(t))
		str += s;
	return str;
}

function print(_, t=0) {
	if(!_)
		return multi_str('>',t) + " -@- \n";
	var str = "";
	str += multi_str('>',t) + _.name+"\n";
	for(var i in _.children)
		str += print(_.children[i], t + 1);
	return str;
}

// clicks all [show] link
$('.jslink:contains(show)').click();

var literal = /(\w+)/i;
var parameter = /<i>(.*?)<\/i>/i;
var multi_literal = /(\w+(\|\w+)+)/i;

var optional = /\[(.*?)\]/i;

var objs = {};
function elaborate(){
	$.each($('code:not(.parsed)'), function (i, e) {
		// get innerHTML and set .parsed to code to prevent double elaboration
		var htmls = log($(e).addClass('parsed').html().split(/\s+(?!…)/), "htmls");

		var htmls0 = literal.exec(htmls.shift());
		if (!htmls0)
			return;
		// first object
		var obj = {
			type: "command",
			name: htmls0[1],
			needed: true,
			children: {}
		};

		// objects elaborated (to handle multiple choise cases)
		var actual = [obj];

		// {"type": "","name": "","needed": ?,"children": {}}
		var _;
		for (var html of htmls) {
			if ((_ = parameter.exec(html))) {
				// handle 'html' as parameter
				var needed = html.match(optional) == null;
				$.each(actual, function (i, e) {
					e.children[_[1]] = {
						type: "parameter",
						name: _[1],
						needed: needed,
						children: {}
					};
					actual[i] = e.children[_[1]]
				});
			} else if ((_ = multi_literal.exec(html))) {
				// handle 'html' as multiple choise attribute
				_ = _[1].split('|');
				var needed = html.match(optional) == null;
				var _a = [];
				$.each(actual, function (i, e) {
					for (var j of _) {
						e.children[j] = {
							type: "attribute",
							name: j,
							needed: needed,
							children: {}
						};
						_a.push(e.children[j]);
					}
				});
				actual = _a;
			} else if ((_ = literal.exec(html))) {
				// handle 'html' as attribute
				var needed = html.match(optional) == null;
				$.each(actual, function (i, e) {
					e.children[_[1]] = {
						type: "attribute",
						name: _[1],
						needed: needed,
						children: {}
					};
					actual[i] = e.children[_[1]];
				});
			}
		}

		// cereate a button after the code binded to add the 'obj' content created before in the 'objs' global variable
		$('<button>')
		.text("GET")
		.on('click',
			(event) => {
			if (obj.name in objs)
				$.extend(true,objs[obj.name], obj);
			else
				objs[obj.name] = obj;
		})
		.insertAfter($(e));
	});
}
