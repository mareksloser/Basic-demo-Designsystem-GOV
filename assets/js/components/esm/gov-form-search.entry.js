import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { V as Variants } from './variants-2b936d58.js';
import { p as pick } from './utils-c057a3fa.js';

pick(Variants, ['PRIMARY', 'SECONDARY']);
const FormSearchClass = {
  root: 'gov-form-search',
  input: 'gov-form-search__input',
  button: 'gov-form-search__button',
};

const govFormSearchCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-search{position:relative;display:flex;width:100%;gap:0.5rem;align-items:center;border-radius:var(--gov-border-radius, 0.1875rem);background-color:var(--gov-form-bg-color, var(--gov-color-neutral-white))}.gov-form-search:focus{outline:none}.gov-form-search:focus-visible{border-radius:var(--gov-border-radius, 0.1875rem);outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base);outline-offset:0}.gov-form-search:focus-within{border-radius:var(--gov-border-radius, 0.1875rem);outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base);outline-offset:0}.gov-form-search__input{flex:1 1 auto}.gov-form-search__input input{height:auto;border-width:0 !important}.gov-form-search__input input:focus-visible{outline:none !important}.gov-form-search__button{flex:0 0 auto;margin:0.1875rem 0.1875rem 0.1875rem 0}.gov-form-search[variant=primary]{border:var(--gov-form-input-border-primary, 0.0625rem solid var(--gov-color-primary-600))}.gov-form-search[variant=secondary]{border:var(--gov-form-input-border-secondary, 0.0625rem solid var(--gov-color-secondary-700))}";

const GovFormSearch = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.variant = 'secondary';
  }
  render() {
    return (h(Host, { class: FormSearchClass.root }, h("span", { class: FormSearchClass.input }, h("slot", { name: "input" })), h("span", { class: FormSearchClass.button }, h("slot", { name: "button" }))));
  }
  get host() { return getElement(this); }
};
GovFormSearch.style = govFormSearchCss;

export { GovFormSearch as gov_form_search };

//# sourceMappingURL=gov-form-search.entry.js.map