
function Rabbit(name) {
  this.name = name;
  console.log(name);
}

let rabbit = new Rabbit("White Rabbit");

let rabbit2 = new rabbit.constructor("Black Rabbit");
