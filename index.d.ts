import type {Options} from 'p-map';

/**
Filter promises concurrently.

@param input - Iterated over concurrently in the `filterer` function.
@param filterer - The filterer function that decides whether an element should be included in the result.
@param options - See the [`p-map` options](https://github.com/sindresorhus/p-map#options).
@returns A `Promise` that is fulfilled when all promises in `input` and all promises returned from `filterer` are fulfilled, or rejects if any of the promises reject. The fulfilled value is an `Array` of the input elements for which `filterer` returns, or resolves to, `true`, in input order.

@example
```
import pFilter from 'p-filter';
import getWeather from 'get-weather'; // Not a real module

const places = [
	getCapital('Norway').then(info => info.name),
	'Bangkok, Thailand',
	'Berlin, Germany',
	'Tokyo, Japan',
];

const filterer = async place => {
	const weather = await getWeather(place);
	return weather.temperature > 30;
};

const result = await pFilter(places, filterer);

console.log(result);
//=> ['Bangkok, Thailand']
```
*/
export default function pFilter<ValueType>(
	input: Iterable<ValueType | PromiseLike<ValueType>>,
	filterer: (
		element: ValueType,
		index: number
	) => boolean | PromiseLike<boolean>,
	options?: Options
): Promise<ValueType[]>;

/**
Filter promises concurrently.

@param iterable - Iterated over concurrently in the `filterer` function.
@param filterer - The filterer function that decides whether an element should be included in the result.
@param options - See the [`p-map` options](https://github.com/sindresorhus/p-map#options).
@returns An async iterable that concurrently awaits the promises in `iterable` and the promises returned from `filterer`, yielding the input elements for which `filterer` returns, or resolves to, `true`.

@example
```
import {pFilterIterable} from 'p-filter';
import getWeather from 'get-weather'; // Not a real module

async function * getPlaces() {
	const info = await getCapital('Norway');

	yield info.name;
	yield 'Bangkok, Thailand';
	yield 'Berlin, Germany';
	yield 'Tokyo, Japan';
}

const places = getPlaces();

const filterer = async place => {
	const weather = await getWeather(place);
	return weather.temperature > 30;
};

for await (const element of pFilterIterable(places, filterer)) {
	console.log(element);
}
//=> 'Bangkok, Thailand'
```
*/
export function pFilterIterable<ValueType>(
	iterable:
	| AsyncIterable<ValueType | PromiseLike<ValueType>>
	| Iterable<ValueType | PromiseLike<ValueType>>,
	filterer: (
		element: ValueType,
		index: number
	) => boolean | PromiseLike<boolean>,
	options?: Options
): AsyncIterable<ValueType>;

export {Options} from 'p-map';
