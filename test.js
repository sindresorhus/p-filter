import test from 'ava';
import m from '.';

// See `p-map` for more comprehensive tests
test('main', async t => {
	t.deepEqual(await m([Promise.resolve(1), 2, 3, 4], x => x % 2), [1, 3]);
	t.deepEqual(await m([1, 2, 3, 4], x => Promise.resolve(x % 2)), [1, 3]);
});

test('handles empty iterable', async t => {
	t.deepEqual(await m([]), []);
});
