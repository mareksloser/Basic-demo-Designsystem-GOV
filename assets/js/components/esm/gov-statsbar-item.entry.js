import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { g as govHost } from './template-df429738.js';
import { v as validateProp } from './props-a85d9c89.js';
import { a as StatsBarItemClass, c as StatsBarIconPosition } from './constants-27b48cd1.js';
import './gov.log-49da0221.js';
import './win-1dbd3f5c.js';
import './utils-c057a3fa.js';
import './variants-2b936d58.js';

const govStatsbarItemCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-statsbar-item{position:relative;display:block;padding:1.25rem}.gov-statsbar-item__icon,.gov-statsbar-item__number{margin-bottom:1rem}.gov-statsbar-item__icon,.gov-statsbar-item__icon .gov-icon{display:block;width:2rem;height:2rem}.gov-statsbar-item__number{font-weight:var(--gov-text-5xl-font-weight);font-size:var(--gov-text-5xl-font-size);line-height:var(--gov-text-5xl-line-height);letter-spacing:var(--gov-text-5xl-letter-spacing)}.gov-statsbar-item__text{font-weight:var(--gov-text-xl-font-weight);font-size:var(--gov-text-xl-font-size);line-height:var(--gov-text-xl-line-height);letter-spacing:var(--gov-text-xl-letter-spacing);letter-spacing:0.0125em}.gov-statsbar-item__text>*:last-child{margin-bottom:0}.gov-statsbar-item[icon-position=left]{padding-left:3rem}.gov-statsbar-item[icon-position=left] .gov-statsbar-item__icon{position:absolute;top:1.5rem;left:0}@media (min-width: 30em){.gov-statsbar-item{flex:1 0 50%;max-width:50%}}@media (min-width: 48em){.gov-statsbar-item{padding:2.5rem}.gov-statsbar-item__icon,.gov-statsbar-item__icon .gov-icon{width:3rem;height:3rem}.gov-statsbar-item[icon-position=left]{padding-left:4rem}.gov-statsbar-item[icon-position=left] .gov-statsbar-item__icon{top:2.75rem}}@media (min-width: 64em){.gov-statsbar-item{flex-basis:auto;max-width:25%}}";

const GovStatsbarItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.iconPosition = undefined;
    this.h = govHost(this.host);
  }
  validateIconPosition(newValue) {
    validateProp(StatsBarIconPosition, newValue, StatsBarItemClass.root);
  }
  componentWillLoad() {
    this.validateIconPosition(this.iconPosition);
  }
  render() {
    return (h(Host, { class: this.h.classes(StatsBarItemClass.root) }, h("article", null, this.h.hasSlot('icon') && (h("span", { class: StatsBarItemClass.icon }, h("slot", { name: "icon" }))), h("p", { class: StatsBarItemClass.number }, h("slot", null)), this.h.hasSlot('text') && (h("div", { class: StatsBarItemClass.text }, h("slot", { name: "text" }))))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "iconPosition": ["validateIconPosition"]
  }; }
};
GovStatsbarItem.style = govStatsbarItemCss;

export { GovStatsbarItem as gov_statsbar_item };

//# sourceMappingURL=gov-statsbar-item.entry.js.map