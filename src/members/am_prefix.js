/*global
    $
*/

/**
 * The prefix for the AMCSS attributes. This intentionally includes the hyphen
 * so that the value can be set to an empty string ("") if no prefix is wanted.
 * Changing this value will create different results in different values
 * returned from [jQuery.normaliseAm]{@link external:jQuery.normaliseAm}.
 *
 * @alias    external:jQuery.AM_PREFIX
 * @memberof external:jQuery
 * @type     {String}
 *
 * @example <caption>Changing $.AM_PREFIX updates $.normaliseAm</caption>
 * $.AM_PREFIX = "am-"; // This is the default.
 * $.normaliseAm("button"); // -> "am-button"
 *
 * $.AM_PREFIX = "data-am-";
 * $.normaliseAm("button"); // -> "data-am-button"
 */
$.AM_PREFIX = "am-";
