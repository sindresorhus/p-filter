import {Options} from 'p-map';

/**
 * Filter promises concurrently.
 *
 * @param input - Iterated over concurrently in the `filterer` function.
 * @param filterer - The filterer function that decides whether an element should be included into result.
 */
export default function pFilter<ValueType>(
	input: Iterable<ValueType | PromiseLike<ValueType>>,
	filterer: (
		element: ValueType,
		index: number
	) => boolean | PromiseLike<boolean>,
	options?: Options
): Promise<ValueType[]>;

export {Options} from 'p-map';
