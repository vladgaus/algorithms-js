/**
 * from https://leetcode.com/problems/regions-cut-by-slashes/
 */
try {

    /**
     * @return {object}
     */
    let getNumbers = (i, j, n) => {
        const a = (i * n + j) * 2 + 1;
        return {
            'a': a - 1,
            'b': a
        };
    };

    /**
     * @param {string[]} grid
     * @return {number}
     */
    let regionsBySlashes = function(grid) {
        const n = grid.length;
        const size = n * n * 2;
        let qu = new QuickUnion(size);
        let points = Array.from(Array(size).keys());

        let i = 0; // row
        grid.forEach((val) => {
            const row = val.split('');
            let j = 0; // column
            row.forEach((s) => {
                const numbers = getNumbers(i, j, n);

                // equal
                if (s === ' ') {
                    qu.union(numbers['a'], numbers['b']);
                }

                // go down
                if (i < n -1) {
                    qu.union(numbers['b'], numbers['a'] + 2 * n);
                }

                // go right
                if (j < n - 1) {
                    let x = (s === '/') ? numbers['b'] : numbers['a'];
                    let y = (row[j + 1] === '/') ? numbers['b'] + 1 : numbers['b'] + 2;
                    qu.union(x, y);
                }
                j++;
            });
            i++;
        });

        let corners = [];
        points.forEach(function (k) {
            corners.push(qu.find(k));
        });
        corners = Array.from(new Set(corners));
        return corners.length;
    };

    const areas = regionsBySlashes([
        "//",
        "/ "
    ]);

    console.log(areas);
} catch (e) {
    console.log(`${e.name}: ${e.message}`);
}