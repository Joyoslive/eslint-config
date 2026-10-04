export type ModuleName = | 'base' | 'stylistic' | 'typescript' | 'solid';

export type RuleSetting = string | [string, ...unknown[]];
export type Rules = Record<string, RuleSetting>;

export type Config = {
	plugins?: Record<string, unknown>;
	files?: string[];
	rules?: Rules;
	languageOptions?: Record<string, unknown>; // TODO: Maybe type this at some point
};
