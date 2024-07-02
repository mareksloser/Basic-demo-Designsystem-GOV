'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const constants = require('./constants-25f7a6be.js');
const wcag = require('./wcag-e6257f27.js');
const win = require('./win-5521073d.js');
const utils = require('./utils-c9b1bba3.js');
const template = require('./template-4b951d1d.js');
require('./gov.log-b842920d.js');
require('./string.utils-0f08c48c.js');

const govSideNavCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-side-nav{position:relative;display:block;width:100%}";

const GovSideNav = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govChange = index.createEvent(this, "gov-change", 7);
    this.inverse = false;
    this.compact = false;
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
  }
  componentDidLoad() {
    this.host.querySelectorAll(constants.SideNavItemClass.root).forEach((child) => {
      child.setAttribute('inverse', template.booleanString(this.inverse));
      child.setAttribute('compact', template.booleanString(this.compact));
      child.addEventListener('gov-change', (e) => {
        e.stopPropagation();
        this.govChange.emit(e.detail);
      });
    });
  }
  async componentDidRender() {
    if (win.canValidateWcagOnRender()) {
      await utils.delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (index.h(index.Host, { class: constants.SideNavClass.root, compact: this.compact, inverse: this.inverse, "arial-label": this.wcagLabel, "arial-labelledby": this.wcagLabelledBy }, index.h("aside", { class: constants.SideNavClass.aside, role: 'list' }, index.h("slot", null))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    wcag.validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, constants.SideNavClass.root);
  }
  get host() { return index.getElement(this); }
};
GovSideNav.style = govSideNavCss;

exports.gov_side_nav = GovSideNav;

//# sourceMappingURL=gov-side-nav.cjs.entry.js.map