import { contains_node, validate_b_tree, validate_invalid_tree } from "./Btree";
import { BTree } from "./Btree/ds";
import { test_path_finder } from "./MazePath";

// dem_r_buf();
// test_path_finder();
console.log("contains 25: ", contains_node(25));
console.log("contains 26: ", contains_node(26));

console.log("is valid tree: ", validate_b_tree());
console.log("is invalid tree: ", validate_invalid_tree());

const b_tree = new BTree();
b_tree.create_valid_b_tree();
