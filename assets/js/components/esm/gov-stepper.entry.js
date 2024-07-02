import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { v as validateProp } from './props-a85d9c89.js';
import { S as StepperItemClass, a as StepperClass, b as StepperSizes } from './constants-78474786.js';
import { g as govHost } from './template-df429738.js';
import './gov.log-49da0221.js';
import './win-1dbd3f5c.js';
import './utils-c057a3fa.js';
import './variants-2b936d58.js';
import './sizes-6c5943b4.js';

const govStepperCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-stepper{position:relative;display:block;width:100%}";

const GovStepper = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govChange = createEvent(this, "gov-change", 7);
    this.size = 'm';
    this.h = govHost(this.host);
  }
  validateSize(newValue) {
    validateProp(StepperSizes, newValue, StepperClass.root);
  }
  componentWillLoad() {
    this.validateSize(this.size);
  }
  componentDidLoad() {
    this.host.querySelectorAll(StepperItemClass.root).forEach((child) => {
      child.setAttribute('size', this.size);
      child.addEventListener('gov-change', (e) => {
        e.stopPropagation();
        this.govChange.emit(e.detail);
      });
    });
  }
  render() {
    return (h(Host, { class: this.h.classes(StepperClass.root), role: "list", size: this.size }, h("slot", null)));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "size": ["validateSize"]
  }; }
};
GovStepper.style = govStepperCss;

export { GovStepper as gov_stepper };

//# sourceMappingURL=gov-stepper.entry.js.map