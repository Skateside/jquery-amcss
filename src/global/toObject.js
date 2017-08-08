/*global
    $
*/

/**
 * Converts the arguments into an object. If the first argument is an object,
 * no further action is taken.
 *
 * @private
 * @global
 * @param   {Object|String} key
 *          Either the object itself or the key for the object.
 * @param   {?}             [value]
 *          Optional value for the key.
 * @return  {Object}
 *          Object made from the arguments.
 *
 * @example
 * toObject("one", "two");   // -> { one: "two" }
 * toObject({ one: "two" }); // -> { one: "two" }
 */
function toObject(key, value) {

    "use strict";

    var tempKey = key;

    if (!$.isPlainObject(key)) {

        key = {};
        key[tempKey] = value;

    }

    return key;

}
