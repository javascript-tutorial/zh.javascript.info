# 循环解法

基于循环的解法：

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {
  let tmp = list;

  while (tmp) {
    alert(tmp.value);
    tmp = tmp.next;
  }

}

printList(list);
```

请注意，我们使用了一个临时变量 `tmp` 来遍历链表。从技术上讲，我们可以使用函数的入参 `list` 来代替：

```js
function printList(list) {

  while(*!*list*/!*) {
    alert(list.value);
    list = list.next;
  }

}
```

……但是这不够明智。未来我们可能想要扩展这个函数，使用这个链表做其他的事儿，如果我们修改了 `list`，那么我们就失去了这个能力。

说到好的变量命名，`list` 在这里是链表本身。代表它的第一个元素。它应该保持原样，这是清晰可靠的。

从另一个方面来说，`tmp` 是充当了完全遍历链表的角色，就像 `for` 循环中的 `i` 一样。

# 递归解法

`printList(list)` 的递归实现遵循一个简单的逻辑：为了输出链表，我们应该输出 `list` 的当前的元素，`list.next` 同理：

```js run
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printList(list) {

  alert(list.value); // 输出当前元素

  if (list.next) {
    printList(list.next); // 链表中其余部分同理
  }

}

printList(list);
```

哪个更好呢？

从技术上讲，循环更有效。这两种解法的做了同样的事儿，但循环不会为嵌套函数调用消耗资源。

另一方面，递归解法更简洁，有时更容易理解。
