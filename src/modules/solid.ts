import type { Config } from '../../types.ts';
import solid from 'eslint-plugin-solid';
import prefixKeys from '../common/prefix-keys.ts';

const buildSolidConfig = (): Config => {
	return {
		files: ['**/*.jsx', '**/*.tsx'],
		plugins: { solid },
		rules: prefixKeys('solid/', getRules())
	};
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
		'no-accessor-as-prop': ['off'],
		'no-array-handlers': ['error'],
		'no-boolean-enumerated-attribute': ['off'],
		'no-browser-globals-in-server-function': ['off'],
		'no-destructure': ['error'],
		'no-innerhtml': ['warn'],
		'no-invalid-server-capture': ['off'],
		'no-module-scope-reactive-primitive': ['off'],
		'no-proxy-apis': ['warn'],
		'no-react-deps': ['error'],
		'no-react-specific-props': ['error'],
		'no-restated-default-options': ['off'],
		'no-single-arg-create-effect': ['off'],
		'no-store-mutation-outside-setter': ['off'],
		'no-unknown-namespaces': ['error'],
		'no-unused-signal': ['off'],
		'no-write-in-pure-computation': ['off'],
		'prefer-classlist': ['warn'],
		'prefer-for': ['error'],
		'prefer-onSettled-for-side-effects': ['off'],
		'prefer-show': ['warn'],
		'prefer-structured-class': ['off'],
		'reactivity': ['error'],
		'removed-api': ['off'],
		'require-async-server-function': ['off'],
		'self-closing-comp': ['warn'],
		'style-prop': ['error'],
		'valid-use-server': ['off']
	};
};
