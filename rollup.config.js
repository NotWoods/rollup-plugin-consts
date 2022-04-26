import { defineConfig } from 'rollup';

export default defineConfig({
    input: 'src/index.js',
    output: [
        {
            file: 'dist/rollup-plugin-consts.cjs.js',
            format: 'cjs',
            exports: 'default',
            footer: 'module.exports.consts = constsPlugin;',
        },
        {
            file: 'dist/rollup-plugin-consts.es.js',
            format: 'es',
            exports: 'default',
            footer: 'export { constsPlugin as consts };',
        },
    ],
});
