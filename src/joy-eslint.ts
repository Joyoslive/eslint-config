import createBaseConfig from './modules/base.ts';
import buildStylisticConfig from './modules/stylistic.ts';
import buildStylisticJsxConfig from './modules/stylistic-jsx.ts';
import buildTsConfig from './modules/typescript.ts';
import type { ModuleName, Config } from '../types.ts';
import buildSolidConfig from './modules/solid.ts';
import mergeConfigs from './common/merge-configs.ts';

const buildConfig = (modules: Partial<Record<ModuleName, boolean>>): Config => {
	const configs: Config[] = [];

	if (modules.base === true) {
		configs.push(createBaseConfig());
	}

	if (modules.typescript === true) {
		configs.push(buildTsConfig());
	}

	if (modules.stylistic === true) {
		configs.push(buildStylisticConfig());
	}

	if (modules.stylistic && modules.solid /* || modules.react */) {
		configs.push(buildStylisticJsxConfig({ typescript: modules.typescript === true }));
	}

	if (modules.solid === true) {
		configs.push(buildSolidConfig());
	}

	return mergeConfigs(...configs);
};

export default buildConfig;
