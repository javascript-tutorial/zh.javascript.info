
class MyError extends Error {
  constructor(message) {
    super(message);

    console.log("constr ", this.constructor);
    // constr  [class PropertyRequiredError extends ValidationError]

    this.name = this.constructor.name;
  }
}

class ValidationError extends MyError { }

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// name 是对的
console.log( new PropertyRequiredError("field").name ); // PropertyRequiredError
