
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static createTodays() {
    // 记住 this = Article
    return new this("Today's digest", new Date());
  }
}

let article = Article.createTodays();

// console.log( article.title ); // Today's digest
console.log( article);

// article.createTodays();
// TypeError: article.createTodays is not a function
