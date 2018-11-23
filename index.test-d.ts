import {expectType} from 'tsd-check';
import pFilter from '.'

expectType<Promise<string[]>>(pFilter(['foo'], s => !!s));
expectType<string[]>(await pFilter(['foo', Promise.resolve('foo')], s => !!s, {concurrency: 1}));
expectType<Promise<string[]>>(pFilter(['foo'], async s => !!s));
expectType<Promise<number[]>>(pFilter([Promise.resolve(1)], n => !!n));
expectType<Promise<string[]>>(pFilter(['foo'], () => false));
expectType<Promise<number[]>>(pFilter([1, Promise.resolve(1)], async (n, i) => i === 0 ? !!n : Promise.resolve(!n)));
expectType<Promise<number[]>>(pFilter([1, Promise.resolve(1)], async (n, i) => i === 0 ? !!n : Promise.resolve(!n), {concurrency: 2}));