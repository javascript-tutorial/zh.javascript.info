
let animal = {
  eats: true,

  walk() {
    console.log("Animal walk");
  }
};

let rabbit = {
  jumps: true
};

console.log("animal ", animal);
console.log("rabbit ", rabbit);
/*
animal  { eats: true }
rabbit  { jumps: true }
*/

console.log(rabbit.__proto__);
// [Object: null prototype] {}

console.log(animal.__proto__);
// [Object: null prototype] {}

rabbit.__proto__ = animal;
console.log("rp ", rabbit.__proto__);
// { eats: true }
console.log("r2 ", rabbit);
// r2  { jumps: true }

console.log(rabbit.jumps);
console.log(rabbit.eats);

rabbit.walk();

// Object.keys 只返回自己的 key
console.log("keys ", Object.keys(rabbit)); // jumps

// for..in 会遍历自己以及继承的键
console.log("for in");
for(let prop in rabbit) console.log(prop); // jumps，然后是 eats

console.log("check own");
for(let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop);

  if (isOwn) {
    console.log(`Our: ${prop}`); // Our: jumps
  } else {
    console.log(`Inherited: ${prop}`); // Inherited: eats
  }
}




console.log("longEar:");

let longEar = {
    earLen: 10,
    __proto__: rabbit,
};
console.log(longEar.jumps);
longEar.walk();


// let A = {
//     __proto__: B,
//     // ReferenceError: Cannot access 'B' before initialization
// }

// let B = {
//     __proto__: A,
// }

