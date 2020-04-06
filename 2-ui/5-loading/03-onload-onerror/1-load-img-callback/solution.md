
算法：
1. 为每个资源创建 `img`。
2. 为每个图片添加 `onload/onerror`。
3. 在 `onload` 或 `onerror` 被触发时，增加计数器。
4. 当计数器值等于资源值时 —— 我们完成了：`callback()`。
