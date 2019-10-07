
<<<<<<< HEAD
请注意：
1. 在元素被从文档移除的时候，我们会清除 `setInterval` 的 timer。这非常重要，否则即使我们不再需要它了，它仍然会继续计时。这样浏览器就不能清除这个元素占用和被这个元素引用的内存了。
2. 我们可以通过 `elem.date` 属性得到当前时间。类所有的方法和属性天生就是元素的方法和属性。
=======
Please note:
1. We clear `setInterval` timer when the element is removed from the document. That's important, otherwise it continues ticking even if not needed any more. And the browser can't clear the memory from this element and referenced by it.
2. We can access current date as `elem.date` property. All class methods and properties are naturally element methods and properties.
>>>>>>> 71ff8f81b05e2438a3c56507888e06c528a71182
