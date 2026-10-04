import type { Config, Rules } from '../types.ts';
import stylistic from '@stylistic/eslint-plugin';
import prefixKeys from '../util/prefix-keys.ts';
import mergeConfigs from '../util/merge-configs.ts';

const buildStylisticConfig = (config: Config): Config => {
	return mergeConfigs(config, {
		plugins: { stylistic },
		rules: prefixKeys('stylistic/', getRules())
	});
};

export default buildStylisticConfig;

const getRules = (): Rules => {
	return {
		'array-bracket-newline': ['warn', { multiline: true }],
		'array-bracket-spacing': ['warn', 'never'],
		'array-element-newline': ['warn', { consistent: true }],
		'arrow-parens': ['warn', 'as-needed'],
		'arrow-spacing': ['warn', { before: true, after: true }],
		'block-spacing': ['warn', 'always'],
		'brace-style': ['warn', 'stroustrup', { allowSingleLine: true }],
		'comma-dangle': ['warn', 'never'],
		'comma-spacing': ['warn', { before: false, after: true }],
		'comma-style': ['warn', 'last'],
		'computed-property-spacing': ['warn', 'never'],
		'curly-newline': ['warn', { minElements: 1 }],
		'dot-location': ['error', 'property'],
		'eol-last': ['warn', 'always'],
		'function-call-argument-newline': ['warn', 'consistent'],
		'function-call-spacing': ['warn', 'never'],
		'function-paren-newline': ['warn', 'multiline'],
		'generator-star-spacing': ['warn', { before: true, after: false }],
		'implicit-arrow-linebreak': ['warn', 'beside'],
		'indent': ['warn', 'tab', { SwitchCase: 1 }],
		'indent-binary-ops': ['warn', 'tab'],
		'key-spacing': ['warn', { beforeColon: false, afterColon: true }],
		'keyword-spacing': ['warn', { before: true, after: true }],
		'max-len': ['warn', { code: 150, tabWidth: 2 }],
		'max-statements-per-line': ['warn', { max: 1, ignoredNodes: ['IfStatement'] }],
		'member-delimiter-style': [
			'error',
			{
				'multiline': {
					'delimiter': 'semi',
					'requireLast': true
				},
				'singleline': {
					'delimiter': 'semi',
					'requireLast': false
				},
				'multilineDetection': 'brackets'
			}
		],
		'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 1 }],
		'no-confusing-arrow': ['error', { allowParens: true }],
		'no-extra-parens': [
			'warn', { 
				nestedBinaryExpression: false,
				ternaryOperandBinaryExpressions: false,
				ignoreJSX: 'multi-line' 
			}
		],
		'no-extra-semi': ['warn'],
		'no-floating-decimal': ['error'],
		'no-mixed-operators': ['warn'],
		'no-mixed-spaces-and-tabs': ['warn'],
		'no-multi-spaces': ['warn', { ignoreEOLComments: true, exceptions: { Property: true } }],
		'no-trailing-spaces': ['warn'],
		'no-whitespace-before-property': ['error'],
		'nonblock-statement-body-position': ['warn', 'beside'],
		'object-curly-newline': ['warn', { multiline: true }],
		'object-curly-spacing': ['warn', 'always'],
		'object-property-newline': ['warn', { allowAllPropertiesOnSameLine: true }],
		'operator-linebreak': ['warn', 'after', { 'overrides': { '?': 'before', ':': 'before' } }],
		'padded-blocks': ['warn', 'never'],
		'quotes': ['warn', 'single'],
		'rest-spread-spacing': ['warn', 'never'],
		'semi': ['error'],
		'semi-spacing': ['warn', { after: true }],
		'space-before-blocks': ['warn', 'always'],
		'space-before-function-paren': ['warn', 'never'],
		'space-in-parens': ['warn', 'never'],
		'space-infix-ops': ['warn'],
		'switch-colon-spacing': ['warn', { after: true }],
		'template-curly-spacing': ['warn', 'never'],
		'template-tag-spacing': ['warn', 'never'],
		'type-annotation-spacing': ['warn', { before: false, after: true }],
		'type-generic-spacing': ['warn'],
		'type-named-tuple-spacing': ['warn'],
		'yield-star-spacing': ['warn', { before: true, after: false }]
	};
};
