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
export function consts(consts: { [name: string]: unknown }): Plugin;

export default consts;
