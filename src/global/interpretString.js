/**
 * Interprets the given variable as a string. If the variable is null or
 * undefined, an empty string is returned.
 *
 * @private
 * @global
 * @param   {?}      string
 *          Variable to interpret as a string.
 * @return  {String}
 *          Interpretted string.
 *
 * @example
 * interpretString("abc");     // -> "abc"
 * interpretString(123);       // -> "123"
 * interpretString(null);      // -> ""
 * interpretString(undefined); // -> "";
 * interpretString();          // -> "";
 */
function interpretString(string) {

    "use strict";

    return typeof string === "string"
        ? string
        : (string === null || string === undefined)
            ? ""
            : String(string);

}
