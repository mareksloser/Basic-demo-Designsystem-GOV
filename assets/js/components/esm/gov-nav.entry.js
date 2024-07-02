import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { N as NavClass } from './constants-d71c09e0.js';
import { v as validateWcagLabel } from './wcag-7d25e12b.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { d as delay } from './utils-c057a3fa.js';
import './gov.log-49da0221.js';
import './string.utils-f268fc6b.js';

const govNavCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-nav{position:relative;display:block;width:100%;font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);background:var(--gov-nav-bg, var(--gov-color-primary));font-weight:bold;letter-spacing:0.0125em;text-transform:uppercase}@media (min-width: 48em){.gov-nav{text-align:center}.gov-nav__nav{display:flex;justify-content:space-between}}";

const GovNav = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (h(Host, { class: NavClass.root }, h("nav", { class: NavClass.nav, role: 'list', "arial-label": this.wcagLabel, "arial-labelledby": this.wcagLabelledBy }, h("slot", null))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, NavClass.root);
  }
  get host() { return getElement(this); }
};
GovNav.style = govNavCss;

export { GovNav as gov_nav };

//# sourceMappingURL=gov-nav.entry.js.map