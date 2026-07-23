#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const viteBin = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');

const buildTargets = [
	{ variant: 'company', csKey: 'cs1', outDir: 'dist', base: '/', generateSeoPages: false },
	{ variant: 'rivere', csKey: 'cs1', outDir: 'dist/rivere', base: '/', generateSeoPages: true }
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

runNodeScript([path.join(projectRoot, 'tools', 'generate-responsive-images.js')]);

for (const target of buildTargets) {
	try {
		runNodeScript([path.join(projectRoot, 'tools', 'generate-sitemap.js')], {
			SITE_VARIANT: target.variant
		});
		runNodeScript([path.join(projectRoot, 'tools', 'generate-llms.js')], {
			SITE_VARIANT: target.variant
		});
	} catch (error) {
		console.warn('Skipping SEO index generation:', error.message);
	}

	runNodeScript(
		[
			viteBin,
			'build',
			'--base',
			target.base,
			'--outDir',
			target.outDir,
			'--emptyOutDir=false'
		],
		{ VITE_CS_KEY: target.csKey, VITE_SITE_VARIANT: target.variant }
	);

	runNodeScript([
		path.join(projectRoot, 'tools', 'apply-homepage-shell.js'),
		target.outDir,
		target.variant
	]);

	if (target.generateSeoPages) {
		runNodeScript([
			path.join(projectRoot, 'tools', 'generate-seo-pages.js'),
			target.outDir
		]);
		runNodeScript([
			path.join(projectRoot, 'tools', 'audit-seo.js'),
			target.outDir
		]);
	}
}

runNodeScript([path.join(projectRoot, 'tools', 'generate-sitemap.js')], {
	SITE_VARIANT: 'company'
});
runNodeScript([path.join(projectRoot, 'tools', 'generate-llms.js')], {
	SITE_VARIANT: 'company'
});
