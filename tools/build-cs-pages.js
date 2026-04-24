#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const viteBin = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');

const buildTargets = [
	{ csKey: 'cs1', outDir: 'dist', base: '/' },
	{ csKey: 'cs1', outDir: 'dist/cs1', base: '/cs1/' },
	{ csKey: 'cs2', outDir: 'dist/cs2', base: '/cs2/' },
	{ csKey: 'cs3', outDir: 'dist/cs3', base: '/cs3/' },
	{ csKey: 'cs4', outDir: 'dist/cs4', base: '/cs4/' }
];

function runNodeScript(args, env = {}) {
	execFileSync(process.execPath, args, {
		cwd: projectRoot,
		stdio: 'inherit',
		env: {
			...process.env,
			...env
		}
	});
}

rmSync(distDir, { recursive: true, force: true });

try {
	runNodeScript([path.join(projectRoot, 'tools', 'generate-llms.js')]);
} catch (error) {
	console.warn('Skipping llms.txt generation:', error.message);
}

runNodeScript([path.join(projectRoot, 'tools', 'generate-responsive-images.js')]);

for (const target of buildTargets) {
	runNodeScript(
		[
			viteBin,
			'build',
			'--base',
			target.base,
			'--outDir',
			target.outDir
		],
		{ VITE_CS_KEY: target.csKey }
	);
}
