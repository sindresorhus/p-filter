'use strict';
const pMap = require('p-map');

module.exports = (iterable, filterer, opts) =>
	pMap(iterable, (el, i) => Promise.all([filterer(el, i), el]), opts)
		.then(values => values.filter(x => Boolean(x[0])).map(x => x[1]));
