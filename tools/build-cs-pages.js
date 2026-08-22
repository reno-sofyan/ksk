#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readdirSync, rmSync } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const viteBin = path.join(projectRoot, 'node_modules', 'vite', 'bin', 'vite.js');

const buildTargets = [
	{ variant: 'company', csKey: 'cs1', outDir: 'dist', base: '/', generateSeoPages: false },
	{ variant: 'rivere', csKey: 'cs1', outDir: 'dist/rivere', base: '/', generateSeoPages: true },
	{ variant: 'royal', csKey: 'royal', outDir: 'dist/royalkinara', base: '/', generateSeoPages: false },
	{ variant: 'ksk', csKey: 'ksk', outDir: 'dist/ksk', base: '/', generateSeoPages: false }
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

function pruneRoyalAssets() {
	const imagesDir = path.join(projectRoot, 'dist', 'royalkinara', 'images');
	if (!fsExists(imagesDir)) return;
	const usedFiles = new Set([
		'1.png',
		'2.png',
		'location.jpg',
		'logo-kinara.png',
		'siteplan.png'
	]);
	const usedOptimizedDirs = new Set([
		'royalcnn-1',
		'royalcnn-2',
		'royalcnn-location',
		'royalcnn-logo-kinara',
		'royalcnn-siteplan'
	]);

	for (const entry of readdirSync(imagesDir)) {
		if (entry === 'optimized') {
			const optimizedDir = path.join(imagesDir, entry);
			for (const optimizedEntry of readdirSync(optimizedDir)) {
				if (!usedOptimizedDirs.has(optimizedEntry)) {
					rmSync(path.join(optimizedDir, optimizedEntry), { recursive: true, force: true });
				}
			}
		} else if (entry === 'royalcnn') {
			const royalImagesDir = path.join(imagesDir, entry);
			for (const assetEntry of readdirSync(royalImagesDir)) {
				if (!usedFiles.has(assetEntry)) {
					rmSync(path.join(royalImagesDir, assetEntry), { recursive: true, force: true });
				}
			}
		} else {
			rmSync(path.join(imagesDir, entry), { recursive: true, force: true });
		}
	}
}

function pruneKskAssets() {
	const imagesDir = path.join(projectRoot, 'dist', 'ksk', 'images');
	if (!fsExists(imagesDir)) return;
	const usedFiles = new Set([
		'COZ-1-edit.jpg',
		'COZ-2-edit.jpg',
		'COZ-3-edit.jpg',
		'COZ-8-edit.jpg',
		'basket.jpg',
		'denah2lt.jpg',
		'denah3lt.jpg',
		'interior 1.jpg',
		'interior 2.jpg',
		'mushola.jpg',
		'pintu-ipb.jpg',
		'tv.jpg',
		'waterheater.jpg'
	]);
	const usedOptimizedDirs = new Set([
		'ksk-coz-1-edit',
		'ksk-coz-2-edit',
		'ksk-coz-3-edit',
		'ksk-coz-8-edit',
		'ksk-basket',
		'ksk-denah2lt',
		'ksk-denah3lt',
		'ksk-interior-1',
		'ksk-interior-2',
		'ksk-mushola',
		'ksk-pintu-ipb',
		'ksk-tv',
		'ksk-waterheater'
	]);

	for (const entry of readdirSync(imagesDir)) {
		if (entry === 'optimized') {
			const optimizedDir = path.join(imagesDir, entry);
			for (const optimizedEntry of readdirSync(optimizedDir)) {
				if (!usedOptimizedDirs.has(optimizedEntry)) {
					rmSync(path.join(optimizedDir, optimizedEntry), { recursive: true, force: true });
				}
			}
		} else if (entry === 'ksk') {
			const kskDir = path.join(imagesDir, entry);
			for (const assetEntry of readdirSync(kskDir)) {
				if (!usedFiles.has(assetEntry)) {
					rmSync(path.join(kskDir, assetEntry), { recursive: true, force: true });
				}
			}
		} else {
			rmSync(path.join(imagesDir, entry), { recursive: true, force: true });
		}
	}
}

function fsExists(target) {
	try {
		return readdirSync(target) && true;
	} catch {
		return false;
	}
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

	if (target.variant === 'royal') pruneRoyalAssets();
	if (target.variant === 'ksk') pruneKskAssets();
}

runNodeScript([path.join(projectRoot, 'tools', 'generate-sitemap.js')], {
	SITE_VARIANT: 'company'
});
runNodeScript([path.join(projectRoot, 'tools', 'generate-llms.js')], {
	SITE_VARIANT: 'company'
});
