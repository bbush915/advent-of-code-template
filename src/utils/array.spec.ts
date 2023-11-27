import "./array";

describe("utils", function () {
  describe("array", function () {
    describe("sum", function () {
      it("should add an array of numbers correctly", function () {
        const values = [1, 2, 3, 4, 5];
        const sum = values.sum();

        expect(sum).toBe(15);
      });

      it("should return 0 for an empty array", function () {
        const values: number[] = [];
        const sum = values.sum();

        expect(sum).toBe(0);
      });
    });

    describe("product", function () {
      it("should multiply an array of numbers", function () {
        const values = [1, 2, 3, 4, 5];
        const sum = values.product();

        expect(sum).toBe(120);
      });

      it("should return 1 for an empty array", function () {
        const values: number[] = [];
        const sum = values.product();

        expect(sum).toBe(1);
      });
    });
  });
});
