import { Plugin } from 'rollup';
import './consts';

/**
 * Import build time constants with Rollup.
 *
 * @param consts Replacement values in the form of string: replacement
 *
 * @example
 * import environment from 'consts:environment';
 *
 * if (environment === 'production') {
 *     // Production only code ...
 * } else {
 *     // Development only code ...
 * }
 */
function constsPlugin(consts: { [constsValue: string]: any }): Plugin;

export = constsPlugin;
export default constsPlugin;
