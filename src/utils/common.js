/**
 * Clones an object.
 *
 * @param {any} obj The object.
 * @return {any} The clone.
 */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Memoizes a function
 *
 * @param {Function} func The function.
 * @return {Function} The memoized function.
 */
function memoize(func) {
  const lookup = new Map();

  return function () {
    const key = [...arguments].map((x) => String(x)).join("|");

    if (lookup.has(key)) {
      return lookup.get(key);
    }

    const result = func(...arguments);

    lookup.set(key, result);

    return result;
  };
}

module.exports = {
  clone,
  memoize,
};
