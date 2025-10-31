
class Animal {
  name = 'animal';

  constructor() {
    console.log("constr ", this.name); // (*)
  }
}

class Rabbit extends Animal {
  name = 'rabbit';

  constructor(){
    super();
    console.log("name ", this.name); // rabbit
  }
}

let a = new Animal(); // animal
let r = new Rabbit(); // animal

console.log(a);
console.log(r);

/*
Animal { name: 'animal' }
Rabbit { name: 'rabbit' }
*/

