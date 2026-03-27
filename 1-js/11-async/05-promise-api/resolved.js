
let cache = new Map();

function loadCached(url) {
    console.log('cached', cache.size);

  if (cache.has(url)) {
    console.log("using cache for ", url);
    return Promise.resolve(cache.get(url)); // (*)
  }

  console.log("fetch ", url);
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      cache.set(url,text);
      return text;
    });
}

loadCached("https://baidu.com")
.then( ()=> loadCached("https://ir.baidu.com"))
.then( ()=> loadCached("https://baidu.com"))
.then( ()=> {console.log("done");} );


/*
 must write:
 .then( ()=> loadCached("https://ir.baidu.com"))
 instead of 
 .then(loadCached("https://ir.baidu.com"))
*/
