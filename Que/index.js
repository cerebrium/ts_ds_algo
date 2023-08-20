"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_display_que = exports.Que = exports.LNode = void 0;
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
function create_display_que() {
    const que = new Que();
    for (let i = 0; i < 10; i++) {
        que.push(i);
    }
    while (que.head) {
        console.log("who is next: ", que.pop());
    }
}
exports.create_display_que = create_display_que;
