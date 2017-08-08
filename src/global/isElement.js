/*global
    $
*/

/**
 * Checks to see if the given object is an HTMLElement.
 *
 * @global
 * @private
 * @param   {?}       element
 *          Element to test.
 * @return  {Boolean}
 *          true if the element is an HTMLElement, false otherwise.
 */
function isElement(element) {

    "use strict";

    return (
        element !== null
        && element !== undefined
        && (/^\[object\sHTML(?:[A-Z][a-z]+)?Element\]$/).test(element)
        && typeof element.nodeName === "string"
        && typeof element.nodeType === "number"
        && !$.isPlainObject(element)
    );

}
