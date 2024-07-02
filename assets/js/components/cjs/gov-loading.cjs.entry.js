'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const template = require('./template-4b951d1d.js');

const LoadingClass = {
  root: 'gov-loading',
  content: 'gov-loading__content',
  icon: 'gov-loading__icon',
};

const govLoadingCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-loading{display:block}.gov-loading__content{z-index:101;position:fixed;top:50%;left:50%;display:flex;gap:1rem;flex-direction:column;align-items:center;min-width:9.6875rem;padding:1.5rem;border-radius:0.5rem;background:var(--gov-loading-bg, rgba(var(--gov-color-secondary-400-rgb), 0.8));color:var(--gov-loading-color, var(--gov-color-primary));text-align:center;transform:translate(-50%, -50%)}.gov-loading__icon{width:4rem;height:4rem;line-height:1}.gov-loading__icon svg{width:100%;height:100%}";

const GovLoading = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.h = template.govHost(this.host);
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(LoadingClass.root) }, index.h("div", { class: LoadingClass.content }, index.h("gov-icon", { class: template.prepareClasses([LoadingClass.icon, "gov-spin-animation"]), name: "loader" }), index.h("slot", null)), index.h("gov-backdrop", { inverse: true })));
  }
  get host() { return index.getElement(this); }
};
GovLoading.style = govLoadingCss;

exports.gov_loading = GovLoading;

//# sourceMappingURL=gov-loading.cjs.entry.js.map