/**
 * from https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/
 */
try {
    /**
     * @param {number[][]} stones
     * @return {number}
     */
    let removeStones = function(stones) {
        const n = stones.length;
        let qu = new QuickUnion(n);

        for(let i = 0; i < n; i++) {
            for(let j = 0; j < n; j++) {
                if (stones[i][0] === stones[j][0] || stones[i][1] === stones[j][1]) {
                    qu.union(i, j);
                }
            }
        }
        return n - qu.components();
    };

    const duplicates = removeStones([[0,0],[0,2],[1,1],[2,0],[2,2]]);
    console.log(duplicates);

} catch (e) {
    console.log(`${e.name}: ${e.message}`);
}
