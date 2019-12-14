# Proxy 和 Reflect

一个 `Proxy` 对象包装另一个对象并拦截诸如读取/写入属性和其他操作，可以选择自行处理它们，或者透明地允许该对象处理它们。

Proxy 用于许多库和某些浏览器框架。在本章中，我们将看到许多实际应用。

语法：

```js
let proxy = new Proxy(target, handler)
```

- `target` -- 是要包装的对象，可以是任何东西，包括函数。
- `handler` -- 代理配置：带有“陷阱”（'traps'，即拦截操作的方法）的对象。比如 `get`陷阱用于读取 `target` 属性，`set`陷阱写入`target` 属性等等。

对 `proxy` 进行操作，如果在 `handler` 中存在相应的陷阱，则它将运行，并且 Proxy 有机会对其进行处理，否则将直接对 target 进行处理。

首先，让我们创建一个没有任何陷阱的代理：

```js run
let target = {};
let proxy = new Proxy(target, {}); // empty handler

proxy.test = 5; // writing to proxy (1)
alert(target.test); // 5, the property appeared in target!

alert(proxy.test); // 5, we can read it from proxy too (2)

for(let key in proxy) alert(key); // test, iteration works (3)
```

由于没有陷阱，所有对 `proxy` 的操作都直接转发给 `target`。

1. 写入操作 `proxy.test=` 会将值写入 `target`。
2. 读取操作 `proxy.test` 会从 `target` 返回对应的值。
3. 迭代 `proxy` 会从 `target` 返回对应的值。

我们可以看到，没有任何陷阱，`proxy` 是一个 `target` 的透明包装.

![](proxy.svg)  

`Proxy` 是一种特殊的 "exotic object"。它没有自己的属性。如果 `handler` 为空，则透明地将操作转发给 `target`。

要激活更多功能，让我们添加陷阱。

我们可以用它们拦截什么？

对于对象的大多数操作，JavaScript 规范中都有一个所谓的“内部方法”，它描述了最低级别的工作方式。 例如 `[[Get]]`，用于读取属性的内部方法， `[[Set]]`，用于写入属性的内部方法，等等。这些方法仅在规范中使用，我们不能直接按名称调用它们。

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

不变量确保语言功能的正确和一致的行为。完整的不变量列表在[规范](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots). 如果您不做奇怪的事情，就不会违反它们。
```

让我们看看实际示例中的工作原理。

## 带 "get" 陷阱的默认值

最常见的陷阱是用于读取/写入属性。

要拦截读取操作，`handler` 应该有 `get(target, property, receiver)` 方法。

读取属性时触发该方法，参数如下：

- `target` -- 是目标对象，该对象作为第一个参数传递给 `new Proxy`，
- `property` -- 目标属性名,
- `receiver` -- 如果目标属性是一个 getter 访问器属性，则 `receiver` 就是本次读取属性所在的 `this` 对象。通常，这就是 `proxy` 对象本身（或者，如果我们从代理继承，则是从该代理继承的对象）。现在我们不需要此参数，因此稍后将对其进行详细说明。

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
      return 0; // default value
    }
  }
});

*!*
alert( numbers[1] ); // 1
alert( numbers[123] ); // 0 (no such item)
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

现在，如果没有短语，从 `dictionary` 读取将返回 `undefined`。但实际上，返回一个未翻译短语通常比 `undefined` 要好。因此，让我们在这种情况下返回一个未翻译的词组，而不是 `undefined`。

为此，我们将包装 `dictionary` 进一个拦截读取操作的代理：

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
*!*
  get(target, phrase) { // intercept reading a property from dictionary
*/!*
    if (phrase in target) { // if we have it in the dictionary
      return target[phrase]; // return the translation
    } else {
      // otherwise, return the non-translated phrase
      return phrase;
    }
  }
});

// Look up arbitrary phrases in the dictionary!
// At worst, they're not translated.
alert( dictionary['Hello'] ); // Hola
*!*
alert( dictionary['Welcome to Proxy']); // Welcome to Proxy (no translation)
*/!*
```

````smart
请注意代理如何覆盖变量：

```js
dictionary = new Proxy(dictionary, ...);
```

代理应该在任何地方完全替换目标对象。目标对象被代理后，再也没有人可以引用它。否则很容易搞砸。
````

## 使用 "set" 陷阱进行验证

假设我们想要一个专门用于数字的数组。如果添加了其他类型的值，则应该抛出一个错误。

当写入属性时 `set` 陷阱触发。

`set(target, property, value, receiver)`:

- `target` -- 是目标对象，该对象作为第一个参数传递给 `new Proxy`，
- `property` -- 目标属性名称，
- `value` -- 目标属性要设置的值，
- `receiver` -- 与 `get` 陷阱类似，仅与 setter 访问器相关。

如果写入操作成功，`set` 陷阱应该返回 `true`，否则返回 `false`（触发 `TypeError`）。

让我们用它来验证新值：

```js run
let numbers = [];

numbers = new Proxy(numbers, { // (*)
*!*
  set(target, prop, val) { // to intercept property writing
*/!*
    if (typeof val == 'number') {
      target[prop] = val;
      return true;
    } else {
      return false;
    }
  }
});

numbers.push(1); // added successfully
numbers.push(2); // added successfully
alert("Length is: " + numbers.length); // 2

*!*
numbers.push("test"); // TypeError ('set' on proxy returned false)
*/!*

alert("This line is never reached (error in the line above)");
```

请注意：Array 的内建方法依然生效！ 值使用 `push` 方法添加入数组。添加值时，`length`属性会自动增加。我们的代理对象 Proxy 不会破坏任何东西。

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

// "ownKeys" filters out _password
for(let key in user) alert(key); // name, then: age

// same effect on these methods:
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

为什么？原因很简单：`Object.keys`仅返回带有 `enumerable` 标记的属性。为了检查它， 该方法会对每个属性调用 `[[GetOwnProperty]]` 来获得[属性描述符](info:property-descriptors)。在这里，由于没有属性，其描述符为空，没有 `enumerable` 标记，因此它将略过。

为了让 `Object.keys` 返回一个属性，我们要么需要将该属性及 `enumerable` 标记存入对象，或者我们可以拦截对它的调用 `[[GetOwnProperty]]` (陷阱 `getOwnPropertyDescriptor` 会执行此操作)，并返回描述符enumerable: true。

这是一个例子：

```js run
let user = { };

user = new Proxy(user, {
  ownKeys(target) { // called once to get a list of properties
    return ['a', 'b', 'c'];
  },

  getOwnPropertyDescriptor(target, prop) { // called for every property
    return {
      enumerable: true,
      configurable: true
      /* ...other flags, probable "value:..." */
    };
  }

});

alert( Object.keys(user) ); // a, b, c
```

让我们再次注意：如果该属性在对象中不存在，则我们只需要拦截 `[[GetOwnProperty]]`。

## 具有 "deleteProperty" 和其他陷阱的受保护属性

有一个普遍的约定，即下划线 `_` 前缀的属性和方法_是内部的。不应从对象外部访问它们。

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
  set(target, prop, val) { // to intercept property writing
*/!*
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      target[prop] = val;
      return true;
    }
  },
*!*
  deleteProperty(target, prop) { // to intercept property deletion
*/!*  
    if (prop.startsWith('_')) {
      throw new Error("Access denied");
    } else {
      delete target[prop];
      return true;
    }
  },
*!*
  ownKeys(target) { // to intercept property list
*/!*
    return Object.keys(target).filter(key => !key.startsWith('_'));
  }
});

// "get" doesn't allow to read _password
try {
  alert(user._password); // Error: Access denied
} catch(e) { alert(e.message); }

// "set" doesn't allow to write _password
try {
  user._password = "test"; // Error: Access denied
} catch(e) { alert(e.message); }

// "deleteProperty" doesn't allow to delete _password
try {
  delete user._password; // Error: Access denied
} catch(e) { alert(e.message); }

// "ownKeys" filters out _password
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
    // object method must be able to read _password
    return value === this._password;
  }
}
```


对 `user.checkPassword()` 的一个调用会调用代理对象 `user` 作为 `this`（点运算符之前的对象会成为 `this`），，因此，当它尝试访问 `this._password` 时 `get` 陷阱将激活（它在读取任何属性时触发）并抛出错误。

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

- `target` -- 是目标对象，作为第一个参数传递给 `new Proxy`
- `property` -- 属性名称

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

`apply(target, thisArg, args)` 陷阱处理代理作为函数被调用：

- `target` 是目标对象（函数是 JavaScript 中的对象）
- `thisArg` 是 `this` 的值
- `args` 是参数列表

例如，让我们回想一下 `delay(f, ms)` 装饰器，它是我们在 <info:call-apply-decorators> 一章中完成的。

在该章中，我们没有用 proxy 来实现它。调用 `delay(f, ms)` 返回一个函数，该函数会将在 `ms` 毫秒后把所有调用转发到 `f`。

这是以前的基于函数的实现：

```js run
function delay(f, ms) {
  // return a wrapper that passes the call to f after the timeout
  return function() { // (*)
    setTimeout(() => f.apply(this, arguments), ms);
  };
}

function sayHi(user) {
  alert(`Hello, ${user}!`);
}

// after this wrapping, calls to sayHi will be delayed for 3 seconds
sayHi = delay(sayHi, 3000);

sayHi("John"); // Hello, John! (after 3 seconds)
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
alert(sayHi.length); // 1 (function length is the arguments count in its declaration)
*/!*

sayHi = delay(sayHi, 3000);

*!*
alert(sayHi.length); // 0 (in the wrapper declaration, there are zero arguments)
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
alert(sayHi.length); // 1 (*) proxy forwards "get length" operation to the target
*/!*

sayHi("John"); // Hello, John! (after 3 seconds)
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

**对于每个可被 `Proxy` trappable的内部方法，`Reflect`都有一个对应的方法Reflect，其名称和参数与 `Proxy` 陷阱相同。**

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

### Proxying a getter

Let's see an example that demonstrates why `Reflect.get` is better. And we'll also see why `get/set` have the fourth argument `receiver`, that we didn't use before.

We have an object `user` with `_name` property and a getter for it.

Here's a proxy around it:

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

The `get` trap is "transparent" here, it returns the original property, and doesn't do anything else. That's enough for our example.

Everything seems to be all right. But let's make the example a little bit more complex.

After inheriting another object `admin` from `user`, we can observe the incorrect behavior:

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
alert(admin.name); // outputs: Guest (?!?)
*/!*
```

Reading `admin.name` should return `"Admin"`, not `"Guest"`!

What's the matter? Maybe we did something wrong with the inheritance?

But if we remove the proxy, then everything will work as expected.

The problem is actually in the proxy, in the line `(*)`.

1. When we read `admin.name`, as `admin` object doesn't have such own property, the search goes to its prototype.
2. The prototype is `userProxy`.
3. When reading `name` property from the proxy, its `get` trap triggers and returns it from the original object as `target[prop]` in the line `(*)`.

    A call to `target[prop]`, when `prop` is a getter, runs its code in the context `this=target`. So the result is `this._name` from the original object `target`, that is: from `user`.

To fix such situations, we need `receiver`, the third argument of `get` trap. It keeps the correct `this` to be passed to a getter. In our case that's `admin`.

How to pass the context for a getter? For a regular function we could use `call/apply`, but that's a getter, it's not "called", just accessed.

`Reflect.get` can do that. Everything will work right if we use it.

Here's the corrected variant:

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

Now `receiver` that keeps a reference to the correct `this` (that is `admin`), is passed to the getter using `Reflect.get` in the line `(*)`.

We can rewrite the trap even shorter:

```js
get(target, prop, receiver) {
  return Reflect.get(*!*...arguments*/!*);
}
```


`Reflect` calls are named exactly the same way as traps and accept the same arguments. They were specifically designed this way.

So, `return Reflect...` provides a safe no-brainer to forward the operation and make sure we don't forget anything related to that.

## Proxy limitations

Proxies provide a unique way to alter or tweak the behavior of the existing objects at the lowest level. Still, it's not perfect. There are limitations.

### Built-in objects: Internal slots

Many built-in objects, for example `Map`, `Set`, `Date`, `Promise` and others make use of so-called "internal slots".

These are like properties, but reserved for internal, specification-only purposes. For instance, `Map` stores items in the internal slot `[[MapData]]`. Built-in methods access them directly, not via `[[Get]]/[[Set]]` internal methods. So `Proxy` can't intercept that.

Why care? They're internal anyway!

Well, here's the issue. After a built-in object like that gets proxied, the proxy doesn't have these internal slots, so built-in methods will fail.

For example:

```js run
let map = new Map();

let proxy = new Proxy(map, {});

*!*
proxy.set('test', 1); // Error
*/!*
```

Internally, a `Map` stores all data in its `[[MapData]]` internal slot. The proxy doesn't have such a slot. The [built-in method `Map.prototype.set`](https://tc39.es/ecma262/#sec-map.prototype.set) method tries to access the internal property `this.[[MapData]]`, but because `this=proxy`, can't find it in `proxy` and just fails.

Fortunately, there's a way to fix it:

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

Now it works fine, because `get` trap binds function properties, such as `map.set`, to the target object (`map`) itself.

Unlike the previous example, the value of `this` inside `proxy.set(...)` will be not `proxy`, but the original `map`. So when the internal implementation of `set` tries to access `this.[[MapData]]` internal slot, it succeeds.

```smart header="`Array` has no internal slots"
A notable exception: built-in `Array` doesn't use internal slots. That's for historical reasons, as it appeared so long ago.

So there's no such problem when proxying an array.
```

### Private fields

The similar thing happens with private class fields.

For example, `getName()` method accesses the private `#name` property and breaks after proxying:

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

The reason is that private fields are implemented using internal slots. JavaScript does not use `[[Get]]/[[Set]]` when accessing them.

In the call `getName()` the value of `this` is the proxied `user`, and it doesn't have the slot with private fields.

Once again, the solution with binding the method makes it work:

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

That said, the solution has drawbacks, as explained previously: it exposes the original object to the method, potentially allowing it to be passed further and breaking other proxied functionality.

### Proxy != target

The proxy and the original object are different objects. That's natural, right?

So if we use the original object as a key, and then proxy it, then the proxy can't be found:

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

As we can see, after proxying we can't find `user` in the set `allUsers`, because the proxy is a different object.

```warn header="Proxies can't intercept a strict equality test `===`"
Proxies can intercept many operators, such as `new` (with `construct`), `in` (with `has`), `delete` (with `deleteProperty`) and so on.

But there's no way to intercept a strict equality test for objects. An object is strictly equal to itself only, and no other value.

So all operations and built-in classes that compare objects for equality will differentiate between the object and the proxy. No transparent replacement here.
```

## Revocable proxies

A *revocable* proxy is a proxy that can be disabled.

Let's say we have a resource, and would like to close access to it any moment.

What we can do is to wrap it into a revocable proxy, without any traps. Such a proxy will forward operations to object, and we can disable it at any moment.

The syntax is:

```js
let {proxy, revoke} = Proxy.revocable(target, handler)
```

The call returns an object with the `proxy` and `revoke` function to disable it.

Here's an example:

```js run
let object = {
  data: "Valuable data"
};

let {proxy, revoke} = Proxy.revocable(object, {});

// pass the proxy somewhere instead of object...
alert(proxy.data); // Valuable data

// later in our code
revoke();

// the proxy isn't working any more (revoked)
alert(proxy.data); // Error
```

A call to `revoke()` removes all internal references to the target object from the proxy, so they are no more connected. The target object can be garbage-collected after that.

We can also store `revoke` in a `WeakMap`, to be able to easily find it by a proxy object:

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

alert(proxy.data); // Error (revoked)
```

The benefit of such an approach is that we don't have to carry `revoke` around. We can get it from the map by `proxy` when needed.

We use `WeakMap` instead of `Map` here because it won't block garbage collection. If a proxy object becomes "unreachable" (e.g. no variable references it any more), `WeakMap` allows it to be wiped from memory together with its `revoke` that we won't need any more.

## References

- Specification: [Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots).
- MDN: [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

## Summary

`Proxy` is a wrapper around an object, that forwards operations on it to the object, optionally trapping some of them.

It can wrap any kind of object, including classes and functions.

The syntax is:

```js
let proxy = new Proxy(target, {
  /* traps */
});
```

...Then we should use `proxy` everywhere instead of `target`. A proxy doesn't have its own properties or methods. It traps an operation if the trap is provided, otherwise forwards it to `target` object.

We can trap:
- Reading (`get`), writing (`set`), deleting (`deleteProperty`) a property (even a non-existing one).
- Calling a function (`apply` trap).
- The `new` operator (`construct` trap).
- Many other operations (the full list is at the beginning of the article and in the [docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)).

That allows us to create "virtual" properties and methods, implement default values, observable objects, function decorators and so much more.

We can also wrap an object multiple times in different proxies, decorating it with various aspects of functionality.

The [Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) API is designed to complement [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy). For any `Proxy` trap, there's a `Reflect` call with same arguments. We should use those to forward calls to target objects.

Proxies have some limitations:

- Built-in objects have "internal slots", access to those can't be proxied. See the workaround above.
- The same holds true for private class fields, as they are internally implemented using slots. So proxied method calls must have the target object as `this` to access them.
- Object equality tests `===` can't be intercepted.
- Performance: benchmarks depend on an engine, but generally accessing a property using a simplest proxy takes a few times longer. In practice that only matters for some "bottleneck" objects though.
