importance: 5

---

# 修改 "prototype"

在下面的代码中，我们创建了 `new Rabbit`，然后尝试修改它的 prototype。

最初，我们有以下代码：

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true
```


<<<<<<< HEAD:1-js/08-prototypes/02-function-prototype/1-changing-prototype/task.md
1. 我们增加了一个字符串（强调）。现在 `alert` 会显示什么？
=======
1. We added one more string (emphasized). What will `alert` show now?
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439:1-js/08-prototypes/02-function-prototype/1-changing-prototype/task.md

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype = {};
    */!*

    alert( rabbit.eats ); // ?
    ```

2. ……如果代码是这样的（修改了一行）？

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    Rabbit.prototype.eats = false;
    */!*

    alert( rabbit.eats ); // ?
    ```

<<<<<<< HEAD:1-js/08-prototypes/02-function-prototype/1-changing-prototype/task.md
3. 像这样呢（修改了一行）？
=======
3. And like this (replaced one line)?
>>>>>>> c3a11c85e54153ebb137b5541b1d1f751c804439:1-js/08-prototypes/02-function-prototype/1-changing-prototype/task.md

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete rabbit.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```

4. 最后一种变体：

    ```js
    function Rabbit() {}
    Rabbit.prototype = {
      eats: true
    };

    let rabbit = new Rabbit();

    *!*
    delete Rabbit.prototype.eats;
    */!*

    alert( rabbit.eats ); // ?
    ```
