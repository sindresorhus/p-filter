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
