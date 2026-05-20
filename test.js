import test from 'ava';
import pFilter, {pFilterIterable} from './index.js';

// See `p-map` for more comprehensive tests
test('main', async t => {
	t.deepEqual(
		await pFilter([Promise.resolve(1), 2, 3, 4], x => x % 2),
		[1, 3],
	);
	t.deepEqual(
		await pFilter([1, 2, 3, 4], x => Promise.resolve(x % 2)),
		[1, 3],
	);
});

test('handles empty iterable', async t => {
	t.deepEqual(await pFilter([]), []);
});

test('empty iterable with explicit filterer returns empty array', async t => {
	t.deepEqual(await pFilter([], () => true), []);
});

test('concurrency=1 with preserveOrder=false preserves input order', async t => {
	t.deepEqual(
		await pFilter([1, 2, 3, 4], x => x % 2, {concurrency: 1, preserveOrder: false}),
		[1, 3],
	);
});

test('predicate rejection propagates and stops further evaluation', async t => {
	let count = 0;
	await t.throwsAsync(
		pFilter([1, 2, 3, 4], x => {
			count++;
			if (x === 2) {
				throw new Error('stop');
			}

			return true;
		}, {concurrency: 1}),
		{message: 'stop'},
	);
	t.is(count, 2);
});

test('handles async iterable input', async t => {
	const asyncIterable = {
		async * [Symbol.asyncIterator]() {
			yield 1;
			yield 2;
			yield 3;
			yield 4;
		},
	};
	t.deepEqual(await pFilter(asyncIterable, x => x % 2), [1, 3]);
});

test('pFilterIterable', async t => {
	const iterableToArray = async iterable => {
		const array = [];
		for await (const item of iterable) {
			array.push(item);
		}

		return array;
	};

	const rangeIterable = {
		async * [Symbol.asyncIterator]() {
			yield 1;
			yield 2;
			yield 3;
			yield 4;
		},
	};
	t.deepEqual(
		await iterableToArray(pFilterIterable(rangeIterable, x => x % 2)),
		[1, 3],
	);

	t.deepEqual(
		await iterableToArray(
			pFilterIterable(rangeIterable, x => Promise.resolve(x % 2)),
		),
		[1, 3],
	);

	t.deepEqual(
		await iterableToArray(
			pFilterIterable([Promise.resolve(1), 2, 3, 4], x => x % 2),
		),
		[1, 3],
	);
	t.deepEqual(
		await iterableToArray(
			pFilterIterable([1, 2, 3, 4], x => Promise.resolve(x % 2)),
		),
		[1, 3],
	);
	t.deepEqual(await iterableToArray(pFilterIterable([])), []);
});
