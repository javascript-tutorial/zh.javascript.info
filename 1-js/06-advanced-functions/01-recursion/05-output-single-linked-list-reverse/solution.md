# 使用递归

递归逻辑在这稍微有点儿棘手。

我们需要先输出列表的其它元素，**然后** 输出当前的元素：

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

function printReverseList(list) {

  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}

printReverseList(list);
```

# 使用循环

循环解法也比直接输出稍微复杂了点儿。

在这而没有什么方法可以获取 `list` 中的最后一个值。我们也不能“从后向前”读取。

因此，我们可以做的就是直接按顺序遍历每个元素，并把它们存到一个数组中，然后反向输出我们存储在数组中的元素：

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

function printReverseList(list) {
  let arr = [];
  let tmp = list;

  while (tmp) {
    arr.push(tmp.value);
    tmp = tmp.next;
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    alert( arr[i] );
  }
}

printReverseList(list);
```

请注意，递归解法实际上也是这样做的：它顺着链表，记录每一个嵌套调用里链表的元素（在执行上下文堆栈里），然后输出它们。
