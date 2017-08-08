/*global
    $,
    isElement,
    startsWith
*/

/**
 * Gets all the attributes of the given element that start with the given
 * prefix.
 *
 * @global
 * @private
 * @param    {Element} element
 *           Elements whose attributes should be returned.
 * @param    {String} prefix
 *           Prefix for the attributes.
 * @return   {Object}
 *           Attributes in key/value pairs.
 *
 * @example
 * // <div id="one" am-alpha="one" am-bravo data-charlie="three" />
 * var div = document.getElementById("one");
 * getAllPrefixed(div, "am-"); // -> { "am-alpha": "one", "am-bravo": "" }
 * getAllPrefixed(div, "data-"); // -> { "data-charlie": "three" }
 */
function getAllPrefixed(element, prefix) {

    "use strict";

    var all = {};

    if (isElement(element)) {

        $.each(element.attributes, function (ignore, info) {

            if (startsWith.call(info.name, prefix)) {
                all[info.name] = info.value;
            }

        });

    }

    return all;

}
