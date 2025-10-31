
async function* fetchCommits(repo) {
    let url = `https://api.github.com/repos/${repo}/commits`;
  
    while (url) {
      const response = await fetch(url, { // (1)
        headers: {'User-Agent': 'Our script'}, // github 需要任意的 user-agent header
      });
  
      const body = await response.json(); // (2) 响应的是 JSON（array of commits）
  
      // (3) 前往下一页的 URL 在 header 中，提取它
      let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
      nextPage = nextPage?.[1];
  
      url = nextPage;
  
      for(let commit of body) { // (4) 一个接一个地 yield commit，直到最后一页
        yield commit;
      }
    }
  }

(async () => {

    let count = 0;
  
    for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
  
      console.log(commit.author.login);
  
      if (++count == 10) { // 让我们在获取了 x 个 commit 时停止
        break;
      }
    }
  
  })();
  
  // 注意：如果你在外部沙箱中运行它，你需要把上面的 fetchCommits 函数粘贴到这儿。