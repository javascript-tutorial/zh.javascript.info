# Proxy 和 Reflect

一个 `Proxy` 对象包装另一个对象并拦截诸如读取/写入属性和其他操作，可以选择自行处理它们，或者透明地允许该对象处理它们。

Proxy 用于许多库和某些浏览器框架。在本章中，我们将看到许多实际应用。

语法：

```js
let proxy = new Proxy(target, handler)
```

- `target` —— 是要包装的对象，可以是任何东西，包括函数。
- `handler` —— 代理配置：带有“陷阱”（“traps”，即拦截操作的方法）的对象。比如 `get` 陷阱用于读取 `target` 属性，`set` 陷阱写入 `target` 属性等等。

对 `proxy` 进行操作，如果在 `handler` 中存在相应的陷阱，则它将运行，并且 Proxy 有机会对其进行处理，否则将直接对 target 进行处理。

首先，让我们创建一个没有任何陷阱的代理：

```js run
let target = {};
let proxy = new Proxy(target, {}); // 空的handler对象

proxy.test = 5; // 写入 Proxy 对象 (1)
alert(target.test); // 返回 5，test属性出现在了 target 上！

alert(proxy.test); // 还是 5，我们也可以从 proxy 对象读取它 (2)

for(let key in proxy) alert(key); // 返回 test，迭代也正常工作！ (3)
```

由于没有陷阱，所有对 `proxy` 的操作都直接转发给 `target`。

1. 写入操作 `proxy.test=` 会将值写入 `target`。
2. 读取操作 `proxy.test` 会从 `target` 返回对应的值。
3. 迭代 `proxy` 会从 `target` 返回对应的值。

我们可以看到，没有任何陷阱，`proxy` 是一个 `target` 的透明包装.

![](proxy.svg)  

`Proxy` 是一种特殊的“奇异对象”。它没有自己的属性。如果 `handler` 为空，则透明地将操作转发给 `target`。

要激活更多功能，让我们添加陷阱。

我们可以用它们拦截什么？

对于对象的大多数操作，JavaScript 规范中都有一个所谓的“内部方法”，它描述了最底层的工作方式。 例如 `[[Get]]`，用于读取属性的内部方法， `[[Set]]`，用于写入属性的内部方法，等等。这些方法仅在规范中使用，我们不能直接通过方法名调用它们。

Proxy 陷阱会拦截这些方法的调用。它们在[代理规范](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots)和下表中列出。

对于每个内部方法，此表中都有一个陷阱：可用于添加到 `new Proxy` 时的 `handler` 参数中以拦截操作的方法名称：

| 内部方法 | Handler 方法 | 何时触发 |
|-----------------|----------------|-------------|
| `[[Get]]` | `get` | 读取属性 |
| `[[Set]]` | `set` | 写入属性 |
| `[[HasProperty]]` | `has` | `in` 运算符 |
| `[[Delete]]` | `deleteProperty` | `delete` 操作 |
| `[[Call]]` | `apply` | proxy 对象作为函数被调用 |
| `[[Construct]]` | `construct` | `new` 操作 |
| `[[GetPrototypeOf]]` | `getPrototypeOf` | [Object.getPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) |
| `[[SetPrototypeOf]]` | `setPrototypeOf` | [Object.setPrototypeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) |
| `[[IsExtensible]]` | `isExtensible` | [Object.isExtensible](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) |
| `[[PreventExtensions]]` | `preventExtensions` | [Object.preventExtensions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) |
| `[[DefineOwnProperty]]` | `defineProperty` | [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), [Object.defineProperties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) |
| `[[GetOwnProperty]]` | `getOwnPropertyDescriptor` | [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor), `for..in`, `Object.keys/values/entries` |
| `[[OwnPropertyKeys]]` | `ownKeys` | [Object.getOwnPropertyNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), `for..in`, `Object/keys/values/entries` |

```warn header="Invariants"
JavaScript 强制执行某些不变式————当必须由内部方法和陷阱来完成操作时。

其中大多数用于返回值：
- `[[Set]]` 如果值已成功写入，则必须返回 `true`，否则返回 `false`。
- `[[Delete]]` 如果已成功删除该值，则必须返回 `true`，否则返回 `false`。
- ……依此类推，我们将在下面的示例中看到更多内容。

还有其他一些不变量，例如：
- `[[GetPrototypeOf]]`, 应用于代理对象的，必须返回与 `[[GetPrototypeOf]]` 应用于被代理对象相同的值。换句话说，读取代理对象的原型必须始终返回被代理对象的原型。

陷阱可以拦截这些操作，但是必须遵循这些规则。

不变量确保语言功能的正确和一致的行为。完整的不变量列表在[规范](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots)。如果您不做奇怪的事情，就不会违反它们。
```

让我们看看实际示例中的工作原理。

## 带 "get" 陷阱的默认值

最常见的陷阱是用于读取/写入属性。

要拦截读取操作，`handler` 应该有 `get(target, property, receiver)` 方法。

读取属性时触发该方法，参数如下：

- `target` —— 是目标对象，该对象作为第一个参数传递给 `new Proxy`，
- `property` —— 目标属性名,
- `receiver` —— 如果目标属性是一个 getter 访问器属性，则 `receiver` 就是本次读取属性所在的 `this` 对象。通常，这就是 `proxy` 对象本身（或者，如果我们从代理继承，则是从该代理继承的对象）。现在我们不需要此参数，因此稍后将对其进行详细说明。

让我们用 `get` 实现对象的默认值。

我们将创建一个对不存在的数组项返回0的数组。

通常，当人们尝试获取不存在的数组项时，他们会得到 `undefined`, 但是我们会将常规数组包装到代理中，以捕获读取操作并在没有此类属性的情况下返回 `0`：

```js run
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return 0; // 默认值
    }
  }
});

*!*
alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (没有这样的元素)
*/!*
```

如我们所见，使用 `get` 陷阱非常容易。

我们可以用 `Proxy` 来实现任何读取默认值的逻辑。

想象一下，我们有一本词典，上面有短语及其翻译：

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

alert( dictionary['Hello'] ); // Hola
alert( dictionary['Welcome'] ); // undefined
```

现在，如果没有短语，从 `dictionary` 读取将返回 `undefined`。但实际上，返回一个未翻译短语通常比 `undefined` 要好。因此，让我们在这种情况下返回一个未翻译的短语，而不是 `undefined`。

为此，我们将包装 `dictionary` 进一个拦截读取操作的代理：

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
*!*
  get(target, phrase) { // 拦截读取属性操作
*/!*
    if (phrase in target) { //如果字典包含该短语
      return target[phrase]; // 返回译文
    } else {
      // 否则返回未翻译的短语
      return phrase;
    }
  }
});

// 在字典中查找任意短语！
// 最坏的情况也只是它们没有被翻译。
alert( dictionary['Hello'] ); // Hola
*!*
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy
*/!*
```

````smart
请注意代理如何覆盖变量：

```js
dictionary = new Proxy(dictionary, ...);
```

代理应该在所有地方都完全替代了目标对象。目标对象被代理后，任何人都不应该再引用目标对象。否则很容易搞砸。
````

## 使用 "set" 陷阱进行验证

假设我们想要一个专门用于数字的数组。如果添加了其他类型的值，则应该抛出一个错误。

当写入属性时 `set` 陷阱触发。

`set(target, property, value, receiver)`:

- `target` —— 是目标对象，该对象作为第一个参数传递给 `new Proxy`，
- `property` —— 目标属性名称，
- `value` —— 目标属性要设置的值，
- `receiver` —— 与 `get` 陷阱类似，仅与 setter 访问器相关。

如果写入操作成功，`set` 陷阱应该返回 `true`，否则返回 `false`（触发 `TypeError`）。

让我们用它来验证新值：

```js run
let numbers = [];

numbers = new Proxy(numbers, { // (*)
*!*
  set(target, prop, val) { // 拦截写入操作
*/!*
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // 添加成功
numbers.push(2); // 添加成功
alert("Length is: " + numbers.length); // 2

*!*
numbers.push("test"); // TypeError （proxy 的 `set` 操作返回 false）
*/!*

alert("This line is never reached (error in the line above)");
```

请注意：Array 的内建方法依然生效！ 值使用 `push` 方法添加入数组。添加值时，`length` 属性会自动增加。我们的代理对象 Proxy 不会破坏任何东西。

我们不必重写诸如 `push` 和 `unshift` 等添加元素的数组方法，就可以在其中添加检查，因为在内部它们使用代理所拦截的 `[[Set]]` 操作。

因此，代码简洁明了。

```warn header="别忘了返回 `true`"
如上所述，要保持不变式。

对于 `set`操作, 它必须在成功写入时返回 `true`。

如果我们忘记这样做或返回任何 falsy值，则该操作将触发 `TypeError`。
```

## 使用 "ownKeys" 和 "getOwnPropertyDescriptor" 进行迭代

`Object.keys`，`for..in` 循环和大多数其他遍历对象属性的方法都使用 `[[OwnPropertyKeys]]` 内部方法（由 `ownKeys` 陷阱拦截) 来获取属性列表。

这些方法在细节上有所不同：
- `Object.getOwnPropertyNames(obj)` 返回非 Symbol 键。
- `Object.getOwnPropertySymbols(obj)` 返回 symbol 键。
- `Object.keys/values()` 返回带有 `enumerable` 标记的非 Symbol 键值对（属性标记在章节 <info:property-descriptors> 有详细描述).
- `for..in` 循环遍历所有带有 `enumerable` 标记的非 Symbol 键，以及原型对象的键。

……但是所有这些都从该列表开始。

在下面的示例中，我们使用 `ownKeys` 陷阱拦截 `for..in` 对 `user` 的遍历，还使用 `Object.keys` 和 `Object.values` 来跳过以下划线  `_` 开头的属性：

```js run
let user = {
  name: "John",
  age: 30,
  _password: "***"
};

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "ownKeys" 过滤掉 _password
for(let key in user) alert(key); // name，然后是 age

// 对这些方法同样有效：
alert( Object.keys(user) ); // name,age
alert( Object.values(user) ); // John,30
```

到目前为止，它仍然有效。

虽然，如果我们返回对象中不存在的键，`Object.keys` 并不会列出该键：

```js run
let user = { };

user = new Proxy(user, {
*!*
  ownKeys(target) {
*/!*
    return ['a', 'b', 'c'];
  }
});

alert( Object.keys(user) ); // <empty>
```

为什么？原因很简单：`Object.keys` 仅返回带有 `enumerable` 标记的属性。为了检查它， 该方法会对每个属性调用 `[[GetOwnProperty]]` 来获得[属性描述符](info:property-descriptors)。在这里，由于没有属性，其描述符为空，没有 `enumerable` 标记，因此它将略过。

为了让 `Object.keys` 返回一个属性，我们要么需要将该属性及 `enumerable` 标记存入对象，或者我们可以拦截对它的调用 `[[GetOwnProperty]]` (陷阱 `getOwnPropertyDescriptor` 会执行此操作)，并返回描述符enumerable: true。

这是一个例子：

```js run
let user = { };

user = new Proxy(user, {
  ownKeys(target) { // 一旦被调用，就返回一个属性列表
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) { // 被每个属性调用
    return {
      enumerable: true,
      configurable: true
      /* 其他属性，类似于 "value:..." */
    };
  }

});

alert( Object.keys(user) ); // a, b, c
```

让我们再次注意：如果该属性在对象中不存在，则我们只需要拦截 `[[GetOwnProperty]]`。

## 具有 "deleteProperty" 和其他陷阱的受保护属性

有一个普遍的约定，即下划线 `_` 前缀的属性和方法是内部的。不应从对象外部访问它们。

从技术上讲，这是可能的：

```js run
let user = {
  name: "John",
  _password: "secret"
};

alert(user._password); // secret  
```

让我们使用代理来防止对以 `_` 开头的属性的任何访问。

我们需要以下陷阱：
- `get` 读取此类属性时抛出错误，
- `set` 写入属性时抛出错误，
- `deleteProperty` 删除属性时抛出错误，
- `ownKeys` 在使用 `for..in` 和类似 `Object.keys` 的方法时排除以 `_` 开头的属性。

代码如下：

```js run
let user = {
  name: "John",
  _password: "***"
};

user = new Proxy(user, {
*!*
  get(target, prop) {
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    }
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value; // (*)
  },
*!*
  set(target, prop, val) { // 拦截写入操作
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },
*!*
  deleteProperty(target, prop) { // 拦截属性删除
*/!*  
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
*!*
  ownKeys(target) { // 拦截读取属性列表
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// “get” 不允许读取 _password
try {
  alert(user._password); // Error: Access denied
} catch(e) { alert(e.message); }

//  “set” 不允许写入 _password
try {
  user._password = "test"; // Error: Access denied
} catch(e) { alert(e.message); }

// “deleteProperty” 不允许删除 _password 属性
try {
  delete user._password; // Error: Access denied
} catch(e) { alert(e.message); }

// “ownKeys” 过滤排除 _password
for(let key in user) alert(key); // name
```

请注意在行 `(*)` 中 `get` 陷阱的重要细节：

```js
get(target, prop) {
  // ...
  let value = target[prop];
*!*
  return (typeof value === 'function') ? value.bind(target) : value; // (*)
*/!*
}
```

为什么我们需要一个函数调用 `value.bind(target)`？

原因是对象方法（例如 `user.checkPassword()`）必须能够访问 `_password`：

```js
user = {
  // ...
  checkPassword(value) {
    //对象方法必须能读取 _password
    return value === this._password;
  }
}
```


对 `user.checkPassword()` 的一个调用会调用代理对象 `user` 作为 `this`（点运算符之前的对象会成为 `this`），因此，当它尝试访问 `this._password` 时 `get` 陷阱将激活（它在读取任何属性时触发）并抛出错误。

因此，我们在行 `(*)` 中将对象方法的上下文绑定到原始对象，`target`。然后，它们将来的调用将使用 `target` 作为 `this`，不触发任何陷阱。

该解决方案通常可行，但并不理想，因为一种方法可能会将未代理的对象传递到其他地方，然后我们会陷入困境：原始对象在哪里，代理的对象在哪里？

此外，一个对象可能会被代理多次（多个代理可能会对该对象添加不同的“调整”），并且如果我们将未包装的对象传递给方法，则可能会产生意想不到的后果。

因此，在任何地方都不应使用这种代理。

```smart header="类的私有属性"
现代 Javascript 引擎原生支持私有属性，其以 `#` 作为前缀。这在章节 <info:private-protected-properties-methods> 中有详细描述。Proxy并不是必需的。

但是，此类属性有其自身的问题。特别是，它们是不可继承的。
```

## "In range" 及 "has" 陷阱

让我们来看更多示例。

我们有一个 range 对象：

```js
let range = {
  start: 1,
  end: 10
};
```

我们想使用 `in` 运算符来检查数字是否在 `range` 范围内。

该 `has` 陷阱拦截 `in` 调用。

`has(target, property)`

- `target` —— 是目标对象，作为第一个参数传递给 `new Proxy`
- `property` —— 属性名称

示例如下

```js run
let range = {
  start: 1,
  end: 10
};

range = new Proxy(range, {
*!*
  has(target, prop) {
*/!*
    return prop >= target.start && prop <= target.end
  }
});

*!*
alert(5 in range); // true
alert(50 in range); // false
*/!*
```

漂亮的语法糖，不是吗？而且实现起来非常简单。

## 包装函数："apply" [#proxy-apply]

我们也可以将代理包装在函数周围。

`apply(target, thisArg, args)` 陷阱能使代理以函数的方式被调用：

- `target` 是目标对象（函数是 JavaScript 中的对象）
- `thisArg` 是 `this` 的值
- `args` 是参数列表

例如，让我们回想一下 `delay(f, ms)` 装饰器，它是我们在 <info:call-apply-decorators> 一章中完成的。

在该章中，我们没有用 proxy 来实现它。调用 `delay(f, ms)` 返回一个函数，该函数会将在 `ms` 毫秒后把所有调用转发到 `f`。

这是以前的基于函数的实现：

```js run
function delay(f, ms) {
  // 返回一个超时后调用 f 函数的包装器
  return function() { // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// 这次包装后，sayHi 在3秒后被调用
sayHi = delay(sayHi, 3000);

sayHi("John"); // Hello, John! （3秒后）
```

正如我们已经看到的那样，大多数情况下都是可行的。包装函数 `(*)` 在超时后执行调用。

但是包装函数不会转发属性读/写操作或其他任何操作。包装后，无法访问原有函数的属性，比如 `name`，`length`和其他：

```js run
function delay(f, ms) {
  return function() {
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

*!*
alert(sayHi.length); // 1 （函数的 length 是其声明中的参数个数）
*/!*

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 0 （在包装器声明中，参数个数为0)
*/!*
```

`Proxy` 功能强大得多，因为它将所有东西转发到目标对象。

让我们使用 `Proxy` 而不是包装函数：

```js run
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      setTimeout(() => target.apply(thisArg, args), ms);
    }
  });
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 1 (*) proxy 转发“获取 length” 操作到目标对象
*/!*

sayHi("John"); // Hello, John! （3秒后）
```

结果是相同的，但现在不仅调用，而且代理上的所有操作都转发到原始函数。所以sayHi.length在 `(*)` 行包装后正确返回结果(*)。

我们有一个“更丰富”的包装器。

还存在其他陷阱：完整列表在本章的开头。它们的使用模式与上述类似。

## Reflect

`Reflect` 是一个内置对象，可简化的创建 `Proxy`。

以前的内部方法，比如`[[Get]]`，`[[Set]]` 等等都只是规范，不能直接调用。

`Reflect` 对象使调用这些内部方法成为可能。它的方法是内部方法的最小包装。

这是 `Reflect` 执行相同操作和调用的示例：

| 操作 |  `Reflect` 调用 | 内部方法 |
|-----------------|----------------|-------------|
| `obj[prop]` | `Reflect.get(obj, prop)` | `[[Get]]` |
| `obj[prop] = value` | `Reflect.set(obj, prop, value)` | `[[Set]]` |
| `delete obj[prop]` | `Reflect.deleteProperty(obj, prop)` | `[[Delete]]` |
| `new F(value)` | `Reflect.construct(F, value)` | `[[Construct]]` |
| ... | ... | ... |

例如：

```js run
let user = {};

Reflect.set(user, 'name', 'John');

alert(user.name); // John
```

尤其是，`Reflect` 允许我们使用函数（`Reflect.construct`，`Reflect.deleteProperty`，……）执行操作（`new`，`delete`，……）。这是一个有趣的功能，但是这里还有一点很重要。

**对于每个可被 `Proxy` 捕获的内部方法，`Reflect` 都有一个对应的方法 Reflect，其名称和参数与 `Proxy` 陷阱相同。**

因此，我们可以用 `Reflect` 来将操作转发到原始对象。

在此示例中，陷阱 `get` 和 `set` 透明地（好像它们都不存在）将读/写操作转发到对象，并显示一条消息：

```js run
let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
*!*
    return Reflect.get(target, prop, receiver); // (1)
*/!*
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
*!*
    return Reflect.set(target, prop, val, receiver); // (2)
*/!*
  }
});

let name = user.name; // shows "GET name"
user.name = "Pete"; // shows "SET name=Pete"
```

这里:

- `Reflect.get` 读取一个对象属性
- `Reflect.set` 写入对象属性，成功返回 `true` ，否则返回 `false`

就是说，一切都很简单：如果陷阱想要将调用转发给对象，则只需使用相同的参数调用 `Reflect.<method>` 就足够了。

在大多数情况下，我们可以不使用 `Reflect` 完成相同的事情，例如，使用`Reflect.get(target, prop, receiver)` 读取属性可以替换为 `target[prop]`。尽管有一些细微的差别。

### 代理一个 getter 

让我们看一个示例，说明为什么 `Reflect.get` 更好。我们还将看到为什么 `get/set` 有第四个参数 `receiver`，而我们以前没有使用过它。

我们有一个带有一个 `_name` 属性和一个 getter 的对象 `user`。

这是一个 Proxy：

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

*!*
let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop];
  }
});
*/!*

alert(userProxy.name); // Guest
```

该 `get` 陷阱在这里是“透明的”，它返回原来的属性，不会做别的任何事情。对于我们的示例而言，这就足够了。

一切似乎都很好。但是让我们将示例变得更加复杂。

另一个对象 `admin`从 `user` 继承后，我们可以观察到错误的行为：

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

*!*
let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

// Expected: Admin
alert(admin.name); // 输出：Guest （？！？）
*/!*
```

读取 `admin.name` 应该返回 `"Admin"`，而不是 `"Guest"`！

怎么了？也许我们在继承方面做错了什么？

但是，如果我们删除代理，那么一切都会按预期进行。

问题实际上出在代理中，在 `(*)`行。

1. 当我们读取 `admin.name`，由于 `admin` 对象自身没有对应的的属性，搜索将转到其原型。
2. 原型是 `userProxy`。
3. 从代理读取 `name` 属性时，`get` 陷阱会触发并从原始对象返回 `target[prop]` 属性，在 `(*)` 行

    当调用 `target[prop]` 时，若 `prop` 是一个 getter，它将在 `this=target` 上下文中运行其代码。因此，结果是来自原始对象 `target` 的 `this._name` 即来自 `user`。

为了解决这种情况，我们需要 `get` 陷阱的第三个参数 `receiver`。它保证传递正确的 `this` 给 getter。在我们的情况下是 `admin`。

如何为 getter 传递上下文？对于常规函数，我们可以使用 `call/apply`，但这是一个 getter，它不是“被调用”的，只是被访问的。

`Reflect.get` 可以做到的。如果我们使用它，一切都会正常运行。

这是更正后的变体：

```js run
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
*!*
    return Reflect.get(target, prop, receiver); // (*)
*/!*
  }
});


let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

*!*
alert(admin.name); // Admin
*/!*
```

现在 `receiver`，保留了对正确 `this` 的引用（即`admin`）的引用，该引用将在 `(*)` 行中使用`Reflect.get`传递给getter。

我们可以将陷阱重写得更短： 

```js
get(target, prop, receiver) {
  return Reflect.get(*!*...arguments*/!*);
}
```


`Reflect` 调用的命名方式与陷阱完全相同，并且接受相同的参数。它们是通过这种方式专门设计的。

因此， `return Reflect...` 会提供一个安全的提示程序来转发操作，并确保我们不会忘记与此相关的任何内容。

## Proxy 的局限

代理提供了一种独特的方法，可以在最底层更改或调整现有对象的行为。但是，它并不完美。有局限性。

### 内置对象：内部插槽（Internal slots）

许多内置对象，例如 `Map`, `Set`, `Date`, `Promise` 等等都使用了所谓的 "内部插槽"。

它们类似于属性，但仅限于内部使用，仅用于规范目的。例如， `Map` 将项目存储在 `[[MapData]]`中。内置方法直接访问它们，而不通过 `[[Get]]/[[Set]]` 内部方法。所以 `Proxy` 不能拦截。

为什么要在意呢？他们是内部的！

好吧，这就是问题。在像这样的内置对象被代理后，代理对象没有这些内部插槽，因此内置方法将失败。

例如：

```js run
let map = new Map();

let proxy = new Proxy(map, {});

*!*
proxy.set('test', 1); // Error
*/!*
```

在内部，一个 `Map` 将所有数据存储在其 `[[MapData]]` 内部插槽中。代理对象没有这样的插槽。[内建方法 `Map.prototype.set`](https://tc39.es/ecma262/#sec-map.prototype.set) 方法试图访问内部属性 `this.[[MapData]]`，但由于 `this=proxy` 在 `proxy` 中不能找到它，只能失败。

幸运的是，有一种解决方法：

```js run
let map = new Map();

let proxy = new Proxy(map, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
*!*
    return typeof value == 'function' ? value.bind(target) : value;
*/!*
  }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (works!)
```

现在它可以正常工作，因为 `get` 陷阱将函数属性（例如 `map.set`）绑定到目标对象（`map`）本身。

与前面的示例不同，`proxy.set(...)` 内部 `this` 的值并不是 `proxy`，而是原始对象 `map`。因此，当`set` 陷阱的内部实现尝试访问 `this.[[MapData]]` 内部插槽时，它会成功。

```smart header="`Array` 没有内部插槽"
一个明显的例外：内置 `Array` 不使用内部插槽。那是出于历史原因，因为它出现于很久以前。

因此，代理数组时没有这种问题。
```

### 私有字段

类的私有字段也会发生类似的情况。

例如，`getName()` 方法访问私有的 `#name` 属性并在代理后中断：

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {});

*!*
alert(user.getName()); // Error
*/!*
```

原因是专用字段是使用内部插槽实现的。JavaScript 访问它们时不使用 `[[Get]]/[[Set]]`。

在调用 `getName()` 时 `this` 的值是代理后的 `user`，它没有带私有字段的插槽。

再次，bind 方法的解决方案使它恢复正常：

```js run
class User {
  #name = "Guest";

  getName() {
    return this.#name;
  }
}

let user = new User();

user = new Proxy(user, {
  get(target, prop, receiver) {
    let value = Reflect.get(...arguments);
    return typeof value == 'function' ? value.bind(target) : value;
  }
});

alert(user.getName()); // Guest
```

该解决方案有缺点，如前所述：将原始对象暴露给该方法，可能使其进一步传递并破坏其他代理功能。

### Proxy != target

代理和原始对象是不同的对象。很自然吧？

因此，如果我们使用原始对象作为键，然后对其进行代理，则找不到代理：

```js run
let allUsers = new Set();

class User {
  constructor(name) {
    this.name = name;
    allUsers.add(this);
  }
}

let user = new User("John");

alert(allUsers.has(user)); // true

user = new Proxy(user, {});

*!*
alert(allUsers.has(user)); // false
*/!*
```

如我们所见，代理后，我们在 `allUsers` 中找不到 `user`，因为代理是一个不同的对象。

```warn header="Proxy 无法拦截严格相等性测试 `===`"
Proxy 可以拦截许多运算符，例如new（使用 `construct`），in（使用 `has`），delete（使用 `deleteProperty`）等。

但是没有办法拦截对象的严格相等性测试。一个对象严格只等于自身，没有其他值。

因此，比较对象是否相等的所有操作和内置类都会区分 target 和 proxy。这里没有透明的替代品。
```

## 可取消的 Proxy

一个 *可撤销* 的代理是可以被禁用的代理。

假设我们有一个资源，并且想随时关闭对该资源的访问。

我们可以做的是将其包装成可撤销的代理，而没有任何陷阱。这样的代理会将操作转发给对象，我们可以随时将其禁用。

语法为：

```js
let {proxy, revoke} = Proxy.revocable(target, handler)
```

该调用返回一个带有 `proxy` 和 `revoke` 函数的对象以将其禁用。

这是一个例子：

```js run
let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// proxy 正常工作
alert(proxy.data); // Valuable data

// 之后某处调用
revoke();

// proxy 不再工作（已吊销）
alert(proxy.data); // Error
```

调用 `revoke()` 会从代理中删除对目标对象的所有内部引用，因此不再连接它们。之后可以对目标对象进行垃圾回收。

我们还可以将 `revoke` 存储在 `WeakMap` 中，以便能够通过代理对象轻松找到它：

```js run
*!*
let revokes = new WeakMap();
*/!*

let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ..later in our code..
revoke = revokes.get(proxy);
revoke();

alert(proxy.data); // Error（已吊销）
```

这种方法的好处是我们不必随身携带revoke。我们可以在需要时从 map `proxy` 上获取它。

此处我们使用`WeakMap` 而不是 `Map` ，因为它不会阻止垃圾收集。如果代理对象变得“无法访问”（例如，没有变量再引用它），则 `WeakMap` 允许将其与 它的 `revoke` 对象一起从内存中擦除，因为我们不再需要它了。

## 参考文献

- 规范: [Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots).
- MDN: [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

## 总结

`Proxy` 是对象的包装，将代理上的操作转发到对象，并可以选择捕获其中的一些操作。

它可以包装任何类型的对象，包括类和函数。

语法为：

```js
let proxy = new Proxy(target, {
  /* traps */
});
```

……然后，我们应该在所有地方使用 `proxy` 而不是 `target`。代理没有自己的属性或方法。如果提供了陷阱，它将捕获操作，否则将其转发给 `target` 对象。

我们可以捕获：
- 读取（`get`），写入（`set`），删除（`deleteProperty`）属性（甚至是不存在的属性）。
- 函数调用（`apply` 陷阱）。
- `new` 操作（`construct` 陷阱）。
- 许多其他操作（完整列表在本文开头和 [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 中）。

这使我们能够创建“虚拟”属性和方法，实现默认值，可观察对象，函数装饰器等等。

我们还可以将对象多次包装在不同的代理中，并用多个函数进行装饰。

该[Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) API旨在补充 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)。对于任何 `Proxy` 陷阱，都有一个带有相同参数的 `Reflect` 调用。我们应该使用它们将调用转发给目标对象。

Proxy 有一些局限：

- 内置对象具有“内部插槽”，对这些对象的访问无法被代理。请参阅上面的解决方法。
- 私有类字段也是如此，因为它们是在内部使用插槽实现的。因此，代理方法的调用必须具有目标对象 `this` 才能访问它们。
- 对象相等性测试 `===` 不能被拦截。
- 性能：基准测试取决于引擎，但通常使用最简单的代理访问属性所需的时间要长几倍。实际上，这仅对某些“瓶颈”对象重要。
