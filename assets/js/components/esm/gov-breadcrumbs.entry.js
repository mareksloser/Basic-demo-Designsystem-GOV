import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { v as validateWcagLabel } from './wcag-7d25e12b.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { d as delay } from './utils-c057a3fa.js';
import { g as govHost } from './template-df429738.js';
import './gov.log-49da0221.js';
import './string.utils-f268fc6b.js';

const BreadcrumbsClass = {
  root: 'gov-breadcrumbs',
};

const govBreadcrumbsCss = ".gov-breadcrumbs ul{margin:0;padding:0}.gov-breadcrumbs li{margin:0;padding:0;background:none}.gov-breadcrumbs li::before{display:none}.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-breadcrumbs ul{position:relative;display:flex;width:100%;padding-bottom:0.3125rem;overflow-x:auto}.gov-breadcrumbs li{display:flex;justify-content:flex-start;align-items:center;white-space:nowrap}.gov-breadcrumbs button{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);padding:0;border:none;background:none;color:var(--gov-breadcrumbs-link-color, var(--gov-color-primary));text-decoration:underline}.gov-breadcrumbs button:hover{text-decoration:none}.gov-breadcrumbs .gov-icon{width:0.625rem;height:0.625rem;margin:0rem 1rem;color:var(--gov-breadcrumbs-arrow-color, var(--gov-color-secondary-600))}";

const GovBreadcrumbs = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govChange = createEvent(this, "gov-change", 7);
    this.collapsible = false;
    this.isExpanded = false;
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.h = govHost(this.host);
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (h(Host, { class: this.h.classes(BreadcrumbsClass.root) }, h("nav", { "aria-label": this.wcagLabel, "aria-labelledby": this.wcagLabelledBy }, h("slot", null))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, BreadcrumbsClass.root);
  }
  get host() { return getElement(this); }
};
GovBreadcrumbs.style = govBreadcrumbsCss;

export { GovBreadcrumbs as gov_breadcrumbs };

//# sourceMappingURL=gov-breadcrumbs.entry.js.map