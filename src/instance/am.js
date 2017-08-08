/*global
    $,
    toObject,
    getAllPrefixed,
    getAttribute,
    setAttribute
*/

/**
 * Sets or gets an AMCSS attribute.
 * <br><br>
 * This function has 3 modes:
 * <br>- Pass 0 arguments to get a collection of all AMCSS attributes.
 * <br>- Pass 1 argument to get the value of that attribute.
 * <br>- Pass 2 arguments to set the value of that attribute.
 * In all cases, the attribute is automatically passed through
 * [jQuery.normaliseAm]{@link external:jQuery.normaliseAm} so there is no need
 * to do this manually (although it will not cause any problems if you do).
 *
 * @memberof external:jQuery
 * @instance
 * @alias    am
 * @param    {Object|String}                  [attr]
 *           Attribute to get or set.
 * @param    {Function|String}                [value]
 *           Value of the attribute to set.
 * @return   {jQuery|Object|String|undefined}
 *           Either the jQuery instance (when getting or setting) or an object
 *           of all the AMCSS attributes.
 *
 * @example <caption>Setting an attribute</caption>
 * // Markup is <div id="one">
 * $("#one").am("alpha", "one");
 * // Markup is now <div id="one" am-alpha="one">
 * $("#one").am("alpha", function (index, value) {
 *     return index + value + value;
 * });
 * // Markup is now <div id="one" am-alpha="0oneone">
 * $("#one").am({
 *     bravo: "two",
 *     charlie: "three"
 * });
 * // Markup is now
 * // <div id="one" am-alpha="0oneone" am-bravo="two" am-charlie="three">
 *
 * @example <caption>Getting an attribute</caption>
 * // Markup is <div id="one" am-test="one">
 * $("#one").am("test"); // -> "one"
 * $("#one").am("fake"); // -> undefined
 *
 * @example <caption>Getting all AMCSS attributes</caption>
 * // Markup is <div id="one" am-test="one">
 * $("#one").am(); // -> {"am-test": "one"}
 */
$.fn.am = function (attr, value) {

    "use strict";

    var isAttrObject = $.isPlainObject(attr);
    var isGet = value === undefined && !isAttrObject;
    var el = this[0];

    if (!isGet && !isAttrObject) {
        attr = toObject(attr, value);
    }

    return isGet
        ? attr === undefined
            ? getAllPrefixed(el, $.AM_PREFIX)
            : getAttribute(el, attr)
        : this.each(function (index, element) {

            $.each(attr, function (key, val) {
                setAttribute(element, key, val, index);
            });

        });

};
