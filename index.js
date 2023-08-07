"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linked_list_1 = require("./linked_list");
const que = new linked_list_1.Que();
for (let i = 0; i < 10; i++) {
    que.push(i);
}
console.log("what is the que: ", que);
while (que.head) {
    console.log("who is next: ", que.pop());
}
