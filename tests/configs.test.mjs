import { describe, expect, it } from 'vitest';
import buildConfig from '../src/joy-eslint.ts';

const combinations = [
	{
		label: 'base',
		modules: { base: true, typescript: false, stylistic: false, solid: false },
		expectedFiles: ['**/*.js', '**/*.mjs']
	},
	{
		label: 'typescript',
		modules: { base: false, typescript: true, stylistic: false, solid: false },
		expectedFiles: ['**/*.ts', '**/*.tsx']
	},
	{
		label: 'stylistic',
		modules: { base: false, typescript: false, stylistic: true, solid: false },
		expectedFiles: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.jsx', '**/*.tsx']
	},
	{
		label: 'solid',
		modules: { base: false, typescript: false, stylistic: false, solid: true },
		expectedFiles: ['**/*.jsx', '**/*.tsx']
	},
	{
		label: 'all modules',
		modules: { base: true, typescript: true, stylistic: true, solid: true },
		expectedFiles: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.tsx', '**/*.jsx']
	},
	{
		label: 'no modules',
		modules: { base: false, typescript: false, stylistic: false, solid: false },
		expectedFiles: []
	}
];
const typescriptCombinations = combinations.filter(({ modules }) => modules.typescript);

describe('buildConfig', () => {
	it.each(combinations)('produces the same config on repeated calls: $label', ({ modules }) => {
		expect(buildConfig(modules)).toEqual(buildConfig(modules));
	});

	it.each(combinations)('uses exactly the expected file patterns: $label', ({ modules, expectedFiles }) => {
		expect(buildConfig(modules).files ?? []).toEqual(expectedFiles);
	});

	it.each(typescriptCombinations)('disables the core unused-vars rule: $label', ({ modules }) => {
		expect(buildConfig(modules).rules['no-unused-vars']).toEqual(['off']);
	});

	it.each(typescriptCombinations)('warns on the TypeScript unused-vars rule: $label', ({ modules }) => {
		expect(buildConfig(modules).rules['@typescript-eslint/no-unused-vars'][0]).toBe('warn');
	});

	it.each(typescriptCombinations)('registers the TypeScript plugin: $label', ({ modules }) => {
		expect(buildConfig(modules).plugins['@typescript-eslint']).toBeTruthy();
	});

	it.each(typescriptCombinations)('sets a parser: $label', ({ modules }) => {
		expect(buildConfig(modules).languageOptions.parser).toBeTruthy();
	});

	it('returns an empty config when no modules are specified', () => {
		expect(buildConfig({})).toEqual({});
	});
});
