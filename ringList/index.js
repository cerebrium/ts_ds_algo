"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dem_r_buf = void 0;
class RingBuffer {
    constructor(len) {
        this.list = new Array(len + 10);
        this.head = 5;
        this.tail = 5;
    }
    push(val) {
        if (this.tail === this.head - 1 ||
            (this.tail === this.list.length - 1 && this.head === 0)) {
            throw Error("Reallocation needed");
        }
        this.list[this.tail] = val;
        if (this.tail === this.list.length - 1) {
            this.tail = 0;
            return;
        }
        this.tail++;
    }
    pop() {
        const ret_val = this.list[this.head];
        if (this.head + 1 === this.tail)
            return ret_val;
        if (this.head !== this.list.length) {
            this.head++;
            return ret_val;
        }
        this.head = 0;
        return ret_val;
    }
}
function dem_r_buf() {
    const r_buf = new RingBuffer(110);
    for (let i = 0; i < 105; i++) {
        r_buf.push(i);
    }
    console.log("current head: ", r_buf.head, "\nCurrent Tail: ", r_buf.tail);
    for (let i = 0; i < 105; i++) {
        console.log("Pop", r_buf.pop());
    }
}
exports.dem_r_buf = dem_r_buf;
function hello_world() { }
