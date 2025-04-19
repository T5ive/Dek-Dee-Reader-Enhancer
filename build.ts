import { build } from 'esbuild';

const banner = `
// ==UserScript==
// @name         Dek Dee Reader Enhancer
// @namespace    https://github.com/t5ive/
// @version      1.2
// @description  UI ปรับแต่งการอ่านแบบ Firefox Reader View
// @author       T5ive
// @match        https://writer.dek-d.com/dekdee/writer/viewlongc.php?id=*
// @grant        none
// ==/UserScript==
`;

build({
    entryPoints: ['./src/main.tsx'],
    outfile: './dist/dek-d-reader-enhancer.user.js',
    bundle: true,
    minify: true,
    format: 'iife',
    banner: { js: banner },
    target: ['chrome100', 'firefox100'],
}).then(() => {
    const time = new Date().toLocaleTimeString('th-TH');
    const filePath = './dist/dek-d-reader-enhancer.user.js';
    console.log(`[${time}] ✅ Build สำเร็จแล้ว!`);
    console.log(`[${time}] 📂 ${filePath}`);
});
