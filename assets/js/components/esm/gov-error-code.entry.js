import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { g as govHost } from './template-df429738.js';

const ErrorCodeClass = {
  root: 'gov-error-code',
  icon: 'gov-error-code__icon',
  holder: 'gov-error-code__holder',
  content: 'gov-error-code__content',
};

const govErrorCodeCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-error-code{position:relative;display:block;width:100%}.gov-error-code__holder{margin:0 auto;text-align:center}.gov-error-code__content>*:last-child{margin-bottom:0}.gov-error-code__icon{display:flex;justify-content:center;align-items:center;width:9.375rem;height:9.375rem;margin:0 auto 1.5rem;border-radius:50%;background:var(--gov-error-icon-circle-bg, linear-gradient(to bottom, var(--gov-color-primary-200), var(--gov-color-neutral-white)));color:var(--gov-error-icon-color, var(--gov-color-primary))}.gov-error-code__icon>*{width:6.5625rem;height:6.5625rem}@media (min-width: 48em){.gov-error-code__icon{width:12.5rem;height:12.5rem;margin:0 auto 2rem}.gov-error-code__icon>*{width:8.75rem;height:8.75rem}}";

const GovErrorCode = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.h = govHost(this.host);
  }
  render() {
    return (h(Host, { class: this.h.classes(ErrorCodeClass.root) }, h("div", { class: ErrorCodeClass.holder }, this.h.hasSlot('icon') && (h("div", { class: ErrorCodeClass.icon }, h("slot", { name: "icon" }))), h("div", { class: ErrorCodeClass.content }, h("slot", null)))));
  }
  get host() { return getElement(this); }
};
GovErrorCode.style = govErrorCodeCss;

export { GovErrorCode as gov_error_code };

//# sourceMappingURL=gov-error-code.entry.js.map