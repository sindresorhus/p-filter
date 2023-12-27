import {expectType} from 'tsd';
import pFilter, {pFilterIterable} from './index.js';

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

expectType<AsyncIterable<string>>(
	pFilterIterable(places, async place =>
		place === 'Bangkok, Thailand' ? true : Promise.resolve(false),
	),
);

async function * getPlaces(): AsyncIterable<string> {
	yield 'Bangkok, Thailand';
	yield 'Berlin, Germany';
	yield 'Tokyo, Japan';
}

expectType<AsyncIterable<string>>(
	pFilterIterable(getPlaces(), async place =>
		place === 'Bangkok, Thailand' ? true : Promise.resolve(false),
	),
);

expectType<AsyncIterable<number>>(
	pFilterIterable(new Set([1, 2]), number => number > 1, {concurrency: 1}),
);
