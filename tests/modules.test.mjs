import { describe, expect, it } from 'vitest';
import createBaseConfig from '../src/modules/base.ts';
import buildTsConfig from '../src/modules/typescript.ts';
import buildStylisticConfig from '../src/modules/stylistic.ts';
import buildStylisticJsxConfig from '../src/modules/stylistic-jsx.ts';
import buildSolidConfig from '../src/modules/solid.ts';

describe('module config builders', () => {
	it.each([
		{ name: 'base', build: createBaseConfig, files: ['**/*.js', '**/*.mjs', '**/*.jsx'] },
		{ name: 'typescript', build: buildTsConfig, files: ['**/*.ts', '**/*.tsx'] },
		{ name: 'stylistic', build: buildStylisticConfig, files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.jsx', '**/*.tsx'] },
		{ name: 'stylistic JSX', build: buildStylisticJsxConfig, files: ['**/*.jsx', '**/*.tsx'] },
		{ name: 'solid', build: buildSolidConfig, files: ['**/*.jsx', '**/*.tsx'] }
	])('declares its file patterns independently: $name', ({ build, files }) => {
		expect(build().files).toEqual(files);
	});
});
