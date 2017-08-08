/*global
    $
*/

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
