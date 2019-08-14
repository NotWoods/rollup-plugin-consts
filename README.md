# rollup-plugin-consts

[![](https://img.shields.io/npm/v/rollup-plugin-consts.svg?style=flat)](https://www.npmjs.com/package/rollup-plugin-consts)

Import build time constants with Rollup.

## Installation

```bash
npm install --save-dev rollup-plugin-consts
```

## Usage

rollup-plugin-consts let you use constants that are replaced at build time, such
as inlining your `NODE_ENV`. Unlike similar plugins such as
[rollup-plugin-replace](https://github.com/rollup/rollup-plugin-replace),
rollup-plugin-consts doesn't magically replace strings in your script. Instead,
you import them like a module.

```js
// script.js
import environment from 'consts:environment';

if (environment === 'production') {
    // Production only code ...
} else {
    // Development only code ...
}
```

All consts modules have the prefix `consts:` followed by the name of the
constant, such as `environment` or `testing`. Rollup can reduce simple `if`
statements like the one above.

```js
// script.min.js

// environment == 'production'
{
    // Production only code ...
}
```

Generally, you need to ensure that rollup-plugin-consts goes _before_ other
things (like rollup-plugin-commonjs) in your `plugins` array, so that those
plugins can apply any optimisations such as dead code removal.

```js
// rollup.config.js
import consts from 'rollup-plugin-consts';

export default {
    // ...
    plugins: [
        consts({
            environment: 'production',
        }),
    ],
};
```

## Options

```js
{
    // All options are treated as `string: replacement` replacers...
    testing: false,
    version: '1.0.0',
    environment: 'development',
    // Objects can be used as replacements too!
    config: { names: ['foo', 'bar'] },
}
```

## Credits

rollup-plugin-consts was originally created by
[Jake Archibald](https://github.com/jakearchibald/) for
[PROXX](https://github.com/GoogleChromeLabs/proxx). You can watch his
presentation with [Surma](https://github.com/surma/)
[about Rollup plugins they wrote for PROXX](https://youtu.be/TsTt7Tja30Q).

## License

Apache-2.0
