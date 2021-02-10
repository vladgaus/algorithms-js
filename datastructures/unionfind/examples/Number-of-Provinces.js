/**
 * from https://leetcode.com/problems/number-of-provinces/
 */
try {

    /**
     * @param {number[][]} isConnected
     * @return {number}
     */
    let findCircleNum = function(isConnected) {
        const n = isConnected.length;
        let qu = new QuickUnion(n);
        let number = 0;
        let points = Array.from(Array(n).keys());
        isConnected.forEach((row) => {
            row.forEach((val, ind) => {
                // make union if connected
                if (val === 1) {
                    qu.union(number, ind);
                }
            });
            number++;
        });

        let provinces = [];
        points.forEach(function (k) {
            provinces.push(qu.find(k));
        });
        provinces = Array.from(new Set(provinces));
        return provinces.length;

    };

    const provinces = findCircleNum([[1,0,0],[0,1,0],[0,0,1]]);
    console.log(provinces);

} catch (e) {
    console.log(`${e.name}: ${e.message}`);
}