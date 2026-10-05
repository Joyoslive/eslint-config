import { describe, expect, it } from 'vitest';
import prefixKeys from '../../src/common/prefix-keys.ts';

describe('prefixKeys', () => {
	it('prefixes every top-level key and preserves values', () => {
		const nested = { name: 'nested' };
		const array = [1, 2];
		const callback = () => {};
		const record = { name: 'test', count: 42, enabled: false, empty: null, missing: undefined, nested, array, callback };

		expect(prefixKeys('app-', record)).toEqual({
			'app-name': 'test',
			'app-count': 42,
			'app-enabled': false,
			'app-empty': null,
			'app-missing': undefined,
			'app-nested': nested,
			'app-array': array,
			'app-callback': callback
		});
		const result = prefixKeys('app-', record);
		expect(result['app-nested']).toBe(nested);
		expect(result['app-array']).toBe(array);
		expect(result['app-callback']).toBe(callback);
	});

	it('returns an empty object for an empty record', () => {
		expect(prefixKeys('app-', {})).toEqual({});
	});

	it('an empty prefix returns a new record with the same keys and values', () => {
		const record = { name: 'test', count: 42 };
		const result = prefixKeys('', record);

		expect(result).toEqual(record);
		expect(result).not.toBe(record);
	});

	it('handles empty and numeric keys', () => {
		expect(prefixKeys('app-', { '': 'empty', 42: 'numeric' })).toEqual({
			'app-': 'empty',
			'app-42': 'numeric'
		});
	});

	it('does not mutate the input record', () => {
		const record = Object.freeze({ name: 'test', nested: Object.freeze({ count: 42 }) });

		prefixKeys('app-', record);

		expect(record).toEqual({ name: 'test', nested: { count: 42 } });
	});
});
