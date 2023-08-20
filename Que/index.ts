export class LNode {
  val: number;
  next: LNode | undefined;

  constructor(val: number, next: LNode | undefined) {
    this.val = val;
    this.next = next;
  }
}

export class Que {
  head: LNode | undefined;
  tail: LNode | undefined;

  constructor() {}

  push(val: number) {
    const new_node = new LNode(val, undefined);
    if (!this.head) {
      this.head = new_node;
    }

    if (this.tail) this.tail.next = new_node;

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

export function create_display_que() {
  const que = new Que();
  for (let i = 0; i < 10; i++) {
    que.push(i);
  }

  while (que.head) {
    console.log("who is next: ", que.pop());
  }
}
