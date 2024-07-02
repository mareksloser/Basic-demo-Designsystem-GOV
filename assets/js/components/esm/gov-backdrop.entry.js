import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { v as validateWcagLabel } from './wcag-7d25e12b.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { d as delay } from './utils-c057a3fa.js';
import { g as govHost } from './template-df429738.js';
import './gov.log-49da0221.js';
import './string.utils-f268fc6b.js';

const BackdropClass = {
  root: 'gov-backdrop',
  bg: 'gov-backdrop__bg',
};

const govBackdropCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-backdrop__bg{z-index:100;position:fixed;top:0;right:0;bottom:0;left:0;background-color:var(--gov-backdrop-bg, var(--gov-color-secondary));opacity:var(--gov-backdrop-opacity, 0.45)}.gov-backdrop[inverse=\"\"] .gov-backdrop__bg,.gov-backdrop[inverse=true i] .gov-backdrop__bg,.gov-backdrop[inverse=\"1\"] .gov-backdrop__bg{background-color:var(--gov-backdrop-bg-inverse, var(--gov-color-neutral-white));opacity:var(--gov-backdrop-opacity, 0.8)}";

const GovBackdrop = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govClick = createEvent(this, "gov-click", 7);
    this.inverse = false;
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
    return (h(Host, { class: this.h.classes(BackdropClass.root) }, h("div", { role: 'button', "aria-label": this.wcagLabel, "aria-labelledby": this.wcagLabelledBy, onClick: e => this.govClick.emit(e), class: BackdropClass.bg })));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, BackdropClass.root);
  }
  get host() { return getElement(this); }
};
GovBackdrop.style = govBackdropCss;

export { GovBackdrop as gov_backdrop };

//# sourceMappingURL=gov-backdrop.entry.js.map