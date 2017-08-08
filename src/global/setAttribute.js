/*global
    $,
    isElement,
    getAttribute
*/

/**
 * Sets the value of the given attribute on the given element. The attribute
 * name is normalised (see [$.normaliseAm]{@link external:jQuery.normaliseAm}),
 * the set hook is executed (see [$.amHooks]{@link external:jQuery.amHooks}) if
 * it exists and if the value is a function then that function is executed
 * before the returning value is assigned to the attribute.
 *
 * @private
 * @global
 * @param   {Element}         element
 *          Element whose attribute value should be set.
 * @param   {String}          attribute
 *          Name of the attribute to set.
 * @param   {Function|String} value
 *          Value of the attribute to set or the function that will create the
 *          attribute to set.
 * @param   {Number}          index
 *          Index of the element within its collection - passed to value if
 *          value is a function.
 *
 * @example <caption>Setting a property</caption>
 * // Markup is:
 * // <div id="one"></div>
 *
 * var element = document.getElementById("one");
 * setAttribute(element, "label", "test");
 *
 * // Now markup is:
 * // <div id="one" aria-label="test"></div>
 *
 * @example <caption>Setting a property using a function</caption>
 * // Markup is:
 * // <div id="one" aria-label="test"></div>
 *
 * var element = document.getElementById("one");
 * setAttribute(element, "label", function (i, attr) {
 *     return this.id + "__" + i + "__" + attr;
 * }, 0);
 *
 * // Now markup is:
 * // <div id="one" aria-label="one__0__test"></div>
 */
function setAttribute(element, attribute, value, index) {

    "use strict";

    var normal = $.normaliseAm(attribute);
    var stem = normal.slice($.AM_PREFIX.length);
    var hook = $.amHooks[stem];

    if (isElement(element)) {

        if ($.isFunction(value)) {

            value = value.call(
                element,
                index,
                getAttribute(element, normal)
            );

        }

        if (value !== null && value !== undefined) {

            if (hook && hook.set) {
                value = hook.set(element, value, normal);
            }

            if (value !== null && value !== undefined) {
                element.setAttribute(normal, String(value).trim());
            }

        }

    }

}
