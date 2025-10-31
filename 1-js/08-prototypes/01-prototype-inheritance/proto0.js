
let Animal = {
    walk(){ console.log('walk'); }
};

console.log("A _ ", Animal.__proto__);
// [Object: null prototype] {}


console.log("A p ", Animal.prototype);
// undefined


let Rabbit = {
    __proto__: Animal,
};
console.log("R _ ", Rabbit.__proto__);
// {}

console.log("R p ", Rabbit.prototype);
// undefined
