"use strict";
/*
 *
 * Make a list of node
 * traverse them
 * determine the order
 * of start to end
 *
 */
class AdjacencyList {
    constructor(list) {
        this.list = [];
        this.list = list;
        this.visited = new Array(list.length).fill(-1);
    }
    findNode(target, start) {
        if (start === target) {
            return [target];
        }
        const isFound = this.traverse(start, target, true);
        if (isFound) {
            return this.find_path(start || 0, target);
        }
        return [];
    }
    // Handle the initial case
    // deal with circles
    traverse(node_idx = 0, target, is_start) {
        const children = this.list[node_idx];
        for (const [node, weight] of children) {
            if (node === target) {
                return true;
            }
            if (this.visited[node] === -1) {
                continue;
            }
            if (!is_start) {
                this.visited[node] = node_idx;
            }
            const isNode = this.traverse(node_idx, target, false);
            if (isNode) {
                return true;
            }
        }
        return false;
    }
    find_path(start, target) {
        // Traverse the visited, and give the path
        // from the target to the start
        // [5, 0, 1, 2, 3, 4]
        // start: 0, target: 5
        let path = [];
        let parent = this.visited[target];
        while (parent !== start) {
            path.push(parent);
            parent = this.visited[parent];
        }
        return path.reverse();
    }
}
/*
 *
 * [node, weight]
 * index is the current node
 *
 * while ex:
 *
 * [
 * [[2, 3], [4, 5]]
 * ]
 *
 *
 * Node 0 has two children:
 * 3, weight 2
 * 4, weight 5
 *
 */
