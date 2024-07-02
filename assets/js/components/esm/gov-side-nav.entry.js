import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { S as SideNavItemClass, a as SideNavClass } from './constants-867ac6e2.js';
import { v as validateWcagLabel } from './wcag-7d25e12b.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { d as delay } from './utils-c057a3fa.js';
import { b as booleanString } from './template-df429738.js';
import './gov.log-49da0221.js';
import './string.utils-f268fc6b.js';

const govSideNavCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-side-nav{position:relative;display:block;width:100%}";

const GovSideNav = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govChange = createEvent(this, "gov-change", 7);
    this.inverse = false;
    this.compact = false;
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
  }
  componentDidLoad() {
    this.host.querySelectorAll(SideNavItemClass.root).forEach((child) => {
      child.setAttribute('inverse', booleanString(this.inverse));
      child.setAttribute('compact', booleanString(this.compact));
      child.addEventListener('gov-change', (e) => {
        e.stopPropagation();
        this.govChange.emit(e.detail);
      });
    });
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (h(Host, { class: SideNavClass.root, compact: this.compact, inverse: this.inverse, "arial-label": this.wcagLabel, "arial-labelledby": this.wcagLabelledBy }, h("aside", { class: SideNavClass.aside, role: 'list' }, h("slot", null))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, SideNavClass.root);
  }
  get host() { return getElement(this); }
};
GovSideNav.style = govSideNavCss;

export { GovSideNav as gov_side_nav };

//# sourceMappingURL=gov-side-nav.entry.js.map