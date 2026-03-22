# p-filter

> Filter promises concurrently

Useful when you need to run promise-returning and async functions concurrently with different inputs and get a filtered result.

## Install

```sh
npm install p-filter
```

## Usage

```js
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

## API

### pFilter(input, filterer, options?)

Returns a `Promise` that is fulfilled when all promises in `input` and all promises returned from `filterer` are fulfilled, or rejects if any of the promises reject. The fulfilled value is an `Array` of the input elements for which `filterer` returns, or resolves to, `true`, in input order.

#### input

Type: `Iterable<Promise<unknown> | unknown>`

Iterated over concurrently in the `filterer` function.

#### filterer(element, index)

Type: `Function`

The filterer function that decides whether an element should be included in the result. Expected to return `boolean | Promise<boolean>`.

#### options

Type: `object`

See the [`p-map` options](https://github.com/sindresorhus/p-map#options).

##### concurrency

Type: `number`\
Default: `Infinity`\
Minimum: `1`

The number of concurrently pending promises returned by `filterer`.

### pFilterIterable(iterable, filterer, options?)

Returns an async iterable that concurrently awaits the promises in `iterable` and the promises returned from `filterer`, yielding the input elements for which `filterer` returns, or resolves to, `true`.

```js
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

#### iterable

Type: `AsyncIterable<Promise<unknown> | unknown> | Iterable<Promise<unknown> | unknown>`

Iterated over concurrently in the `filterer` function.

#### filterer(element, index)

Type: `Function`

The filterer function that decides whether an element should be included in the result. Expected to return `boolean | Promise<boolean>`.

#### options

Type: `object`

See the [`p-map` options](https://github.com/sindresorhus/p-map#options).

##### concurrency

Type: `number`\
Default: `Infinity`\
Minimum: `1`

The number of concurrently pending promises returned by `filterer`.

## Related

- [p-locate](https://github.com/sindresorhus/p-locate) - Get the first fulfilled promise that satisfies the provided testing function
- [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
- [p-times](https://github.com/sindresorhus/p-times) - Run promise-returning and async functions a specific number of times concurrently
- [More…](https://github.com/sindresorhus/promise-fun)
