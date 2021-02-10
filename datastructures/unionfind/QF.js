/**
 * This basic implementation of Quick Finf algorithm for union-find data structure
 * Initialize O(n)
 * Union O(n)
 * Find O(1)
 * The worst time of union-find case in M sets and N objects in each = N * M
 *
 *
 * n - count elements in size union find (UF)
 * ids - value of ids[i] (root). If ids[i] == i then i is a root
 * @author Vladimir Sinica
 */

class QuickFind
{
    /**
     * n -  count elements in size UF
     * ids - value of ids[i] (root). If ids[i] == i then i is a root
     */
    constructor(n) {
        if (n <= 0) {
            throw new Error('Size <=0 is not allowed!');
        }
        this.count = n;
        this.ids = Array.from(Array(n).keys()); // link to itself. Each key is a root
    }

    /**
     * Find the root of component/set p
     */
    find(p) {
        return this.ids[p];
    }

    /**
     * Check connection between p and q
     */
    connected(p, q) {
        return this.find(p) === this.find(q);
    }

    /**
     * Return a number of components in UF set
     */
    size() {
        return this.count;
    }

    /**
     *  Merge sets (unify components/sets containing elements p and q)
     */
    union(p, q) {
        let rootP = this.find(p);
        let rootQ = this.find(q);
        if (rootP === rootQ) return;

        for (let i in this.ids) {
            if (this.ids[i] === rootP) {
                this.ids[i] = rootQ;
            }
        }

        // decrease number
        this.count--;
    }
}

// Examples
try {
    const size = 6;
    let qf = new QuickFind(size);
    console.log(qf.ids);
    console.log('Start unify values (QF) ...');
    console.log('Unify 5 and 2, 4 and 5, 3 and 1');
    qf.union(5, 2);
    qf.union(4, 5);
    qf.union(3, 1);
    console.log('Checking connection 3 and 5');
    console.log(qf.connected(3, 5));
    console.log('Unify 1 and 2');
    qf.union(1, 2);
    console.log('Checking connection 3 and 5 again');
    console.log(qf.connected(3, 5));

} catch (e) {
    console.log(`${e.name}: ${e.message}`);
}

