const { calculateMean, calculateMedian, calculateMode } = require("./operations");

describe("math operations", function () {

    test('return mean', function () {
        let mean = calculateMean([2, 3, 4]);
        expect(mean).toEqual(3);
    });

    test('return to two decimal degrees if not whole numbers', function () {
        let mean = calculateMean([2, 3, 4, 5]);
        expect(mean).toEqual(3.50);
    });

    test('return median', function () {
        let median = calculateMedian([2, 3, 4]);
        expect(median).toEqual(3);
    });

    test('return median with unsorted array', function () {
        let median = calculateMedian([4, 2, 3]);
        expect(median).toEqual(3);
    });

    test('return median with even list of numbers', function () {
        let median = calculateMedian([4, 2, 3, 4]);
        expect(median).toEqual(3.5);
    });

    test('return mode', function () {
        let mode = calculateMode([2, 3, 3, 4]);
        expect(mode).toEqual([3]);
    });

    test('return highest mode when more than one present', function () {
        let mode = calculateMode([2, 4, 4, 6, 6]);
        expect(mode).toEqual([4,6]);
    });
});
