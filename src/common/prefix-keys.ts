

type PrefixedRecord<P extends string, R extends Record<keyof R, unknown>> = { [Key in Extract<keyof R, string> as `${P}${Key}`]: R[Key] };

/**
 * Prefixes all top level keys of a `record` with a specified `prefix`
 *
 * @example
 * prefixKeys('app-', { name: 'test', count: 42 }) => { 'app-name': 'test', 'app-count': 42 }
 */
const prefixKeys =
	<P extends string, const R extends Record<string, unknown>>(prefix: P, record: R):
	PrefixedRecord<P, R> => {
		const entries = Object.entries(record)
			.map(([key, val]) => [`${prefix}${key}`, val] as const);

		return Object.fromEntries(entries) as PrefixedRecord<P, R>;
	};

export default prefixKeys;
