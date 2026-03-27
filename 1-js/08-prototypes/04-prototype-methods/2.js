
let animal = {
  eats: true
};

let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});

console.log(rabbit);
// {}

console.log(rabbit.jumps); // true

console.log(rabbit.__proto__);
// { eats: true }
// = animal

/*
*/