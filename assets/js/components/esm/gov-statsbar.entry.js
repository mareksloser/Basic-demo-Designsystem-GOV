import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { v as validateProp } from './props-a85d9c89.js';
import { S as StatsBarVariants, a as StatsBarItemClass, b as StatsBarClass, c as StatsBarIconPosition } from './constants-27b48cd1.js';
import { g as govHost } from './template-df429738.js';
import './gov.log-49da0221.js';
import './win-1dbd3f5c.js';
import './utils-c057a3fa.js';
import './variants-2b936d58.js';

const govStatsbarCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-statsbar{position:relative;display:block;width:100%;padding:1.25rem 0}.gov-statsbar__section{display:block;width:100%;max-width:calc(var(--gov-container-width, 73.75rem) + 2 * var(--gov-container-padding, 2.5rem));margin-right:auto;margin-left:auto;padding-right:var(--gov-container-padding-mobile, 1.25rem);padding-left:var(--gov-container-padding-mobile, 1.25rem)}@media (min-width: 48em){.gov-statsbar__section{padding-right:var(--gov-container-padding, 2.5rem);padding-left:var(--gov-container-padding, 2.5rem)}}.gov-statsbar[variant=primary]{background-color:var(--gov-statsbar-primary-bg-color, var(--gov-color-primary-200));color:var(--gov-statsbar-primary-text-color, var(--gov-color-primary))}.gov-statsbar[variant=primary][inverse=\"\"],.gov-statsbar[variant=primary][inverse=true i],.gov-statsbar[variant=primary][inverse=\"1\"]{background:var(--gov-color-neutral-white);color:var(--gov-statsbar-primary-text-color-inverse, var(--gov-color-primary))}.gov-statsbar[variant=secondary]{background-color:var(--gov-statsbar-secondary-bg-color, var(--gov-color-secondary));color:var(--gov-statsbar-secondary-text-color, var(--gov-color-neutral-white))}.gov-statsbar[variant=secondary][inverse=\"\"],.gov-statsbar[variant=secondary][inverse=true i],.gov-statsbar[variant=secondary][inverse=\"1\"]{background:var(--gov-color-neutral-white);color:var(--gov-statsbar-secondary-text-color-inverse, var(--gov-color-secondary))}@media (min-width: 30em){.gov-statsbar__section{display:flex;flex-wrap:wrap;justify-content:center}}@media (min-width: 48em){.gov-statsbar{padding:0}}";

const GovStatsbar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.iconPosition = undefined;
    this.variant = StatsBarVariants.PRIMARY;
    this.h = govHost(this.host);
  }
  validateIconPosition(newValue) {
    validateProp(StatsBarIconPosition, newValue, StatsBarClass.root);
  }
  validateVariant(newValue) {
    validateProp(StatsBarVariants, newValue, StatsBarClass.root);
  }
  componentWillLoad() {
    this.validateIconPosition(this.iconPosition);
    this.validateVariant(this.variant);
  }
  componentDidLoad() {
    this.host.querySelectorAll(StatsBarItemClass.root).forEach((node) => {
      if (this.iconPosition === "left") {
        node.setAttribute("icon-position", "left");
      }
    });
  }
  render() {
    return (h(Host, { class: this.h.classes(StatsBarClass.root), variant: this.variant }, h("section", { class: StatsBarClass.section }, h("slot", null))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "iconPosition": ["validateIconPosition"],
    "variant": ["validateVariant"]
  }; }
};
GovStatsbar.style = govStatsbarCss;

export { GovStatsbar as gov_statsbar };

//# sourceMappingURL=gov-statsbar.entry.js.map