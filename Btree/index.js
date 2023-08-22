"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate_invalid_tree = exports.validate_b_tree = exports.contains_node = void 0;
const ds_1 = require("./ds");
function contains_node(target) {
    const b_class = new ds_1.BTree();
    b_class.create_valid_b_tree();
    return b_class.find(target);
}
exports.contains_node = contains_node;
function validate_b_tree() {
    const b_class = new ds_1.BTree();
    const b_tree = b_class.create_valid_b_tree();
    return b_class.validate(b_tree);
}
exports.validate_b_tree = validate_b_tree;
function validate_invalid_tree() {
    const b_class = new ds_1.BTree();
    const b_tree = b_class.create_invalid_b_tree();
    return b_class.validate(b_tree);
}
exports.validate_invalid_tree = validate_invalid_tree;
