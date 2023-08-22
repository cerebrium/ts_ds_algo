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
var LeafStatus;
(function (LeafStatus) {
    LeafStatus["LEFT"] = "left";
    LeafStatus["RIGHT"] = "right";
    LeafStatus["BOTH"] = "both";
    LeafStatus["NONE"] = "none";
})(LeafStatus || (LeafStatus = {}));
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
    add(val) {
        const new_node = new BNode(val);
        let current_node = this.head;
        if (!current_node) {
            this.head = new_node;
            return this.head;
        }
        let parent;
        while (current_node) {
            parent = current_node;
            if (new_node.val > current_node.val) {
                current_node = current_node.right;
                continue;
            }
            current_node = current_node.left;
        }
        // Make ts happy
        if (!parent)
            return this.head;
        if ((parent === null || parent === void 0 ? void 0 : parent.val) > new_node.val) {
            parent.left = new_node;
            return this.head;
        }
        parent.right = new_node;
        return this.head;
    }
    find(target) {
        return this._find_helper(this.head, target);
    }
    _find_helper(node, target) {
        /*
         *
         * If undefined -> end of tree not found
         * If value mtches -> found node, return it;
         */
        if (!node) {
            return undefined;
        }
        if (node.val === target) {
            return node;
        }
        if (target > node.val) {
            return this._find_helper(node.right, target);
        }
        return this._find_helper(node.left, target);
    }
    delete(target) {
        /*
         *
         * If node not found -> return false;
         * If node has no children -> remove any ref's to it. remove its refs. release for gc
         * If node has one child -> link parent to child. remove node's links so can be gc.
         *
         * Else
         * Determine which branch from node down is the longest.
         *
         * If greater is longest, find smallest node in that
         * sub tree. Replace found node with smallest node.
         *
         * If smaller is longest, find largest node in that
         * subtree. Replace found node with largest node.
         *
         * head is a pima
         *
         * Handle removing refs for gc.
         */
        // Tree does not exist
        if (!this.head) {
            return false;
        }
        if (this.head.val === target) {
            // Did not implement tree height
            // parameter. So parse to find
            // the greatest of the smaller
            // sub tree. Set it as a
            // replacment of the targeted
            // node. Remove the refs of the parent to it
            // replace its left and right
            let greatests_small_node = this.head.left;
            let greatests_small_node_parent = this.head;
            // Make ts happy
            if (!greatests_small_node)
                return false;
            while (greatests_small_node.right) {
                greatests_small_node_parent = greatests_small_node;
                greatests_small_node = greatests_small_node.right;
            }
            // remove ref to re-ordered node
            greatests_small_node_parent.right = undefined;
            greatests_small_node.left = this.head.left;
            greatests_small_node.right = this.head.right;
            this.head.left = undefined;
            this.head.right = undefined;
            this.head = greatests_small_node;
            return true;
        }
        const found_relations = this._delete_helper_find(this.head, this.head.val > target ? this.head.left : this.head.right, target);
        // Cannot delete, node not found
        if (!found_relations) {
            return false;
        }
        const [parent, child] = found_relations;
        switch (this._delete_helper_det_leaf_status(child)) {
            case LeafStatus.NONE:
                // Delete and bne done;
                if (parent.left === child) {
                    parent.left = undefined;
                    return true;
                }
                parent.right = undefined;
                return true;
                break;
            case LeafStatus.LEFT:
                // set parent to left
                parent.left = child.left;
                child.left = undefined;
                return true;
            // delete child;
            case LeafStatus.RIGHT:
                // set parent to right
                parent.right = child.right;
                child.right = undefined;
                return true;
            // delete child
            case LeafStatus.BOTH:
                // Did not implement tree height
                // parameter. So parse to find
                // the greatest of the smaller
                // sub tree. Set it as a
                // replacment of the targeted
                // node. Remove the refs of the parent to it
                // replace its left and right
                let greatests_small_node = child.left;
                let greatests_small_node_parent = child;
                // Make ts happy
                if (!greatests_small_node)
                    return false;
                while (greatests_small_node.right) {
                    greatests_small_node_parent = greatests_small_node;
                    greatests_small_node = greatests_small_node.right;
                }
                // remove ref to re-ordered node
                greatests_small_node_parent.right = undefined;
                greatests_small_node.left = child.left;
                greatests_small_node.right = child.right;
                if (parent.right === child) {
                    parent.right = greatests_small_node;
                }
                else {
                    parent.left = greatests_small_node;
                }
                child.left = undefined;
                child.right = undefined;
                return true;
        }
    }
    _delete_helper_det_leaf_status(node) {
        if (!node.right && !node.left) {
            return LeafStatus.NONE;
        }
        if (node.right && node.left) {
            return LeafStatus.BOTH;
        }
        if (node.right && !node.left) {
            return LeafStatus.RIGHT;
        }
        return LeafStatus.LEFT;
    }
    _delete_helper_find(prev, node, target) {
        if (!node) {
            return undefined;
        }
        if (node.val === target) {
            return [prev, node];
        }
        if (target < node.val) {
            return this._delete_helper_find(node, node.left, target);
        }
        return this._delete_helper_find(node, node.right, target);
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
    add_array(nums = [20, 10, 5, 15, 30, 25, 35]) {
        for (const num of nums) {
            this.add(num);
        }
        return this.head;
    }
}
exports.BTree = BTree;
