importance: 5

---

# Changing "prototype"

在下面的代码中，我们创建了 `new Rabbit`，然后尝试修改其原型。

一开始，我们有这样的代码：

```js run
function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

alert( rabbit.eats ); // true
```


1. 我们增加了一个字符串（强调），`alert`现在会显示什么？

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

2. ...如果代码是这样的（换了一行）？

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

3. 像这样呢（换了一行）？

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

4. 最后一种情况

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
