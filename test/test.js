const test = require('node:test');
const assert = require('node:assert');
const { rollup } = require('rollup');
const consts = require('../');

/**
 * Runs a bundle and returns the last `console.log` statement.
 * @param {import('rollup').RollupBuild} bundle
 */
async function executeBundle(bundle) {
    const generated = await bundle.generate({ format: 'cjs' });

    const log = console.log;

    // Patch console.log and capture output
    let testLogOutput;
    console.log = (msg) => {
        testLogOutput = msg;
    };

    const fn = new Function(
        'module',
        'exports',
        'assert',
        'require',
        generated.output[0].code
    );
    const module = { exports: {} };
    try {
        fn(module, module.exports, assert, require);
    } catch (err) {
        console.log(generated.output[0].code);
        throw err;
    } finally {
        console.log = log;
    }
    return testLogOutput;
}

/**
 * Silences empty bundle warnings
 * @type {import('rollup').WarningHandler}
 */
const onwarn = (warning) => {
    assert.strictEqual(warning.code, 'EMPTY_BUNDLE');
};

test('const boolean', async () => {
    const bundle = await rollup({
        input: 'test/samples/const-boolean.js',
        plugins: [
            consts({
                prerender: true,
                other_value: false,
            }),
        ],
    });
    assert.strictEqual(
        await executeBundle(bundle),
        'Pre-rendering some HTML...'
    );

    const notPrerenderBundle = await rollup({
        input: 'test/samples/const-boolean.js',
        plugins: [
            consts({
                prerender: false,
                other_value: true,
            }),
        ],
        onwarn,
    });
    assert.strictEqual(await executeBundle(notPrerenderBundle), undefined);
});

test('const number', async () => {
    const lowVersionBundle = await rollup({
        input: 'test/samples/const-number.js',
        plugins: [
            consts({
                version: 2,
            }),
        ],
        onwarn,
    });
    assert.strictEqual(await executeBundle(lowVersionBundle), undefined);

    const bundle = await rollup({
        input: 'test/samples/const-number.js',
        plugins: [
            consts({
                version: 4,
            }),
        ],
    });
    assert.strictEqual(await executeBundle(bundle), 'Newest version in use');
});

test('const string', async () => {
    const prodBundle = await rollup({
        input: 'test/samples/const-string.js',
        plugins: [
            consts({
                environment: 'production',
            }),
        ],
        onwarn,
    });
    assert.strictEqual(await executeBundle(prodBundle), undefined);

    const devBundle = await rollup({
        input: 'test/samples/const-string.js',
        plugins: [
            consts({
                environment: 'development',
            }),
        ],
    });
    assert.strictEqual(await executeBundle(devBundle), 'Development only code');
});

test('const object', async () => {
    const bundle = await rollup({
        input: 'test/samples/const-object.js',
        plugins: [
            consts({
                config: {
                    names: ['bar', 'foo'],
                },
            }),
        ],
    });
    assert.strictEqual(await executeBundle(bundle), 'Correct config found');
});
