
let sayHi = function() {
    console.log("Hi");
  };
  
  console.log(sayHi);
  console.log(sayHi.name); // sayHi（有名字！）
  
  let aaa = sayHi;
  console.log(aaa); // still sayHi, sure.
  aaa();
  
  let qqq = function(){
    console.log("q");
  };
  console.log(qqq.name);
  
  let ann = () => { console.log("a"); };
  console.log(ann.name);
  ann();
