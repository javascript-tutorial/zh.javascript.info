
Promise.all([

    new Promise((resolve, reject) => {
      setTimeout(() => resolve(1), 1000)
    }),

    2,
    3
  ]).then(console.log); // 1, 2, 3
