/*global
    $,
    isElement
*/

/**
 * Retrieves the value of the given attribute of the given element. The
 * attribute name is normalised (see
 * [$.normaliseAm]{@link external:jQuery.normaliseAm}) and passed through the
 * get hook (see [$.amHooks]{@link external:jQuery.amHooks}) if there is one. If
 * the attribute cannot be retrieved, undefined is returned.
 *
 * @global
 * @private
 * @param   {Element}          element
 *          Element whose attribute value should be retrieved.
 * @param   {String}           attribute
 *          Name of the attribute whose value should be retrieved.
 * @return  {String|undefined}
 *          The value of the attribute or undefined if the attribute cannot be
 *          retrieved.
 * @see     external:jQuery.normaliseAm
 * @see     external:jQuery.amHooks
 *
 * @example
 * // <div id="one" am-test="one">
 * var div = document.getElementById("one");
 * getAttribute(div, "test"); // -> "one"
 * getAttribute(div, "fake"); // -> undefined
 */
function getAttribute(element, attribute) {

    "use strict";

    var normalised = $.normaliseAm(attribute);
    var stem = normalised.slice($.AM_PREFIX.length);
    var hook = $.amHooks[stem];
    var response = isElement(element)
        ? (hook && hook.get)
            ? hook.get(element, normalised)
            : element.getAttribute(normalised)
        : undefined;

    return response === null
        ? undefined
        : response;

}
