'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const wcag = require('./wcag-e6257f27.js');
const win = require('./win-5521073d.js');
const utils = require('./utils-c9b1bba3.js');
const template = require('./template-4b951d1d.js');
require('./gov.log-b842920d.js');
require('./string.utils-0f08c48c.js');

const BackdropClass = {
  root: 'gov-backdrop',
  bg: 'gov-backdrop__bg',
};

const govBackdropCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-backdrop__bg{z-index:100;position:fixed;top:0;right:0;bottom:0;left:0;background-color:var(--gov-backdrop-bg, var(--gov-color-secondary));opacity:var(--gov-backdrop-opacity, 0.45)}.gov-backdrop[inverse=\"\"] .gov-backdrop__bg,.gov-backdrop[inverse=true i] .gov-backdrop__bg,.gov-backdrop[inverse=\"1\"] .gov-backdrop__bg{background-color:var(--gov-backdrop-bg-inverse, var(--gov-color-neutral-white));opacity:var(--gov-backdrop-opacity, 0.8)}";

const GovBackdrop = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govClick = index.createEvent(this, "gov-click", 7);
    this.inverse = false;
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
    return (index.h(index.Host, { class: this.h.classes(BackdropClass.root) }, index.h("div", { role: 'button', "aria-label": this.wcagLabel, "aria-labelledby": this.wcagLabelledBy, onClick: e => this.govClick.emit(e), class: BackdropClass.bg })));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    wcag.validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, BackdropClass.root);
  }
  get host() { return index.getElement(this); }
};
GovBackdrop.style = govBackdropCss;

exports.gov_backdrop = GovBackdrop;

//# sourceMappingURL=gov-backdrop.cjs.entry.js.map