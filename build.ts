import { build } from 'esbuild';

const banner = `
// ==UserScript==
// @name         Dek Dee Reader Enhancer
// @namespace    https://github.com/T5ive/
// @version      1.4
// @description  UI ปรับแต่งการอ่านแบบ Firefox Reader View
// @author       T5ive
// @match        https://writer.dek-d.com/dekdee/writer/viewlongc.php?id=*
// @updateURL    https://raw.githubusercontent.com/T5ive/Dek-Dee-Reader-Enhancer/master/dek-d-reader-enhancer.user.js
// @downloadURL  https://raw.githubusercontent.com/T5ive/Dek-Dee-Reader-Enhancer/master/dek-d-reader-enhancer.user.js
// @grant        none
// ==/UserScript==
`;

build({
    entryPoints: ['./src/main.tsx'],
    outfile: './dek-d-reader-enhancer.user.js',
    bundle: true,
    minify: true,
    format: 'iife',
    banner: { js: banner },
    target: ['chrome100', 'firefox100'],
}).then(() => {
    const time = new Date().toLocaleTimeString('th-TH');
    const filePath = './dek-d-reader-enhancer.user.js';
    console.log(`[${time}] ✅ Build สำเร็จแล้ว!`);
    console.log(`[${time}] 📂 ${filePath}`);
});
