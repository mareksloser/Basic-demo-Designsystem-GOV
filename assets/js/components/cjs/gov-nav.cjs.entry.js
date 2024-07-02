'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const constants = require('./constants-2b1c31b8.js');
const wcag = require('./wcag-e6257f27.js');
const win = require('./win-5521073d.js');
const utils = require('./utils-c9b1bba3.js');
require('./gov.log-b842920d.js');
require('./string.utils-0f08c48c.js');

const govNavCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-nav{position:relative;display:block;width:100%;font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);background:var(--gov-nav-bg, var(--gov-color-primary));font-weight:bold;letter-spacing:0.0125em;text-transform:uppercase}@media (min-width: 48em){.gov-nav{text-align:center}.gov-nav__nav{display:flex;justify-content:space-between}}";

const GovNav = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
  }
  async componentDidRender() {
    if (win.canValidateWcagOnRender()) {
      await utils.delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (index.h(index.Host, { class: constants.NavClass.root }, index.h("nav", { class: constants.NavClass.nav, role: 'list', "arial-label": this.wcagLabel, "arial-labelledby": this.wcagLabelledBy }, index.h("slot", null))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    wcag.validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, constants.NavClass.root);
  }
  get host() { return index.getElement(this); }
};
GovNav.style = govNavCss;

exports.gov_nav = GovNav;

//# sourceMappingURL=gov-nav.cjs.entry.js.map