import type { Config } from '../types.ts';
import mergeConfigs from '../util/merge-configs.ts';
import solid from 'eslint-plugin-solid';
import prefixKeys from '../util/prefix-keys.ts';

const buildSolidConfig = (config: Config): Config => {
	return mergeConfigs(config, {
		plugins: { solid },
		rules: prefixKeys('solid/', getRules())
	});
};

export default buildSolidConfig;

const getRules = (): Exclude<Config['rules'], undefined> => {
	return {
		'components-return-once': ['error'],
		'event-handlers': ['warn'],
		'imports': ['warn'],
		'jsx-no-duplicate-props': ['error'],
		'jsx-no-script-url': ['error'],
		'jsx-no-undef': ['error', { typescriptEnabled: false }],
		'jsx-uses-vars': ['error'],
		'no-array-handlers': ['error'],
		'no-destructure': ['error'],
		'no-innerhtml': ['warn'],
		'no-proxy-apis': ['warn'],
		'no-react-deps': ['error'],
		'no-react-specific-props': ['error'],
		'no-unknown-namespaces': ['error'],
		'prefer-classlist': ['warn'],
		'prefer-for': ['error'],
		'prefer-show': ['warn'],
		'reactivity': ['error'],
		'self-closing-comp': ['warn'],
		'style-prop': ['error']
	};
};
