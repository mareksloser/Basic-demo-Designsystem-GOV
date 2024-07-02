import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { v as validateProp } from './props-a85d9c89.js';
import { W as WizardItemClass, a as WizardClass, b as WizardSizes } from './constants-2499979c.js';
import { g as govHost } from './template-df429738.js';
import { v as validateWcagLabel } from './wcag-7d25e12b.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { d as delay } from './utils-c057a3fa.js';
import './gov.log-49da0221.js';
import './variants-2b936d58.js';
import './sizes-6c5943b4.js';
import './string.utils-f268fc6b.js';

const govWizardCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-wizard{position:relative;display:block;width:100%}.gov-wizard>*:last-child{margin-bottom:0}";

const GovWizard = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govChange = createEvent(this, "gov-change", 7);
    this.size = "m";
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.h = govHost(this.host);
  }
  validateSize(newValue) {
    validateProp(WizardSizes, newValue, WizardClass.root);
  }
  componentWillLoad() {
    this.validateSize(this.size);
  }
  componentDidLoad() {
    this.host.querySelectorAll(WizardItemClass.root).forEach((child) => {
      child.setAttribute("size", this.size);
      /*
      child.addEventListener('gov-change', (e: GovWizardItemCustomEvent<GovWizardItemChangeEvent>) => {
        e.stopPropagation()
        this.govChange.emit(e.detail)
      })
      */
    });
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (h(Host, { class: this.h.classes(WizardClass.root), role: "list", size: this.size }, h("slot", null)));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, WizardClass.root);
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "size": ["validateSize"]
  }; }
};
GovWizard.style = govWizardCss;

export { GovWizard as gov_wizard };

//# sourceMappingURL=gov-wizard.entry.js.map