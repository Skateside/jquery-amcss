/*global
    $,
    interpretString,
    startsWith
 */

/**
 * Normalises the attribute so that it always starts with the AMCSS prefix
 * ("am-" by default). If the attribute already starts with the AMCSS prefix, no
 * action is taken.
 * <br><br>
 * The other AMCSS methods ([jQuery#am]{@link external:jQuery#am},
 * [jQuery#addAm]{@link external:jQuery#addAm},
 * [jQuery#hasAm]{@link external:jQuery#hasAm} and
 * [jQuery#removeAm]{@link external:jQuery#removeAm}) always pass their given
 * attributes through this function so there is no need to do that manually.
 * <br><br>
 * This function is aliased as
 * [jQuery.normalizeAm]{@link external:jQuery.normalizeAm}.
 *
 * @alias    external:jQuery.normaliseAm
 * @memberof external:jQuery
 * @param    {String} attribute
 *           Attribute to normalise.
 * @return   {String}
 *           Normalised attribute.
 * @see      external:jQuery.AM_PREFIX
 *
 * @example <caption>Attributes are normalised</caption>
 * // $.AM_PREFIX = "am-"
 * $.normaliseAm("button");    // -> "am-button"
 * $.normaliseAm("am-button"); // -> "am-button"
 *
 * @example <caption>Changing $.AM_PREFIX</caption>
 * // $.AM_PREFIX = "am-"
 * $.normaliseAm("button"); // -> "am-button"
 * $.AM_PREFIX = "data-"
 * $.normaliseAm("button"); // -> "data-button"
 */
function normalise(attribute) {

    "use strict";

    var attr = interpretString(attribute);

    return startsWith.call(attr, $.AM_PREFIX)
        ? attr
        : $.AM_PREFIX + attr;

}
