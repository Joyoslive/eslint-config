import type { Config } from '../types.ts';
import prefixKeys from '../util/prefix-keys.ts';
import tseslint from 'typescript-eslint';

const buildTsConfig = (prev: Readonly<Config>) => {
	const newConfig = structuredClone(prev) as Config;
	removeShadowedRules(newConfig);

	newConfig.files?.push('**/*.ts');

	newConfig.plugins ??= {};
	newConfig.plugins['@typescript-eslint'] = tseslint.plugin;

	newConfig.rules = {
		...newConfig.rules,
		...prefixKeys('@typescript-eslint/', getRules())
	};

	newConfig.languageOptions = {
		parser: tseslint.parser,
		parserOptions: { projectService: true, allowDefaultProject: ['eslint.config.mjs'] }
	};

	return newConfig;
};

export default buildTsConfig;

const removeShadowedRules = (config: Config) => {
	const rules = config.rules;

	if (rules == null) {
		return;
	}

	// Covered by ts compiler
	delete rules['consistent-return'];
	delete rules['no-invalid-this'];
	delete rules['no-redeclare'];

	// Covered by tseslint
	delete rules['no-unused-private-class-members'];
	delete rules['no-unused-vars'];
	delete rules['default-param-last'];
	delete rules['default-case-last'];
	delete rules['no-implied-eval'];
	delete rules['no-loop-func'];
	delete rules['no-throw-literal']; // @typescript-eslint/only-throw-error
	delete rules['no-unused-expressions'];
	delete rules['no-useless-constructor'];
	delete rules['prefer-promise-reject-errors'];
};

const getRules = (): Exclude<Config['rules'], undefined> => {
	return {
		'adjacent-overload-signatures': ['warn'],
		'array-type': ['off'],
		'await-thenable': ['warn'],
		'ban-ts-comment': ['off'],
		'ban-tslint-comment': ['off'],
		'class-literal-property-style': ['warn', 'getters'],
		'class-methods-use-this': ['off'],
		'consistent-generic-constructors': ['off'],
		'consistent-indexed-object-style': ['warn', 'record'],
		'consistent-return': ['off'],
		'consistent-type-assertions': [
			'error',
			{ assertionStyle: 'as', objectLiteralTypeAssertions: 'never', arrayLiteralTypeAssertions: 'never' }
		],
		'consistent-type-definitions': ['warn', 'type'],
		'consistent-type-exports': ['warn', { fixMixedExportsWithInlineTypeSpecifier: true }],
		'consistent-type-imports': ['warn', { prefer: 'type-imports', fixStyle: 'separate-type-imports' }],
		'default-param-last': ['error'],
		'dot-notation': ['off'],
		'explicit-function-return-type': ['off'],
		'explicit-member-accessibility': ['off'],
		'explicit-module-boundary-types': ['off'],
		'init-declarations': ['off'],
		'max-params': ['error', { max: 5 }],
		'member-ordering': ['off'],
		'method-signature-style': ['error', 'property'],
		'naming-convention': ['off'],
		'no-array-constructor': ['off'],
		'no-array-delete': ['error'],
		'no-base-to-string': ['off'],
		'no-confusing-non-null-assertion': ['warn'],
		'no-confusing-void-expression': ['warn'],
		'no-deprecated': ['off'],
		'no-dupe-class-members': ['off'],
		'no-duplicate-enum-values': ['error'],
		'no-duplicate-type-constituents': ['warn'],
		'no-dynamic-delete': ['error'],
		'no-empty-function': ['warn'],
		'no-empty-interface': ['off'],
		'no-empty-object-type': ['warn'],
		'no-explicit-any': ['error'],
		'no-extra-non-null-assertion': ['warn'],
		'no-extraneous-class': ['warn'],
		'no-floating-promises': ['warn'],
		'no-for-in-array': ['warn'],
		'no-generated-empty-object-type': ['off'],
		'no-implied-eval': ['error'],
		'no-import-type-side-effects': ['warn'],
		'no-inferrable-types': ['off'],
		'no-invalid-this': ['off'],
		'no-invalid-void-type': ['error'],
		'no-loop-func': ['warn'],
		'no-loss-of-precision': ['off'],
		'no-magic-numbers': ['off'],
		'no-meaningless-void-operator': ['warn'],
		'no-misused-new': ['error'],
		'no-misused-promises': ['error'],
		'no-misused-spread': ['warn'],
		'no-mixed-enums': ['off'],
		'no-namespace': ['error'],
		'no-non-null-asserted-nullish-coalescing': ['warn'],
		'no-non-null-asserted-optional-chain': ['warn'],
		'no-non-null-assertion': ['off'],
		'no-redeclare': ['off'],
		'no-redundant-type-constituents': ['warn'],
		'no-require-imports': ['error'],
		'no-restricted-imports': ['off'],
		'no-restricted-types': ['off'],
		'no-shadow': ['off'],
		'no-this-alias': ['error'],
		'no-type-alias': ['off'],
		'no-unnecessary-boolean-literal-compare': ['warn'],
		'no-unnecessary-condition': ['warn'],
		'no-unnecessary-parameter-property-assignment': ['warn'],
		'no-unnecessary-qualifier': ['warn'],
		'no-unnecessary-template-expression': ['warn'],
		'no-unnecessary-type-arguments': ['warn'],
		'no-unnecessary-type-assertion': ['warn'],
		'no-unnecessary-type-constraint': ['warn'],
		'no-unnecessary-type-conversion': ['warn'],
		'no-unnecessary-type-parameters': ['warn'],
		'no-unsafe-argument': ['error'],
		'no-unsafe-assignment': ['error'],
		'no-unsafe-call': ['error'],
		'no-unsafe-declaration-merging': ['error'],
		'no-unsafe-enum-assignment': ['off'],
		'no-unsafe-enum-comparison': ['error'],
		'no-unsafe-function-type': ['error'],
		'no-unsafe-member-access': ['error'],
		'no-unsafe-return': ['error'],
		'no-unsafe-type-assertion': ['off'],
		'no-unsafe-unary-minus': ['error'],
		'no-unused-expressions': ['warn'],
		'no-unused-private-class-members': ['warn'],
		'no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'all',
				argsIgnorePattern: '^_',
				caughtErrors: 'all',
				caughtErrorsIgnorePattern: '^_',
				destructuredArrayIgnorePattern: '^_',
				reportUsedIgnorePattern: true
			}
		],
		'no-use-before-define': ['off'],
		'no-useless-constructor': ['warn'],
		'no-useless-default-assignment': ['warn'],
		'no-useless-empty-export': ['warn'],
		'no-var-requires': ['off'],
		'no-wrapper-object-types': ['error'],
		'non-nullable-type-assertion-style': ['warn'],
		'only-throw-error': ['error'],
		'parameter-properties': ['off'],
		'prefer-as-const': ['warn'],
		'prefer-destructuring': ['off'],
		'prefer-enum-initializers': ['off'],
		'prefer-find': ['warn'],
		'prefer-for-of': ['warn'],
		'prefer-function-type': ['error'],
		'prefer-includes': ['warn'],
		'prefer-literal-enum-member': ['error'],
		'prefer-namespace-keyword': ['error'],
		'prefer-nullish-coalescing': ['warn'],
		'prefer-optional-chain': ['warn'],
		'prefer-promise-reject-errors': ['error'],
		'prefer-readonly': ['warn'],
		'prefer-readonly-parameter-types': ['off'],
		'prefer-reduce-type-parameter': ['warn'],
		'prefer-regexp-exec': ['off'],
		'prefer-return-this-type': ['warn'],
		'prefer-string-starts-ends-with': ['warn'],
		'prefer-ts-expect-error': ['off'],
		'promise-function-async': ['warn'],
		'related-getter-setter-pairs': ['error'],
		'require-array-sort-compare': ['off'],
		'require-await': ['off'],
		'restrict-plus-operands': ['off'],
		'restrict-template-expressions': ['off'],
		'return-await': ['warn'],
		'sort-type-constituents': ['off'],
		'strict-boolean-expressions': ['off'],
		'strict-void-return': ['warn'],
		'switch-exhaustiveness-check': [
			'error', {
				allowDefaultCaseForExhaustiveSwitch: true,
				considerDefaultExhaustiveForUnions: true,
				requireDefaultForNonUnion: true
			}
		],
		'triple-slash-reference': ['error'],
		'typedef': ['off'],
		'unbound-method': ['warn'],
		'unified-signatures': ['warn'],
		'use-unknown-in-catch-callback-variable': ['error']
	};
};
