/*jslint
    this
*/

/**
 * Checks to see if one string stars with another.
 * <br><br>
 * Since this is just a simple fallback rather than a complete polyfill, the
 * offset argument is not handled.
 *
 * @private
 * @global
 * @this    {String}
 *          String to check.
 * @param   {String}  start
 *          Starting string to check with.
 * @return  {Boolean}
 *          true if the context starts with the start string, false otherwise.
 *
 * @example
 * startsWith.call("abcdef", "abc"); // -> true
 * startsWith.call("abcdef", "def"); // -> false
 */
var startsWith = String.prototype.startsWith || function (start) {

    "use strict";

    return String(this).indexOf(start) === 0;

};
