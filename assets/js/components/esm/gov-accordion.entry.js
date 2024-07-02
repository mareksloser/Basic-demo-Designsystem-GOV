import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { v as validateProp } from './props-a85d9c89.js';
import { A as AccordionItemClass, a as AccordionClass, b as AccordionSizes } from './constants-09bda759.js';
import { V as Variants } from './variants-2b936d58.js';
import { v as validateWcagLabel } from './wcag-7d25e12b.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { d as delay } from './utils-c057a3fa.js';
import { g as govHost } from './template-df429738.js';
import './gov.log-49da0221.js';
import './sizes-6c5943b4.js';
import './string.utils-f268fc6b.js';

const govAccordionCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-accordion{position:relative;display:block;width:100%}.gov-accordion[no-border] .gov-accordion-item::before{background-color:transparent !important}";

const GovAccordion = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govChange = createEvent(this, "gov-change", 7);
    this.size = 'm';
    this.variant = 'primary';
    this.noBorder = false;
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.h = govHost(this.host);
  }
  validateSize(newValue) {
    validateProp(AccordionSizes, newValue, AccordionClass.root);
  }
  validateVariant(newValue) {
    validateProp(Variants, newValue, AccordionClass.root);
  }
  componentWillLoad() {
    this.validateSize(this.size);
    this.validateVariant(this.variant);
  }
  componentDidLoad() {
    this.host.querySelectorAll(AccordionItemClass.root).forEach((child) => {
      child.addEventListener('gov-change', (e) => {
        e.stopPropagation();
        this.govChange.emit({
          component: AccordionClass.root,
          open: e.detail.open,
          ref: e.detail.ref
        });
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
    return (h(Host, { class: this.h.classes(AccordionClass.root), size: this.size, variant: this.variant, role: 'list', "arial-label": this.wcagLabel, "arial-labelledby": this.wcagLabelledBy }, h("slot", null)));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, AccordionClass.root);
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "size": ["validateSize"],
    "variant": ["validateVariant"]
  }; }
};
GovAccordion.style = govAccordionCss;

export { GovAccordion as gov_accordion };

//# sourceMappingURL=gov-accordion.entry.js.map