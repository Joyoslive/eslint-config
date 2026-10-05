import { describe, expect, it } from 'vitest';
import mergeConfigs from '../../src/common/merge-configs.ts';

describe('mergeConfigs', () => {
	it('returns an empty config when no configs are provided', () => {
		expect(mergeConfigs()).toEqual({});
	});

	it('handles configs with missing optional fields', () => {
		expect(mergeConfigs({}, { rules: { first: ['warn'] } }, {})).toEqual({
			files: [],
			plugins: {},
			rules: { first: ['warn'] },
			languageOptions: {}
		});
	});

	it('deduplicates files within and across configs in first-seen order', () => {
		const merged = mergeConfigs(
			{ files: ['**/*.js', '**/*.js', '**/*.ts'] },
			{},
			{ files: ['**/*.ts', '**/*.tsx', '**/*.js'] },
			{ files: ['**/*.jsx'] }
		);

		expect(merged.files).toEqual(['**/*.js', '**/*.ts', '**/*.tsx', '**/*.jsx']);
		expect(mergeConfigs({ files: ['**/*.js', '**/*.js'] }).files).toEqual(['**/*.js']);
	});

	it('combines plugins and rules with later configs overriding shared keys', () => {
		const firstPlugin = {};
		const replacementPlugin = {};
		const secondPlugin = {};
		const finalRule = ['error', { option: true }];
		const merged = mergeConfigs(
			{ plugins: { shared: firstPlugin, first: firstPlugin }, rules: { shared: ['warn'], first: ['error'] } },
			{ plugins: { shared: replacementPlugin, second: secondPlugin }, rules: { shared: ['off'] } },
			{ rules: { shared: finalRule, third: ['warn'] } }
		);

		expect(merged.plugins).toEqual({ shared: replacementPlugin, first: firstPlugin, second: secondPlugin });
		expect(merged.plugins.shared).toBe(replacementPlugin);
		expect(merged.plugins.first).toBe(firstPlugin);
		expect(merged.plugins.second).toBe(secondPlugin);
		expect(merged.rules).toEqual({ shared: finalRule, first: ['error'], third: ['warn'] });
		expect(merged.rules.shared).toBe(finalRule);
	});

	it('merges language options shallowly, replacing nested options', () => {
		const parser = { parse: () => {} };
		const parserOptions = { sourceType: 'module' };
		const merged = mergeConfigs(
			{ languageOptions: { ecmaVersion: 2020, parser, parserOptions: { ecmaFeatures: { jsx: true } } } },
			{ languageOptions: { ecmaVersion: 2022, parserOptions } }
		);

		expect(merged.languageOptions).toEqual({ ecmaVersion: 2022, parser, parserOptions });
		expect(merged.languageOptions.parser).toBe(parser);
		expect(merged.languageOptions.parserOptions).toBe(parserOptions);
	});

	it('does not mutate inputs and creates new top-level collections', () => {
		const first = Object.freeze({
			files: Object.freeze(['**/*.js']),
			plugins: Object.freeze({ first: {} }),
			rules: Object.freeze({ first: ['warn'] }),
			languageOptions: Object.freeze({ ecmaVersion: 2020 })
		});
		const second = Object.freeze({
			files: Object.freeze(['**/*.ts']),
			rules: Object.freeze({ first: ['off'] })
		});
		const snapshot = structuredClone([first, second]);
		const merged = mergeConfigs(first, second);

		expect([first, second]).toEqual(snapshot);
		expect(merged).not.toBe(first);
		for (const field of ['files', 'plugins', 'rules', 'languageOptions']) {
			expect(merged[field]).not.toBe(first[field]);
		}
		expect(mergeConfigs(first, second)).toEqual(merged);
	});
});
