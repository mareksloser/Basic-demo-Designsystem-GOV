import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { L as LayoutClass } from './constants-3786b01b.js';
import { g as govHost } from './template-df429738.js';

const govLayoutCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-layout{position:relative;display:block;width:100%}.gov-layout__section{display:flex;gap:var(--gov-layout-gap, 1.375rem);flex-direction:column}@media (min-width: 64em){.gov-layout__section{flex-direction:row}.gov-layout__section-aside-right .gov-layout-column:first-child,.gov-layout__section-aside .gov-layout-column:first-child{flex:1 1 auto;width:auto}.gov-layout__section-aside-right .gov-layout-column:last-child,.gov-layout__section-aside .gov-layout-column:last-child{flex:0 0 auto;width:calc(var(--gov-container-width, 73.75rem) / 3 - var(--gov-layout-gap, 1.375rem))}.gov-layout__section-aside-left .gov-layout-column:first-child{flex:0 0 auto;width:calc(var(--gov-container-width, 73.75rem) / 3 - var(--gov-layout-gap, 1.375rem))}.gov-layout__section-aside-left .gov-layout-column:last-child{flex:1 1 auto;width:auto}.gov-layout__section-aside-right-inverse .gov-layout-column:first-child{order:1}.gov-layout__section-aside-left-inverse .gov-layout-column:first-child{order:2}.gov-layout__section-text{width:var(--gov-layout-content-width, 48.75rem);margin-right:auto;margin-left:auto}.gov-layout__section-text-left{width:var(--gov-layout-content-width, 48.75rem);margin-right:auto}.gov-layout__section-text-right{width:var(--gov-layout-content-width, 48.75rem);margin-left:auto}}";

const GovLayout = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.type = 'stretch';
    this.variant = undefined;
    this.inverse = false;
    this.h = govHost(this.host);
  }
  typeClass(originalClass, type, variant, inverse) {
    const isType = type ? '-' + type : '';
    const isVariant = variant ? '-' + variant : '';
    const isInverse = inverse ? '-inverse' : '';
    return originalClass + ' ' + originalClass + isType + isVariant + isInverse;
  }
  render() {
    return (h(Host, { type: this.type, class: this.h.classes(LayoutClass.root) }, h("section", { class: this.typeClass(LayoutClass.section, this.type, this.variant, this.inverse) }, h("slot", null))));
  }
  get host() { return getElement(this); }
};
GovLayout.style = govLayoutCss;

export { GovLayout as gov_layout };

//# sourceMappingURL=gov-layout.entry.js.map