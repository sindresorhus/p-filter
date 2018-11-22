export interface Options {
	/**
	 * Number of concurrently pending promises returned by `filterer`.
	 *
	 * @default Infinity
	 */
	concurrency?: number;
}

/**
 * Function which is called for every item in `input`. Expected to return a `Promise` or value.
 *
 * @param input - Iterated element.
 * @param index - Index of the element in the source array.
 */
export type Filterer<Element = any> = (input: Element, index: number) => boolean | Promise<boolean>

/**
 * Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `filterer` are fulfilled, or rejects if any of the promises reject. The fulfilled value is an Array of the fulfilled values returned from filterer in input order.
 *
 * @param input - Iterated over concurrently in the `filterer` function.
 * @param filterer - Function which is called for every item in `input`. Expected to return a `Promise` or value.
 * @param options - Options-object.
 *
 * @example
 *
 * const pFilter = require('p-filter');
 * const getWeather = require('get-weather'); // not a real module
 * 
 * const places = [
 * 	getCapital('Norway').then(info => info.name),
 * 	'Bangkok, Thailand',
 * 	'Berlin, Germany',
 * 	'Tokyo, Japan'
 * ];
 * 
 * const filterer = async place => {
 * 	const weather = await getWeather(place);
 * 	return weather.temperature > 30;
 * };
 * 
 * (async () => {
 * 	const result = await pFilter(places, filterer);
 * 
 * 	console.log(result);
 * 	//=> ['Bangkok, Thailand']
 * })();
 */
export default function <Element>(input: Iterable<Element>, filterer: Filterer<Element>, options?: Options): Promise<Element[]>;
