declare global {
  interface Array<T> {
    /**
     * Calculates the sum of an array of numbers.
     *
     * @param {number[]} this The array of values.
     * @return {number} The sum, or 0 if the array is empty.
     */
    sum(this: number[]): number;

    /**
     * Calculates the product of an array of numbers.
     *
     * @param {number[]} this The array of values.
     * @return {number} The product, or 1 if the array is empty.
     */
    product(this: number[]): number;
  }
}

Object.defineProperty(Array.prototype, "sum", {
  configurable: true,
  writable: true,
  enumerable: false,
  value: function (this: number[]) {
    return this.reduce((sum, value) => (sum += value), 0);
  },
});

Object.defineProperty(Array.prototype, "product", {
  configurable: true,
  writable: true,
  enumerable: false,
  value: function (this: number[]) {
    return this.reduce((product, value) => (product *= value), 1);
  },
});

export {};
