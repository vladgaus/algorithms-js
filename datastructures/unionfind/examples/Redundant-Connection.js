/**
 * from https://leetcode.com/problems/redundant-connection/
 */
try {

    /**
     * Find maximum element
     *
     * @param {number[][]} graph
     * @return {number[]}
     */
    let maxEl = (graph) => {
        let max = 1;
        graph.forEach((el) => {
            let currentMax = Math.max(...el);
            if (max < currentMax) {
                max = currentMax;
            }
        });
        return max;
    };

    /**
     * @param {number[][]} edges
     * @return {number[]}
     */
    let findRedundantConnection = function(edges) {
        const n = maxEl(edges);
        let qu = new QuickUnion(n);
        let pairLast = edges[0];
        let components = [];
        edges.forEach((pair, ind) => {
            qu.union(pair[0], pair[1]);
            let countComponents = qu.components();
            components.push(countComponents);

            if (ind > 0) {
                if (components[ind] === components[ind - 1]) {
                    pairLast = pair;
                }
            }
        });
        return pairLast;
    };

    const pair = findRedundantConnection([[1,2], [2,3], [3,4], [1,4], [1,5]]);
    console.log(pair);

} catch (e) {
    console.log(`${e.name}: ${e.message}`);
}