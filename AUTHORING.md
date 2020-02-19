
# 贡献者须知

这描述了有关编写本教程的新文章的重要内容。

## 内联链接

所有教程链接应从根开始，不包括域。

✅ OK:

```md
我们将在 [关于函数](/function-basics) 章节学习它。
```

❌ Not ok:

```md
我们将在 [关于函数](https://javascript.info/function-basics) 章节学习它。
```

另外，要参考一章，有一个特殊的 "info:" 方式，如下所示：

```md
我们将在 <info:function-basics> 章节学习它。
```

会自动编译成：

```html
我们将在 <a href="/function-basics">函数基础知识</a> 章节学习它。
```

标题是从引用的文章中自动插入的。这样做的好处是，如果文章被重命名，对应的引用也会同时得到更新。

## TODO

更多细节，请咨询 @leviding 或 @iliakan。
