
let object = {
    data: "Valuable data"
  };
  
  let {proxy, revoke} = Proxy.revocable(object, {});
  
  // 将 proxy 传递到其他某处，而不是对象...
  console.log(proxy.data); // Valuable data

  console.log("orig ", object);
  
  // 稍后，在我们的代码中
  revoke();
  
  // proxy 不再工作（revoked）
  console.log(proxy.data); // Error
// TypeError: Cannot perform 'get' on a proxy that has been revoked
