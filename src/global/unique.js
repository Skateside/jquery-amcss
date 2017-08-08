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

    "use strict";

    return array.reduce(function (prev, curr) {

        if (prev.indexOf(curr) < 0) {
            prev.push(curr);
        }

        return prev;

    }, []);

}
