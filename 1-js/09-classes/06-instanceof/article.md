# 类型检测："instanceof"

`instanceof` 操作符用于检测一个对象是否属于某个特定的 class。同时，它还考虑了继承。

在许多情况下，可能都需要进行此类检查。在这儿，我们将使用它来构建一个 **多态性（polymorphic）** 的函数，该函数根据参数的类型对参数进行不同的处理。

## instanceof 操作符 [#ref-instanceof]

语法：
```js
obj instanceof Class
```

如果 `obj` 隶属于 `Class` 类（或 `Class` 类的衍生类），则返回 `true`。

例如：

```js run
class Rabbit {}
let rabbit = new Rabbit();

// rabbit 是 Rabbit class 的对象吗？
*!*
alert( rabbit instanceof Rabbit ); // true
*/!*
```

它还可以与构造函数一起使用：

```js run
*!*
// 这里是构造函数，而不是 class
function Rabbit() {}
*/!*

alert( new Rabbit() instanceof Rabbit ); // true
```

……与诸如 `Array` 之类的内建 class 一起使用：

```js run
let arr = [1, 2, 3];
alert( arr instanceof Array ); // true
alert( arr instanceof Object ); // true
```

有一点需要留意，`arr` 同时还隶属于 `Object` 类。因为从原型上来讲，`Array` 是继承自 `Object` 的。

通常，`instanceof` 在检测中会将原型链考虑在内。此外，我们还可以在静态方法 `Symbol.hasInstance` 中设置自定义逻辑。

`obj instanceof Class` 算法的执行过程大致如下：

1. 如果这儿有静态方法 `Symbol.hasInstance`，那就直接调用这个方法：

    例如：

    ```js run
    // 设置 instanceOf 检查
    // 并假设具有 canEat 属性的都是 animal
    class Animal {
      static [Symbol.hasInstance](obj) {
        if (obj.canEat) return true;
      }
    }

    let obj = { canEat: true };

    alert(obj instanceof Animal); // true：Animal[Symbol.hasInstance](obj) 被调用
    ```

2. 大多数 class 没有 `Symbol.hasInstance`。在这种情况下，标准的逻辑是：使用 `obj instanceOf Class` 检查 `Class.prototype` 是否等于 `obj` 的原型链中的原型之一。

    换句话说就是，一个接一个地比较：
    ```js
    obj.__proto__ === Class.prototype?
    obj.__proto__.__proto__ === Class.prototype?
    obj.__proto__.__proto__.__proto__ === Class.prototype?
    ...
    // 如果任意一个的答案为 true，则返回 true
    // 否则，如果我们已经检查到了原型链的尾端，则返回 false
    ```

    在上面那个例子中，`rabbit.__proto__ === Rabbit.prototype`，所以立即就给出了结果。

    而在继承的例子中，匹配将在第二步进行：

    ```js run
    class Animal {}
    class Rabbit extends Animal {}

    let rabbit = new Rabbit();
    *!*
    alert(rabbit instanceof Animal); // true
    */!*

    // rabbit.__proto__ === Rabbit.prototype
    *!*
    // rabbit.__proto__.__proto__ === Animal.prototype (match!)
    */!*
    ```

下图展示了 `rabbit instanceof Animal` 的执行过程中，`Animal.prototype` 是如何参与比较的：

![](instanceof.svg)

这里还要提到一个方法 [objA.isPrototypeOf(objB)](mdn:js/object/isPrototypeOf)，如果 `objA` 处在 `objB` 的原型链中，则返回 `true`。所以，可以将 `obj instanceof Class` 检测改为 `Class.prototype.isPrototypeOf(obj)`。

这很有趣，但是 `Class` 的 constructor 自身是不参与检测的！检测过程只和原型链以及 `Class.prototype` 有关。

创建对象后，如果更改 `prototype` 属性，可能会导致有趣的结果。

就像这样：

```js run
function Rabbit() {}
let rabbit = new Rabbit();

// 修改了 prototype
Rabbit.prototype = {};

// ...再也不是 rabbit 了！
*!*
alert( rabbit instanceof Rabbit ); // false
*/!*
```

## 福利：使用 Object.prototype.toString 方法来揭示类型

大家都知道，一个普通对象被转化为字符串时为 `[object Object]`：

```js run
let obj = {};

alert(obj); // [object Object]
alert(obj.toString()); // 同上
```

这也是它们的 `toString` 方法的实现如此。但是，`toString` 自有其潜质，可以让它变得更实用一点。甚至可以用来替代 `instanceof`，也可以视作为 `typeof` 的增强版。

听起来挺不可思议？那是自然，精彩马上揭晓。

按照 [规范](https://tc39.github.io/ecma262/#sec-object.prototype.tostring) 上所讲，内置的 `toString` 方法可以从对象中提取出来，以其他值作为上下文（context）对象进行调用，调用结果取决于传入的上下文对象。

- 如果传入的是 number 类型，返回 `[object Number]`
- 如果传入的是 boolean 类型，返回 `[object Boolean]`
- 如果传入 `null`，返回 `[object Null]`
- 传入 `undefined`，返回 `[object Undefined]`
- 传入数组，返回 `[object Array]`
- ...等等（例如一些自定义类型）

下面进行阐述：

```js run
// 保存 toString 方法的引用，方便后面使用
let objectToString = Object.prototype.toString;

// 猜猜是什么类型？
let arr = [];

alert( objectToString.call(arr) ); // [object Array]
```

这里用到了章节 [](info:call-apply-decorators) 里提到的 [call](mdn:js/function/call) 方法来调用 `this=arr` 上下文的方法 `objectToString`。

`toString` 的内部算法会检查 `this` 对象，返回对应的结果。再来几个例子：

```js run
let s = Object.prototype.toString;

alert( s.call(123) ); // [object Number]
alert( s.call(null) ); // [object Null]
alert( s.call(alert) ); // [object Function]
```

### Symbol.toStringTag

对象的 `toString` 方法可以使用 `Symbol.toStringTag` 这个特殊的对象属性进行自定义输出。

举例说明：

```js run
let user = {
  [Symbol.toStringTag]: "User"
};

alert( {}.toString.call(user) ); // [object User]
```

大部分和环境相关的对象也有这个属性。以下输出可能因浏览器不同而异：

```js run
// 环境相关对象和类的 toStringTag：
alert( window[Symbol.toStringTag]); // window
alert( XMLHttpRequest.prototype[Symbol.toStringTag] ); // XMLHttpRequest

alert( {}.toString.call(window) ); // [object Window]
alert( {}.toString.call(new XMLHttpRequest()) ); // [object XMLHttpRequest]
```

输出结果和 `Symbol.toStringTag`（前提是这个属性存在）一样，只不过被包裹进了 `[object ...]` 里。

这样一来，我们手头上就有了个“磕了药似的 typeof”，不仅能检测基本数据类型，就是内置对象类型也不在话下，更可贵的是还支持自定义。

所以，如果希望以字符串的形式获取内置对象类型信息，而不仅仅只是检测类型的话，可以用这个方法来替代 `instanceof`。

## 总结

下面，来总结下大家学到的类型检测方式：

|               | 用于 |  返回      |
|---------------|-------------|---------------|
| `typeof`      | 基本数据类型 |  string       |
| `{}.toString` | 基本数据类型、内置对象以及包含 `Symbol.toStringTag` 属性的对象 |       string |
| `instanceof`  | 任意对象     |  true/false   |

看样子，`{}.toString` 基本就是一增强版  `typeof`。

`instanceof` 在涉及多层类结构的场合中比较实用，这种情况下需要将类的继承关系考虑在内。
