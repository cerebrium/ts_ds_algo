type LNode<T> = {
  val: T;
  next?: LNode<T>;
};

class LinkedList<T> {
  head: LNode<T> | undefined;
  tail: LNode<T> | undefined;

  constructor() {
    this.head = undefined;
    this.tail = undefined;
  }

  add(val: T) {
    if (!this.tail) {
      this.head = this.tail = {
        val,
        next: undefined,
      };
      return;
    }

    this.tail.next = {
      val,
      next: undefined,
    };
    this.tail = this.tail.next;
  }

  remove() {
    if (!this.head) return undefined;

    const ret_node = this.head;
    this.head = this.head.next;

    ret_node.next = undefined;
    return ret_node.val;
  }
}
