import { expect, test } from 'vitest';
import buildConfig from '../joy-eslint.ts';
import mergeConfigs from '../util/merge-configs.ts';

test('merges any number of configs with unique files and later overrides', () => {
	const first = {
		files: ['**/*.js', '**/*.js'],
		plugins: { first: {} },
		rules: { shared: ['warn'], first: ['error'] },
		languageOptions: { ecmaVersion: 2020 }
	};
	const snapshot = structuredClone(first);
	const plugin = { rule: () => {} };
	const merged = mergeConfigs(first, {}, {
		files: ['**/*.ts', '**/*.js'],
		plugins: { second: plugin },
		rules: { shared: ['off'] },
		languageOptions: { ecmaVersion: 2022 }
	});

	expect(merged.files).toEqual(['**/*.js', '**/*.ts']);
	expect(merged.rules).toEqual({ shared: ['off'], first: ['error'] });
	expect(merged.languageOptions).toEqual({ ecmaVersion: 2022 });
	expect(merged.plugins.second).toBe(plugin);
	expect(first).toEqual(snapshot);
	expect(mergeConfigs()).toEqual({});
	expect(mergeConfigs(first).files).toEqual(['**/*.js']);
});

test('every module combination builds independently and repeatedly', () => {
	const names = ['base', 'typescript', 'stylistic', 'solid'];
	for (let mask = 0; mask < 16; mask++) {
		const modules = Object.fromEntries(names.map((name, index) => [name, Boolean(mask & (1 << index))]));
		const config = buildConfig(modules);
		expect(buildConfig(modules)).toEqual(config);
		expect(new Set(config.files).size).toBe(config.files?.length ?? 0);
		expect(config.files?.includes('**/*.ts') ?? false).toBe(modules.typescript);
		expect(config.files?.includes('**/*.tsx') ?? false).toBe(modules.typescript && modules.stylistic && modules.solid);
		if (modules.typescript) {
			expect(config.rules['no-unused-vars']).toEqual(['off']);
			expect(config.rules['@typescript-eslint/no-unused-vars'][0]).toBe('warn');
			expect(config.plugins['@typescript-eslint']).toBeTruthy();
			expect(config.languageOptions.parser).toBeTruthy();
		}
	}
	expect(buildConfig({})).toEqual({});
});
