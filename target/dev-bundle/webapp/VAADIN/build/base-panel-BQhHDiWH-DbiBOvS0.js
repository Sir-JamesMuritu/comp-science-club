import { C as Cs, $ } from "./indexhtml-BRa8D7LS.js";
class o extends Cs {
  constructor() {
    super(...arguments), this.eventBusRemovers = [], this.messageHandlers = {};
  }
  createRenderRoot() {
    return this;
  }
  onEventBus(e, s) {
    this.eventBusRemovers.push($.on(e, s));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.eventBusRemovers.forEach((e) => e());
  }
  onCommand(e, s) {
    this.messageHandlers[e] = s;
  }
  handleMessage(e) {
    return this.messageHandlers[e.command] ? (this.messageHandlers[e.command].call(this, e), true) : false;
  }
}
export {
  o
};
