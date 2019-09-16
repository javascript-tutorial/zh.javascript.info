class LiveTimer extends HTMLElement {

  render() {
    this.innerHTML = `
    <time-formatted hour="numeric" minute="numeric" second="numeric">
    </time-formatted>
    `;

    this.timerElem = this.firstElementChild;
  }

  connectedCallback() { // (2)
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
    this.timer = setInterval(() => this.update(), 1000);
  }

  update() {
    this.date = new Date();
    this.timerElem.setAttribute('datetime', this.date);
    this.dispatchEvent(new CustomEvent('tick', { detail: this.date }));
  }

  disconnectedCallback() {
<<<<<<< HEAD
    clearInterval(this.timer); // 让这个元素被垃圾回收是非常重要的
=======
    clearInterval(this.timer); // important to let the element be garbage-collected
>>>>>>> 646989dd470395510e1006c220e05e85a06eb78a
  }

}

customElements.define("live-timer", LiveTimer);
