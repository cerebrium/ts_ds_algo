"use strict";
/*interface LNode {
  next: LNode | undefined;
  val: number;
}

function create_linked_node(num: number, next: LNode | undefined): LNode {
  return {
    val: num,
    next,
  };
}

export function create_linked_list(nums: number[]): LNode {
  let head = create_linked_node(nums[0], undefined);
  let curr = head;

  for (const num of nums) {
    const next = create_linked_node(num, undefined);
    curr.next = next;
    curr = next;
  }

  return head;
}

export function read_Linked_list(head: LNode | undefined) {
  if (!head) return;

  do {
    console.log("node: ", head.val);
    head = head.next;
  } while (!!head);
}

export function delete_node(head: LNode, k: number) {
  if (!head) return;

  let prev: LNode = head;
  let curr: LNode | undefined = head.next;

  do {
    if (!curr) break;

    if (curr?.val == k) {
      prev.next = curr.next;
      break;
    }
    prev = curr;
    curr = curr.next;
  } while (curr);
}*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Que = exports.LNode = void 0;
class LNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}
exports.LNode = LNode;
class Que {
    constructor() { }
    push(val) {
        const new_node = new LNode(val, undefined);
        if (!this.head) {
            this.head = new_node;
        }
        if (this.tail)
            this.tail.next = new_node;
        this.tail = new_node;
    }
    pop() {
        if (!this.head) {
            return undefined;
        }
        const current_head = this.head;
        this.head = current_head.next;
        current_head.next = undefined;
        return current_head;
    }
}
exports.Que = Que;
