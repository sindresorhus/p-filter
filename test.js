import test from 'ava';
import pFilter from '.';

// See `p-map` for more comprehensive tests
test('main', async t => {
	t.deepEqual(await pFilter([Promise.resolve(1), 2, 3, 4], x => x % 2), [1, 3]);
	t.deepEqual(await pFilter([1, 2, 3, 4], x => Promise.resolve(x % 2)), [1, 3]);
	t.deepEqual(await pFilter([1, Promise.resolve(2), 3, 4], (x, i) => i === 0 ? true : i === 1 ? Promise.resolve(true) : false), [1, 2]);
});

test('handles empty iterable', async t => {
	t.deepEqual(await pFilter([]), []);
});
