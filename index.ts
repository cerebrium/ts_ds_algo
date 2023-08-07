import { Que } from "./linked_list";

const que = new Que();
for (let i = 0; i < 10; i++) {
  que.push(i);
}

console.log("what is the que: ", que);
while (que.head) {
  console.log("who is next: ", que.pop());
}
