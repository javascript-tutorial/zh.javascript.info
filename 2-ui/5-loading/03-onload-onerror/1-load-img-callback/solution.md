
算法：
1. 为每个资源制作 `img`。
2. 为每个 image 添加 `onload/onerror`。
3. 在 `onload` 或 `onerror` 被触发时计数器加 1。
4. 当计数器值等于资源值时 —— 结束：`callback()`。
