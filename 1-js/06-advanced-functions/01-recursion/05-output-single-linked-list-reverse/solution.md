# 使用递归

递归逻辑稍微有点儿棘手。

我们需要先输出列表的其它元素，**然后**输出当前的元素：

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

循环解法也比直接输出稍微复杂点儿。

没有方法来获取 `list` 中的最后一个值，我们也不能「回去」。

<<<<<<< HEAD
所以我们能做的就是先直接按顺序遍历每个元素，并把它们存到一个数组里，然后反向输出存储的数组：
=======
So what we can do is to first go through the items in the direct order and remember them in an array, and then output what we remembered in the reverse order:
>>>>>>> 5e9eca374f644ea85c7d548bbe344fd30e5fb89d

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

请注意，递归解法实际上也是这样做的：它顺着链表，记录每一个嵌套调用里链表上的元素（在执行上下文堆栈里），然后输出它们。
