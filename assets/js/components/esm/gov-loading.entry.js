import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { g as govHost, p as prepareClasses } from './template-df429738.js';

const LoadingClass = {
  root: 'gov-loading',
  content: 'gov-loading__content',
  icon: 'gov-loading__icon',
};

const govLoadingCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-loading{display:block}.gov-loading__content{z-index:101;position:fixed;top:50%;left:50%;display:flex;gap:1rem;flex-direction:column;align-items:center;min-width:9.6875rem;padding:1.5rem;border-radius:0.5rem;background:var(--gov-loading-bg, rgba(var(--gov-color-secondary-400-rgb), 0.8));color:var(--gov-loading-color, var(--gov-color-primary));text-align:center;transform:translate(-50%, -50%)}.gov-loading__icon{width:4rem;height:4rem;line-height:1}.gov-loading__icon svg{width:100%;height:100%}";

const GovLoading = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.h = govHost(this.host);
  }
  render() {
    return (h(Host, { class: this.h.classes(LoadingClass.root) }, h("div", { class: LoadingClass.content }, h("gov-icon", { class: prepareClasses([LoadingClass.icon, "gov-spin-animation"]), name: "loader" }), h("slot", null)), h("gov-backdrop", { inverse: true })));
  }
  get host() { return getElement(this); }
};
GovLoading.style = govLoadingCss;

export { GovLoading as gov_loading };

//# sourceMappingURL=gov-loading.entry.js.map