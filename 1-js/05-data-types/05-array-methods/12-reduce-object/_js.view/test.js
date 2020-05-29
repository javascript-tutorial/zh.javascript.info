describe("groupById", function() {

  it("creates an object grouped by id", function() {
    let users = [
      {id: 'john', name: "John Smith", age: 20},
      {id: 'ann', name: "Ann Smith", age: 24},
      {id: 'pete', name: "Pete Peterson", age: 31},
    ];

    assert.deepEqual(groupById(users), {
<<<<<<< HEAD
      john: {id: 'john', name: "John Smith", age: 20}
=======
      john: {id: 'john', name: "John Smith", age: 20},
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
      ann: {id: 'ann', name: "Ann Smith", age: 24},
      pete: {id: 'pete', name: "Pete Peterson", age: 31},
    });
  });

  it("works with an empty array", function() {
<<<<<<< HEAD
=======
    users = [];
>>>>>>> cd2c7ce3c8f033e6f7861ed1b126552e41ba3e31
    assert.deepEqual(groupById(users), {});
  });
});
