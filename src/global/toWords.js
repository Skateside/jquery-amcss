/*global
    interpretString
*/

/**
 * Converts the given string into an array of the words. The given value is
 * interpretted as a string - see {@link interpretString}.
 *
 * @param  {String}         value
 *         Value that should be converted into words.
 * @return {Array.<String>}
 *         Array of words.
 *
 * @example
 * toWords("one two"); // -> ["one", "two"]
 * toWords("  three    four   "); // -> ["three", "four"]
 */
function toWords(value) {

    "use strict";

    return interpretString(value)
        .trim() // NOTE: this bit hasn't been unit tested!
        .split(/\s+/);

}
