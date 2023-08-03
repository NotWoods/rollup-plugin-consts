import { defineConfig } from 'rollup';

export default defineConfig({
    input: 'src/index.js',
    output: [
        {
            file: 'dist/rollup-plugin-consts.cjs',
            format: 'cjs',
            exports: 'default',
            footer: 'module.exports.consts = constsPlugin;',
        },
        {
            file: 'dist/rollup-plugin-consts.mjs',
            format: 'es',
            exports: 'default',
            footer: 'export { constsPlugin as consts };',
        },
    ],
});
