
let user = {
  firstName: "John"
};

function f1() {
  console.log(this.firstName);
}

let funcUser = f1.bind(user);
funcUser(); // John  
