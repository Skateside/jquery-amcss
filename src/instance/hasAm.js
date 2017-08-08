/*global
    $,
    isElement,
    toWords
*/

/**
 * Checks to see if the AMCSS attribute exists or that it contains a specific
 * value. Thw attribute is automatically passed through
 * [jQuery.normaliseAm]{@link external:jQuery.normaliseAm} so there is no need
 * to do this manually (although it will not cause any problems if you do).
 *
 * @memberof external:jQuery
 * @instance
 * @alias    hasAm
 * @param    {String}  attribute
 *           Attribute to check.
 * @param    {String}  [value]
 *           Optional value to check.
 * @return   {Boolean}
 *           true if the attribute exists (or contains the value) false
 *           otherwise.
 *
 * @example <caption>Checking for the attribute</caption>
 * // Markup is <div id="one" am-alpha="one two three">
 * $("#one").hasAm("alpha"); // -> true
 * $("#one").hasAm("bravo"); // -> false
 *
 * @example <caption>Checking for the value</caption>
 * // Markup is <div id="one" am-alpha="one two three">
 * $("#one").hasAm("alpha", "one");  // -> true
 * $("#one").hasAm("alpha", "four"); // -> false
 */
$.fn.hasAm = function (attribute, value) {

    "use strict";

    var element = this[0];
    var has = isElement(element);
    var normal = $.normaliseAm(attribute);
    var current;

    if (has) {

        if (value === undefined) {
            has = element.hasAttribute(normal);
        } else {

            current = toWords(element.getAttribute(normal));
            has = toWords(value).every(function (word) {
                return current.indexOf(word) > -1;
            });

        }

    }

    return has;

};
