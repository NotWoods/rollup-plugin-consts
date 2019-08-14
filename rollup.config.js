export default {
    input: 'src/index.js',
    output: [
        { file: 'dist/rollup-plugin-consts.cjs.js', format: 'cjs' },
        { file: 'dist/rollup-plugin-consts.es.js', format: 'es' },
    ],
};
