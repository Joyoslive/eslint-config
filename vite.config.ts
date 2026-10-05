import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import packageJson from './package.json' with { type: 'json' };

const externalDependencies = [
	...Object.keys(packageJson.dependencies),
	...Object.keys(packageJson.peerDependencies)
];

export default defineConfig({
	build: {
		target: 'node20',
		minify: false,
		lib: {
			entry: fileURLToPath(new URL('./index.ts', import.meta.url)),
			formats: ['es'],
			fileName: 'index'
		},
		rolldownOptions: {
			external: (id) => externalDependencies.some((dependency) =>
				id === dependency || id.startsWith(`${dependency}/`)
			)
		}
	},
	test: {
		environment: 'node',
		include: ['tests/**/*.test.{ts,mjs}']
	}
});
