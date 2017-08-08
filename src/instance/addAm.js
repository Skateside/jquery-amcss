/*global
    $,
    toObject,
    toWords,
    unique
*/

/**
 * Adds one or more values to the specified AMCSS attribute. The values can be
 * added using a pair of strings, an object of key/value pairs or the value can
 * be a function to derive the value. In all cases, the attribute is passed
 * through [jQuery.normaliseAm]{@link external:jQuery.normaliseAm} so there is
 * no need to do this manually (although it will not cause any problems if you
 * do). If the attribute does not exist, it is created before the value(s)
 * is/are added.
 *
 * @memberof external:jQuery
 * @instance
 * @alias    addAm
 * @param    {Object|String}   attr
 *           Attribute to modify.
 * @param    {Function|String} value
 *           Either the value(s) to add or a function that generates the
 *           value(s) to add.
 * @return   {jQuery}
 *           The jQuery instance.
 *
 * @example <caption>Adding a value with a string</caption>
 * // Markup is <div id="one">
 * $("#one").addAm("alpha", "one");
 * // Now markup is <div id="one" am-alpha="one">
 * $("#one").addAm("alpha", "two three");
 * // Now markup is <div id="one" am-alpha="one two three">
 *
 * @example <caption>Adding a value with a function</caption>
 * // Markup is <div id="one" am-alpha="one">
 * $("#one").addAm("alpha", function (index, value) {
 *     return value.toUpperCase() + "_" + index;
 * });
 * // Now markup is <div id="one" am-alpha="one ONE_0">
 *
 * @example <caption>Adding a value with an object</caption>
 * // Markup is <div id="one" am-alpha="one">
 * $("#one").addAm({
 *     alpha: function (index, value) {
 *         return value.toUpperCase() + "_" + index;
 *     },
 *     bravo: "two three"
 * });
 * // Now markup is
 * // <div id="one" am-alpha="one ONE_0" am-bravo="two three">
 */
$.fn.addAm = function (attr, value) {

    "use strict";

    attr = toObject(attr, value);

    return this.each(function (index, element) {

        var jQelement = $(element);

        $.each(attr, function (key, val) {

            var current = jQelement.am(key);
            var valuesToAdd = toWords(
                $.isFunction(val)
                    ? val.call(element, index, current)
                    : val
            );

            jQelement.am(
                key,
                unique(toWords(current).concat(valuesToAdd)).join(" ")
            );

        });

    });

};
