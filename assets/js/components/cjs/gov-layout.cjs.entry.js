'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const constants = require('./constants-1490a5eb.js');
const template = require('./template-4b951d1d.js');

const govLayoutCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-layout{position:relative;display:block;width:100%}.gov-layout__section{display:flex;gap:var(--gov-layout-gap, 1.375rem);flex-direction:column}@media (min-width: 64em){.gov-layout__section{flex-direction:row}.gov-layout__section-aside-right .gov-layout-column:first-child,.gov-layout__section-aside .gov-layout-column:first-child{flex:1 1 auto;width:auto}.gov-layout__section-aside-right .gov-layout-column:last-child,.gov-layout__section-aside .gov-layout-column:last-child{flex:0 0 auto;width:calc(var(--gov-container-width, 73.75rem) / 3 - var(--gov-layout-gap, 1.375rem))}.gov-layout__section-aside-left .gov-layout-column:first-child{flex:0 0 auto;width:calc(var(--gov-container-width, 73.75rem) / 3 - var(--gov-layout-gap, 1.375rem))}.gov-layout__section-aside-left .gov-layout-column:last-child{flex:1 1 auto;width:auto}.gov-layout__section-aside-right-inverse .gov-layout-column:first-child{order:1}.gov-layout__section-aside-left-inverse .gov-layout-column:first-child{order:2}.gov-layout__section-text{width:var(--gov-layout-content-width, 48.75rem);margin-right:auto;margin-left:auto}.gov-layout__section-text-left{width:var(--gov-layout-content-width, 48.75rem);margin-right:auto}.gov-layout__section-text-right{width:var(--gov-layout-content-width, 48.75rem);margin-left:auto}}";

const GovLayout = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.type = 'stretch';
    this.variant = undefined;
    this.inverse = false;
    this.h = template.govHost(this.host);
  }
  typeClass(originalClass, type, variant, inverse) {
    const isType = type ? '-' + type : '';
    const isVariant = variant ? '-' + variant : '';
    const isInverse = inverse ? '-inverse' : '';
    return originalClass + ' ' + originalClass + isType + isVariant + isInverse;
  }
  render() {
    return (index.h(index.Host, { type: this.type, class: this.h.classes(constants.LayoutClass.root) }, index.h("section", { class: this.typeClass(constants.LayoutClass.section, this.type, this.variant, this.inverse) }, index.h("slot", null))));
  }
  get host() { return index.getElement(this); }
};
GovLayout.style = govLayoutCss;

exports.gov_layout = GovLayout;

//# sourceMappingURL=gov-layout.cjs.entry.js.map