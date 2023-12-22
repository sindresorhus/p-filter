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
	const rangeIterable = {
		async * [Symbol.asyncIterator]() {
			yield 1;
			yield 2;
			yield 3;
			yield 4;
		},
	};
	const iterable = pFilterIterable(rangeIterable, x => x % 2);
	const results = [];
	for await (const x of iterable) {
		results.push(x);
	}

	t.deepEqual(results, [1, 3]);

	const iterable2 = pFilterIterable(rangeIterable, x =>
		Promise.resolve(x % 2),
	);
	const results2 = [];
	for await (const x of iterable2) {
		results2.push(x);
	}

	t.deepEqual(results2, [1, 3]);
});
