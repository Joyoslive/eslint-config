import type { Config } from '../types.ts';
import prefixKeys from '../util/prefix-keys.ts';

const buildStylisticJsxConfig = (options?: { typescript?: boolean }): Config => {
	return {
		files: ['**/*.jsx', ...options?.typescript === true ? ['**/*.tsx'] : []],
		rules: prefixKeys('stylistic/', getRules())
	};
};

export default buildStylisticJsxConfig;

const getRules = (): Exclude<Config['rules'], undefined> => {
	return {
		'jsx-child-element-spacing': ['warn'],
		'jsx-closing-bracket-location': ['warn', 'tag-aligned'],
		'jsx-closing-tag-location': ['warn', 'tag-aligned'],
		'jsx-curly-brace-presence': ['warn', 'never'],
		'jsx-curly-newline': ['warn'],
		'jsx-curly-spacing': ['warn', 'never'],
		'jsx-equals-spacing': ['warn', 'never'],
		'jsx-first-prop-new-line': ['warn', 'multiline'],
		'jsx-function-call-newline': ['warn', 'multiline'],
		'jsx-indent': ['off'],
		'jsx-indent-props': ['warn', 'tab'],
		'jsx-max-props-per-line': ['warn', { maximum: 3 }],
		'jsx-newline': ['off'],
		'jsx-one-expression-per-line': ['warn', { allow: 'single-line' }],
		'jsx-pascal-case': ['off'],
		'jsx-props-no-multi-spaces': ['off'],
		'exp-jsx-props-style': ['off'],
		'jsx-quotes': ['warn', 'prefer-single'],
		'jsx-self-closing-comp': ['off'], // Covered by solid-eslint
		'jsx-sort-props': ['off'],
		'jsx-tag-spacing': [
			'warn',
			{
				closingSlash: 'never',
				beforeSelfClosing: 'never',
				afterOpening: 'never',
				beforeClosing: 'never'
			}
		],
		'jsx-wrap-multilines': [
			'warn',
			{
				declaration: 'parens-new-line',
				assignment: 'parens-new-line',
				return: 'parens-new-line',
				arrow: 'parens-new-line',
				condition: 'parens-new-line',
				logical: 'parens-new-line',
				prop: 'parens-new-line',
				propertyValue: 'parens-new-line'
			}
		]
	};
};
