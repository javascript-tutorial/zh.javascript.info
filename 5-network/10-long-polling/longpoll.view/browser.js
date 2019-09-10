// 发送消息，一个简单的 POST 请求
function PublishForm(form, url) {

  function sendMessage(message) {
    fetch(url, {
      method: 'POST',
      body: message
    });
  }

  form.onsubmit = function() {
    let message = form.message.value;
    if (message) {
      form.message.value = '';
      sendMessage(message);
    }
    return false;
  };
}

// 通过长轮询（long polling）接收消息
function SubscribePane(elem, url) {

  function showMessage(message) {
    let messageElem = document.createElement('div');
    messageElem.append(message);
    elem.append(messageElem);
  }

  async function subscribe() {
    let response = await fetch(url);

    if (response.status == 502) {
      // 连接超时
      // 当连接等待时间过长时发生
      // 重新连接
      await subscribe();
    } else if (response.status != 200) {
      // 显示错误
      showMessage(response.statusText);
      // 1 秒后重新连接
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe();
    } else {
      // 得到消息
      let message = await response.text();
      showMessage(message);
      await subscribe();
    }
  }

  subscribe();

}
