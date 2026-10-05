# @joyosdev/eslint

Just my personal eslint config, a constant work-in-progress

```sh
npm install --save-dev eslint @joyosdev/eslint
```

Requires ESLint 9 or newer. Add an `eslint.config.mjs`:

```js
import buildConfig from '@joyosdev/eslint';

export default [
	buildConfig({
		base: true,
		stylistic: true,
		// typescript: true,
		// jsx: true, // planned
		// solid: true,
	})
];
```

## Modules

Modules are opt-in; omitted options and `false` disable them.

| Option | Includes | File patterns |
| --- | --- | --- |
| `base` | Core ESLint rules | `**/*.js`, `**/*.mjs` |
| `typescript` | TypeScript parser and rules, including type-aware rules | `**/*.ts`, `**/*.tsx` |
| `stylistic` | Stylistic rules | `**/*.js`, `**/*.mjs`, `**/*.ts`, `**/*.jsx`, `**/*.tsx` |
| `solid` | Solid rules | `**/*.jsx`, `**/*.tsx` |

Enabling both `stylistic` and `solid` also adds stylistic JSX rules.
