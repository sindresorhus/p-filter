import {expectType} from 'tsd';
import pFilter from './index.js';

const places = [
	'Bangkok, Thailand',
	'Berlin, Germany',
	Promise.resolve('Tokyo, Japan'),
];

expectType<Promise<string[]>>(
	pFilter(places, async place =>
		place === 'Bangkok, Thailand' ? true : Promise.resolve(false),
	),
);
expectType<Promise<number[]>>(
	pFilter(new Set([1, 2]), number => number > 1, {concurrency: 1}),
);
