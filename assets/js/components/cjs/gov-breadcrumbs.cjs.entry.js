'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const wcag = require('./wcag-e6257f27.js');
const win = require('./win-5521073d.js');
const utils = require('./utils-c9b1bba3.js');
const template = require('./template-4b951d1d.js');
require('./gov.log-b842920d.js');
require('./string.utils-0f08c48c.js');

const BreadcrumbsClass = {
  root: 'gov-breadcrumbs',
};

const govBreadcrumbsCss = ".gov-breadcrumbs ul{margin:0;padding:0}.gov-breadcrumbs li{margin:0;padding:0;background:none}.gov-breadcrumbs li::before{display:none}.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-breadcrumbs ul{position:relative;display:flex;width:100%;padding-bottom:0.3125rem;overflow-x:auto}.gov-breadcrumbs li{display:flex;justify-content:flex-start;align-items:center;white-space:nowrap}.gov-breadcrumbs button{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);padding:0;border:none;background:none;color:var(--gov-breadcrumbs-link-color, var(--gov-color-primary));text-decoration:underline}.gov-breadcrumbs button:hover{text-decoration:none}.gov-breadcrumbs .gov-icon{width:0.625rem;height:0.625rem;margin:0rem 1rem;color:var(--gov-breadcrumbs-arrow-color, var(--gov-color-secondary-600))}";

const GovBreadcrumbs = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govChange = index.createEvent(this, "gov-change", 7);
    this.collapsible = false;
    this.isExpanded = false;
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.h = template.govHost(this.host);
  }
  async componentDidRender() {
    if (win.canValidateWcagOnRender()) {
      await utils.delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(BreadcrumbsClass.root) }, index.h("nav", { "aria-label": this.wcagLabel, "aria-labelledby": this.wcagLabelledBy }, index.h("slot", null))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    wcag.validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, BreadcrumbsClass.root);
  }
  get host() { return index.getElement(this); }
};
GovBreadcrumbs.style = govBreadcrumbsCss;

exports.gov_breadcrumbs = GovBreadcrumbs;

//# sourceMappingURL=gov-breadcrumbs.cjs.entry.js.map