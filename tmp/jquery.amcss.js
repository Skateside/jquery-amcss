/*! jquery-amcss (undefined) - v1.0.0 - MIT license - 2017-8-8 */
(function ($) {
    "use strict";

// Source: /src/doc/file.js
/**
 * @file
 * This is a jQuery plugin that makes it easier to work with
 * [AMCSS]{@link https://amcss.github.io/}. Its methods include:
 * <br>[jQuery#am]{@link external:jQuery#am} for setting an getting AMCSS
 * attributes.
 * <br>[jQuery#addAm]{@link external:jQuery#addAm} for adding values to AMCSS
 * attributes.
 * <br>[jQuery#removeAm]{@link external:jQuery#removeAm} for removing values
 * from AMCSS attributes
 * <br>[jQuery#hasAm]{@link external:jQuery#hasAm} for checking the existence of
 * AMCSS attributes or values.
 * <br><br>
 * There is also [jQuery.normaliseAm]{@link external:jQuery.normaliseAm} (and
 * its alias [jQuery#normalizeAm]{@link external:jQuery#normalizeAm}) for making
 * sure the attribute is prefixed and
 * [jQuery#AM_PREFIX]{@link external:jQuery#AM_PREFIX} for defining that prefix.
 * The files can be downloaded on
 * [GitHub]{@link https://github.com/Skateside/jquery-aria}.
 *
 * @author James "Skateside" Long <sk85ide@hotmail.com>
 * @version 1.0.0
 * @license MIT
 */

// Source: /src/doc/external.jquery.js
/**
 * @external jQuery
 * @see [jQuery]{@link http://jquery.com}
 */

// Source: /src/global/startsWith.js


/**
 * Checks to see if one string stars with another.
 * <br><br>
 * Since this is just a simple fallback rather than a complete polyfill, the
 * offset argument is not handled.
 *
 * @private
 * @global
 * @this    {String}
 *          String to check.
 * @param   {String}  start
 *          Starting string to check with.
 * @return  {Boolean}
 *          true if the context starts with the start string, false otherwise.
 *
 * @example
 * startsWith.call("abcdef", "abc"); // -> true
 * startsWith.call("abcdef", "def"); // -> false
 */
var startsWith = String.prototype.startsWith || function (start) {

    return String(this).indexOf(start) === 0;

};

// Source: /src/global/interpretString.js
/**
 * Interprets the given variable as a string. If the variable is null or
 * undefined, an empty string is returned.
 *
 * @private
 * @global
 * @param   {?}      string
 *          Variable to interpret as a string.
 * @return  {String}
 *          Interpretted string.
 *
 * @example
 * interpretString("abc");     // -> "abc"
 * interpretString(123);       // -> "123"
 * interpretString(null);      // -> ""
 * interpretString(undefined); // -> "";
 * interpretString();          // -> "";
 */
function interpretString(string) {

    return typeof string === "string"
        ? string
        : (string === null || string === undefined)
            ? ""
            : String(string);

}

// Source: /src/global/isElement.js


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

    return (
        element !== null
        && element !== undefined
        && (/^\[object\sHTML(?:[A-Z][a-z]+)?Element\]$/).test(element)
        && typeof element.nodeName === "string"
        && typeof element.nodeType === "number"
        && !$.isPlainObject(element)
    );

}

// Source: /src/global/getAttribute.js


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

// Source: /src/global/getAllPrefixed.js


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

// Source: /src/global/setAttribute.js


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

// Source: /src/global/toObject.js


/**
 * Converts the arguments into an object. If the first argument is an object,
 * no further action is taken.
 *
 * @private
 * @global
 * @param   {Object|String} key
 *          Either the object itself or the key for the object.
 * @param   {?}             [value]
 *          Optional value for the key.
 * @return  {Object}
 *          Object made from the arguments.
 *
 * @example
 * toObject("one", "two");   // -> { one: "two" }
 * toObject({ one: "two" }); // -> { one: "two" }
 */
function toObject(key, value) {

    var tempKey = key;

    if (!$.isPlainObject(key)) {

        key = {};
        key[tempKey] = value;

    }

    return key;

}

// Source: /src/global/toWords.js


/**
 * Converts the given string into an array of the words. The given value is
 * interpretted as a string - see {@link interpretString}.
 *
 * @param  {String}         value
 *         Value that should be converted into words.
 * @return {Array.<String>}
 *         Array of words.
 *
 * @example
 * toWords("one two"); // -> ["one", "two"]
 * toWords("  three    four   "); // -> ["three", "four"]
 */
function toWords(value) {

    return interpretString(value)
        .trim() // NOTE: this bit hasn't been unit tested!
        .split(/\s+/);

}

// Source: /src/global/unique.js
/**
 * Reduces the given array so that it only contains unique values.
 *
 * @global
 * @private
 * @param   {Array} array
 *          Array to reduce.
 * @return  {Array}
 *          Filtered array.
 *
 * @example
 * unique([1, 2, 1, 3, 1, 4, 1]); // -> [1, 2, 3, 4]
 */
function unique(array) {

    return array.reduce(function (prev, curr) {

        if (prev.indexOf(curr) < 0) {
            prev.push(curr);
        }

        return prev;

    }, []);

}

// Source: /src/global/normalise.js


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

    var attr = interpretString(attribute);

    return startsWith.call(attr, $.AM_PREFIX)
        ? attr
        : $.AM_PREFIX + attr;

}

// Source: /src/members/am_prefix.js


/**
 * The prefix for the AMCSS attributes. This intentionally includes the hyphen
 * so that the value can be set to an empty string ("") if no prefix is wanted.
 * Changing this value will create different results in different values
 * returned from [jQuery.normaliseAm]{@link external:jQuery.normaliseAm}.
 *
 * @alias    external:jQuery.AM_PREFIX
 * @memberof external:jQuery
 * @type     {String}
 */
$.AM_PREFIX = "am-";

// Source: /src/members/normalizeAm.js



$.normaliseAm = normalise;

/**
 * Alias for [jQuery.normaliseAm]{@link external:jQuery.normaliseAm}.
 *
 * @memberof external:jQuery
 */
$.normalizeAm = normalise;

// Source: /src/members/amHooks.js


/**
 * A collection of hooks that change the behaviour of getting or setting AMCSS
 * attributes. They are only called when using
 * [jQuery#am]{@link external:jQuery#am} and
 * [jQuery#addAm]{@link external:jQuery#addAm}. The hooks are all named after
 * the unprefixed AMCSS attributes. If you are ever in doubt, the easiest way to
 * get the hook name is
 * <code>$.normaliseAm(__ATTRIBUTE__).slice($.AM_PREFIX.length)</code>.
 *
 * @alias    external:jQuery.amHooks
 * @memberof external:jQuery
 * @type     {Object.<AMCSS_hook>}
 *
 * @example
 * // Suppose that an AMCSS attribute cannot have values, only the attribute
 * // itself.
 * $.amHooks.empty = {
 *     set: function (element, value, name) {
 *         element.setAttribute(name, "");
 *     },
 *     get: function (element) {
 *         return "";
 *     }
 * };
 */
$.amHooks = {};

/**
 * A hook for an AMCSS attribute. Every property is optional so there is no need
 * to specify one to execute the default functionality.
 * <br><br>
 * Be aware that these hooks only affect the AMCSS methods;
 * [jQuery#attr]{@link http://api.jquery.com/attr/} and
 * [jQuery#prop]{@link http://api.jquery.com/prop/} will not be affected by any
 * changes here. There are similar <code>jQuery.attrHooks</code> and
 * <code>jQuery.propHooks</code> (for set and get) that work in the same way if
 * you need to completely control attribute/property setting.
 *
 * @typedef  {Object}         AMCSS_hook
 * @property {AMCSS_hook_set} [set]
 *           Handles setting the attribute.
 * @property {AMCSS_hook_get} [get]
 *           Handles getting the attribute.
 */

/**
 * Handles the setting of an AMCSS attribute. If the function returns a value,
 * that value is used to set the attribute; returning null, undefined, or not
 * returning anything will prevent the normal attribute setting process from
 * completing.
 * <br><br>
 * When setting an attribute, please do not use
 * [jQuery#am]{@link external:jQuery#am} or
 * [jQuery#addAm]{@link external:jQuery#addAm} as this can create an
 * infinite loop.
 *
 * @typedef {Function}              AMCSS_hook_set
 * @param   {HTMLElement}           element
 *          Element whose attribute should be modified.
 * @param   {Boolean|Number|String} value
 *          Value of the attribute in the form given to the aria function.
 * @param   {String}                attribute
 *          Full attribute name, lower case and including prefix.
 * @return  {?}
 *          Possible conversion of the value.
 *
 * @example <caption>A "loud" attribute should always have uppercase values</caption>
 * $.amHooks.loud = {
 *     set: function (element, value) {
 *         return value.toUpperCase();
 *     }
 * };
 *
 * // Markup is
 * // <div id="one"></div>
 *
 * $("#one").am("loud", "yes");
 *
 * // Now markup is
 * // <div id="one" am-loud="YES"></div>
 */

/**
 * Handles the getting of an AMCSS attribute. The function takes the element
 * and should return the value that the jQuery AMCSS methods should return.
 * <br><br>
 * When getting an attribute, please do not use
 * [jQuery#am]{@link external:jQuery#am} as this can create an infinite loop.
 *
 * @typedef {Function}    AMCSS_hook_get
 * @param   {HTMLElement} element
 *          Element whose attribute value should be returned.
 * @param   {String}      attribute
 *          Full attribute name, lower case and including prefix.
 * @return  {?Boolean|Number|String}
 *          Value of the attribute.
 *
 * @example <caption>A "loud" attribute should always have uppercase values</caption>
 * $.amHooks.loud = {
 *     get: function (element, attribute) {
 *         return element.hasAttribute(attribute)
 *             ? element.getAttribute(attribute).toUpperCase()
 *             : "";
 *     }
 * };
 *
 * // Markup is
 * // <div id="one" am-loud="yes"></div>
 *
 * $("#one").am("loud"); // -> "YES"
 */

// Source: /src/instance/am.js


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

// Source: /src/instance/hasAm.js


/**
 * Checks to see if the AMCSS attribute exists or that it contains a specific
 * value. Thw attribute is automatically passed through
 * [jQuery.normaliseAm]{@link external:jQuery.normaliseAm} so there is no need
 * to do this manually (although it will not cause any problems if you do).
 *
 * @memberof external:jQuery
 * @instance
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

// Source: /src/instance/addAm.js


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

// Source: /src/instance/removeAm.js


/**
 * Removes values from the attribute or the attribute itself. If no arguments
 * are passed then all AMCSS attributes are removed.
 *
 * @memberof external:jQuery
 * @instance
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

}(jQuery));