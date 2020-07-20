describe("test", function() {
  
<<<<<<< HEAD
  // Mocha 通常会等待测试用例运行 2 秒，之后才去判决它们出错了
  
  this.timeout(200000); // 这里设置此时长为 200,000 毫秒

  // 这是因为 "alert" 函数，如果你延后一段时间按 "OK" 按钮，测试就不会通过！
=======
   // Mocha usually waits for the tests for 2 seconds before considering them wrong
  
  this.timeout(200000); // With this code we increase this - in this case to 200,000 milliseconds

  // This is because of the "alert" function, because if you delay pressing the "OK" button the tests will not pass!
>>>>>>> ae1171069c2e50b932d030264545e126138d5bdc
  
  before(() => alert("Testing started – before all tests"));
  after(() => alert("Testing finished – after all tests"));

  beforeEach(() => alert("Before a test – enter a test"));
  afterEach(() => alert("After a test – exit a test"));

  it('test 1', () => alert(1));
  it('test 2', () => alert(2));

});
