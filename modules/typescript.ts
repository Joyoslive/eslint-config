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
		'await-thenable': ['warn'],
		'class-literal-property-style': ['warn', 'getters'],
		'consistent-indexed-object-style': ['warn', 'record'],
		'consistent-type-assertions': [
			'error',
			{ assertionStyle: 'as', objectLiteralTypeAssertions: 'never', arrayLiteralTypeAssertions: 'never' }
		],
		'consistent-type-definitions': ['warn', 'type'],
		'consistent-type-exports': ['warn', { fixMixedExportsWithInlineTypeSpecifier: true }],
		'consistent-type-imports': ['warn', { prefer: 'type-imports', fixStyle: 'separate-type-imports' }],
		'default-param-last': ['error'],
		'max-params': ['error', { max: 5 }],
		'method-signature-style': ['error', 'property'],
		'no-array-delete': ['error'],
		'no-confusing-non-null-assertion': ['warn'],
		'no-confusing-void-expression': ['warn'],
		'no-duplicate-enum-values': ['error'],
		'no-duplicate-type-constituents': ['warn'],
		'no-dynamic-delete': ['error'],
		'no-empty-function': ['warn'],
		'no-empty-object-type': ['warn'],
		'no-explicit-any': ['error'],
		'no-extra-non-null-assertion': ['warn'],
		'no-extraneous-class': ['warn'],
		'no-floating-promises': ['warn'],
		'no-for-in-array': ['warn'],
		'no-implied-eval': ['error'],
		'no-import-type-side-effects': ['warn'],
		'no-invalid-void-type': ['error'],
		'no-loop-func': ['warn'],
		'no-meaningless-void-operator': ['warn'],
		'no-misused-new': ['error'],
		'no-misused-promises': ['error'],
		'no-misused-spread': ['warn'],
		'no-namespace': ['error'],
		'no-non-null-asserted-nullish-coalescing': ['warn'],
		'no-non-null-asserted-optional-chain': ['warn'],
		'no-redundant-type-constituents': ['warn'],
		'no-require-imports': ['error'],
		'no-this-alias': ['error'],
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
		'no-unsafe-enum-comparison': ['error'],
		'no-unsafe-function-type': ['error'],
		'no-unsafe-member-access': ['error'],
		'no-unsafe-return': ['error'],
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
		'no-useless-constructor': ['warn'],
		'no-useless-default-assignment': ['warn'],
		'no-useless-empty-export': ['warn'],
		'no-wrapper-object-types': ['error'],
		'non-nullable-type-assertion-style': ['warn'],
		'only-throw-error': ['error'],
		'prefer-as-const': ['warn'],
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
		'prefer-reduce-type-parameter': ['warn'],
		'prefer-return-this-type': ['warn'],
		'prefer-string-starts-ends-with': ['warn'],
		'promise-function-async': ['warn'],
		'related-getter-setter-pairs': ['error'],
		'return-await': ['warn'],
		'strict-void-return': ['warn'],
		'switch-exhaustiveness-check': [
			'error', {
				allowDefaultCaseForExhaustiveSwitch: true,
				considerDefaultExhaustiveForUnions: true,
				requireDefaultForNonUnion: true
			}
		],
		'triple-slash-reference': ['error'],
		'unbound-method': ['warn'],
		'unified-signatures': ['warn'],
		'use-unknown-in-catch-callback-variable': ['error']
	};
};
