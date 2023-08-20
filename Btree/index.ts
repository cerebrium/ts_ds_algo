import { BTree } from "./ds";

export function contains_node(target: number) {
  const b_class = new BTree();
  const b_tree = b_class.create_valid_b_tree();

  return b_class.depth_first_find(b_tree, target);
}

export function validate_b_tree() {
  const b_class = new BTree();
  const b_tree = b_class.create_valid_b_tree();

  return b_class.validate(b_tree);
}

export function validate_invalid_tree() {
  const b_class = new BTree();
  const b_tree = b_class.create_invalid_b_tree();

  return b_class.validate(b_tree);
}
