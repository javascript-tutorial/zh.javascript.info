
```html run height=100
<!DOCTYPE html>
<html>
<body>

  <div data-widget-name="menu">Choose the genre</div>

  <script>
    // 获取它
    let elem = document.querySelector('[data-widget-name]');

    // 读取值
    alert(elem.dataset.widgetName);
    // 或
    alert(elem.getAttribute('data-widget-name'));
  </script>
</body>
</html>
```
