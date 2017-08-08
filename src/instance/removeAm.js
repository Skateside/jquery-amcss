/*global
    $,
    getAllPrefixed,
    toWords,
    toObject
*/

/**
 * Removes values from the attribute or the attribute itself. If no arguments
 * are passed then all AMCSS attributes are removed.
 *
 * @memberof external:jQuery
 * @instance
 * @alias    removeAm
 * @param    {String}          [attr]
 *           Attribute to remove or whose values should be removed.
 * @param    {Function|String} [value]
 *           Optional value(s) to remove or function to derive the value(s) to
 *           remove.
 * @return   {jQuery}
 *           jQuery instance.
 *
 * @example <caption>Removing value with a string</caption>
 * // Markup is <div id="one" am-test="one two three">
 * $("#one").removeAm("test", "two");
 * // Now markup is <div id="one" am-test="one three">
 *
 * @example <caption>Removing an attribute with a function</caption>
 * // Markup is <div id="one" am-test="a0 a1 a2">
 * $("#one").removeAm("test", function (index, value) {
 *     return "a" + index;
 * });
 * // Now markup is <div id="one" am=test="a1 a2">
 *
 * @example <caption>Removing the attribute</caption>
 * // Markup is <div id="one" am-test="one two three">
 * $("#one").removeAm("test");
 * // Now markup is <div id="one">
 *
 * @example <caption>Removing all AMCSS attributes</caption>
 * // Markup is <div id="one" am-alpha="one" am-bravo="two">
 * $("#one").removeAm();
 * // Now markup is <div id="one">
 */
$.fn.removeAm = function (attr, value) {

    "use strict";

    var returnValue;

    if (value === undefined && attr === undefined) {

        returnValue = this.each(function () {

            $(this).removeAttr(
                Object
                    .keys(getAllPrefixed(this, $.AM_PREFIX))
                    .join(" ")
            );

        });

    } else {

        attr = toObject(attr, value);
        returnValue = this.each(function (index, element) {

            var jQelement = $(element);

            $.each(attr, function (name, val) {

                if (val === undefined) {
                    jQelement.removeAttr($.normaliseAm(name));
                } else {

                    var current = jQelement.am(name);
                    var currentValue = toWords(current);
                    var valuesToRemove = toWords(
                        $.isFunction(val)
                            ? val.call(element, index, current)
                            : val
                    );

                    jQelement.am(name, currentValue.filter(function (v, i) {

                        return (
                            valuesToRemove.indexOf(v) < 0
                            && currentValue.indexOf(v) === i // De-duplicate
                        );

                    }).join(" "));

                }

            });

        });

    }

    return returnValue;

};
