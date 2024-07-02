'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const template = require('./template-4b951d1d.js');

const EmptyClass = {
  root: 'gov-empty',
  icon: 'gov-empty__icon',
  container: 'gov-empty__container',
  content: 'gov-empty__content',
};

const govEmptyCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-empty{position:relative;display:block;width:100%}.gov-empty__icon{display:inline-flex;justify-content:center;align-items:center;width:6rem;height:6rem;margin-bottom:2rem;border-radius:50%;background:var(--gov-empty-icon-circle-bg, linear-gradient(to bottom, var(--gov-color-primary-200), var(--gov-color-neutral-white)));color:var(--gov-empty-icon-color, var(--gov-color-primary))}.gov-empty__icon>*{width:3.5rem;height:3.5rem}.gov-empty__content>*:last-child{margin-bottom:0}";

const GovEmpty = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.h = template.govHost(this.host);
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(EmptyClass.root) }, this.h.hasSlot('icon') && (index.h("div", { class: EmptyClass.icon }, index.h("slot", { name: "icon" }))), index.h("div", { class: EmptyClass.content }, index.h("slot", null))));
  }
  get host() { return index.getElement(this); }
};
GovEmpty.style = govEmptyCss;

exports.gov_empty = GovEmpty;

//# sourceMappingURL=gov-empty.cjs.entry.js.map