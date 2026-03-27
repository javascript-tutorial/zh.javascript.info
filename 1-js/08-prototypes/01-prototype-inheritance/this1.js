
// animal 有一些方法
let animal = {
  walk() {
    if (!this.isSleeping) {
      console.log(`I walk`);
    }
  },
  sleep() {
    this.isSleeping = true;
  }
};

let rabbit = {
  name: "White Rabbit",
  __proto__: animal
};

console.log(animal);
console.log(rabbit);
/*
{ walk: [Function: walk], sleep: [Function: sleep] }
{ name: 'White Rabbit' }
 */

// 修改 rabbit.isSleeping
rabbit.sleep();

console.log(animal);
console.log(rabbit);
/*
{ walk: [Function: walk], sleep: [Function: sleep] }
{ name: 'White Rabbit', isSleeping: true }
 */

console.log(rabbit.isSleeping); // true
console.log(animal.isSleeping); // undefined（原型中没有此属性）
