/*
 *
 * Make a list of node
 * traverse them
 * determine the order
 * of start to end
 *
 */

class AdjacencyList {
  list: Array<[number, number][]> = [];
  private visited: Array<number>;

  constructor(list: Array<[number, number][]>) {
    this.list = list;
    this.visited = new Array(list.length).fill(-1);
  }

  public findNode(target: number, start?: number): Array<number> {
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
  private traverse(node_idx = 0, target: number, is_start: boolean): boolean {
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

  private find_path(start: number, target: number): Array<number> {
    // Traverse the visited, and give the path
    // from the target to the start
    // [5, 0, 1, 2, 3, 4]
    // start: 0, target: 5
    let path: Array<number> = [];

    let parent: number = this.visited[target];
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
