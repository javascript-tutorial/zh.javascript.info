
let eventMixin = {
  /**
   * 订阅事件，用法：
   *  menu.on('select', function(item) { ... }
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * 取消订阅，用法：
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * 生成具有给定名称和数据的事件
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // 该事件名称没有对应的事件处理程序（handler）
    }

    // 调用事件处理程序（handler）
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};




// 创建一个 class
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// 添加带有事件相关方法的 mixin
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// 添加一个事件处理程序（handler），在被选择时被调用：
menu.on("select", value => console.log(`Value selected: ${value}`));

// 触发事件 => 运行上述的事件处理程序（handler）并显示：
// 被选中的值：123
menu.choose("123");
