import createBaseConfig from './modules/base.ts';
import buildStylisticConfig from './modules/stylistic.ts';
import buildStylisticJsxConfig from './modules/stylistic-jsx.ts';
import buildTsConfig from './modules/typescript.ts';
import type { ModuleName, Config } from './types.ts';
import buildSolidConfig from './modules/solid.ts';

const buildConfig = (modules: Partial<Record<ModuleName, boolean>>): Config => {
	let config = modules.base === true ? createBaseConfig() : {};

	if (modules.typescript === true) {
		config = buildTsConfig(config);
	}

	if (modules.stylistic === true) {
		config = buildStylisticConfig(config);
	}

	if (modules.stylistic && modules.solid /* || modules.react */) {
		config = buildStylisticJsxConfig(config, { typescript: 'typescript' in modules });
	}

	if (modules.solid === true) {
		config = buildSolidConfig(config);
	}

	return config;
};

export default buildConfig;
