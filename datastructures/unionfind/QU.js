/**
 * This basic implementation of Quick Union algorithm for union-find data structure (with compression path)
 * Initialize O(n)
 * Union O(lg(n))
 * Find O(lg(n))
 * The worst time of union-find case in M sets and N objects in each = N + M * lg(N)
 *
 *
 * n - count elements in size union find (UF)
 * sizes - sizes[i] number of elements in subtree rooted at i
 * ids - value of ids[i] (root). If ids[i] == i then i is a root
 * countComponents - count of components in UF
 * @author Vladimir Sinica
 */

class QuickUnion
{
    /**
     * n -  count elements in size UF
     * sizes - sizes[i] number of elements in subtree rooted at i
     * ids - value of ids[i] (root). If ids[i] == i then i is a root
     * countComponents - count of components in UF
     *
     * @param {number} n
     */
    constructor(n) {
        if (n <= 0) {
            throw new Error('Size <=0 is not allowed!');
        }
        this.count = n;
        this.countComponents = n;
        this.ids = Array.from(Array(n).keys()); // link to itself. Each key is a root
        this.sizes = Array(n).fill(1); // each component have size 1 in start position
    }

    /**
     * Find the root of component/set p
     *
     * @param {number} p
     * @return {number}
     */
    find(p) {
        let root = p;
        while (root !== this.ids[root]) {
            root = this.ids[root];
        }

        // Compress the path of tree
        // This operation is calling "path compression"
        // it's giving to us amortized constant time complexity
        while (p !== root) {
            let next = this.ids[p];
            this.ids[p] = root;
            p = next;
        }

        return root;
    }

    /**
     * Check connection between p and q
     *
     * @param {number} p
     * @param {number} q
     * @return {boolean}
     */
    connected(p, q) {
        return this.find(p) === this.find(q);
    }

    /**
     * Return a size of components
     *
     * @param {number} p
     * @return {number}
     */
    componentSize(p) {
        let find = this.find(p);
        return this.sizes[find];
    }

    /**
     * Return a number of components in UF set
     *
     * @return {number}
     */
    size() {
        return this.count;
    }

    /**
     * Return count of components/set
     *
     * @return {number}
     */
    components() {
        return this.countComponents;
    }

    /**
     *  Merge sets (unify components/sets containing elements p and q)
     *
     *  @param {number} p
     *  @param {number} q
     */
    union(p, q) {
        let rootP = this.find(p);
        let rootQ = this.find(q);

        if (rootP === rootQ) return;

        // make smaller root point to larger one
        if (this.sizes[rootP] < this.sizes[rootQ]) {
            this.sizes[rootQ] += this.sizes[rootP];
            this.ids[rootP] = rootQ;
        } else {
            this.sizes[rootP] += this.sizes[rootQ];
            this.ids[rootQ] = rootP;
        }

        // decrease number of components
        this.countComponents--;
    }
}

// Examples
try {
    const size = 6;
    let qu = new QuickUnion(size);
    console.log('Start unify values (QU) ...');
    console.log('Unify 5 and 2, 4 and 5, 3 and 1');
    qu.union(5, 2);
    qu.union(4, 5);
    qu.union(3, 1);
    console.log('Checking connection 3 and 5');
    console.log(qu.connected(3, 5));
    console.log('Count of sets');
    console.log(qu.components());
    console.log('Unify 1 and 2');
    qu.union(1, 2);
    console.log('Checking connection 3 and 5 again');
    console.log(qu.connected(3, 5));
    console.log('Count of sets');
    console.log(qu.components());
} catch (e) {
    console.log(`${e.name}: ${e.message}`);
}
