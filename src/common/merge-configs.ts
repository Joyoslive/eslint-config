import type { Config } from '../../types.ts';

const mergeConfigs = (...configs: Config[]): Config => {
	return configs.reduce<Config>((merged, config) => ({
		files: [...new Set([...merged.files ?? [], ...config.files ?? []])],
		plugins: { ...merged.plugins, ...config.plugins },
		rules: { ...merged.rules, ...config.rules },
		languageOptions: { ...merged.languageOptions, ...config.languageOptions }
	}), {});
};

export default mergeConfigs;
