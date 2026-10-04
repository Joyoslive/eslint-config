import type { Config } from '../types.ts';

const mergeConfigs = (configA: Config, configB: Config): Config => {
	return {
		files: [...configA.files ?? [], ...configB.files ?? []],
		plugins: { ...configA.plugins, ...configB.plugins },
		rules: { ...configA.rules, ...configB.rules },
		languageOptions: { ...configA.languageOptions, ...configB.languageOptions }
	};
};

export default mergeConfigs;
