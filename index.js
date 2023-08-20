"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Btree_1 = require("./Btree");
// dem_r_buf();
// test_path_finder();
console.log("contains 25: ", (0, Btree_1.contains_node)(25));
console.log("contains 26: ", (0, Btree_1.contains_node)(26));
console.log("is valid tree: ", (0, Btree_1.validate_b_tree)());
console.log("is invalid tree: ", (0, Btree_1.validate_invalid_tree)());
