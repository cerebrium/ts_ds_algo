"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BTree = exports.BNode = void 0;
class BNode {
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
exports.BNode = BNode;
class BTree {
    create_valid_b_tree() {
        const head = new BNode(10);
        head.left = new BNode(5);
        head.left.left = new BNode(1);
        head.left.right = new BNode(7);
        head.right = new BNode(20);
        head.right.right = new BNode(25);
        head.right.left = new BNode(15);
        this.head = head;
        return head;
    }
    create_invalid_b_tree() {
        const head = new BNode(10);
        head.left = new BNode(5);
        head.left.left = new BNode(23);
        head.left.right = new BNode(7);
        head.right = new BNode(20);
        head.right.right = new BNode(25);
        head.right.left = new BNode(15);
        this.head = head;
        return head;
    }
    depth_first_find(node, target) {
        if (!node)
            return false;
        if (node.val === target)
            return true;
        const left = this.depth_first_find(node.left, target);
        if (left)
            return left;
        const right = this.depth_first_find(node.right, target);
        if (right)
            return right;
        return false;
    }
    /*
     *
     * Base cases:
     * if each left node is less than parent
     * if each right node is greater than parent
     *
     * it is a b-tree;
     *
     */
    validate(node, max = Number.MAX_SAFE_INTEGER, min = Number.MIN_SAFE_INTEGER) {
        if (!node)
            return true;
        if (node.val > min &&
            node.val < max &&
            this.validate(node.left, node.val, min) &&
            this.validate(node.right, max, node.val))
            return true;
        return false;
    }
}
exports.BTree = BTree;