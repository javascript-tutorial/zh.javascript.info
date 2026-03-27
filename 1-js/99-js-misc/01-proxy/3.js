
let dictionary = {
    'Hello': 'Hola',
    'Bye': 'Adiós'
  };
  
  dictionary = new Proxy(dictionary, {
    get(target, phrase) { // 拦截读取属性操作
      if (phrase in target) { //如果词典中有该短语
        return target[phrase]; // 返回其翻译
      } else {
        // 否则返回未翻译的短语
        return phrase;
      }
    }
  });
  
  // 在词典中查找任意短语！
  // 最坏的情况也只是它们没有被翻译。
  console.log( dictionary['Hello'] ); // Hola
  console.log( dictionary['Welcome to Proxy']); // Welcome to Proxy（没有被翻译）
