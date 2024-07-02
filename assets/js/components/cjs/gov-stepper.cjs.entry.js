'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const props = require('./props-d6146e54.js');
const constants = require('./constants-0c6c8e11.js');
const template = require('./template-4b951d1d.js');
require('./gov.log-b842920d.js');
require('./win-5521073d.js');
require('./utils-c9b1bba3.js');
require('./variants-f5ffeef3.js');
require('./sizes-79872c2a.js');

const govStepperCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-stepper{position:relative;display:block;width:100%}";

const GovStepper = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govChange = index.createEvent(this, "gov-change", 7);
    this.size = 'm';
    this.h = template.govHost(this.host);
  }
  validateSize(newValue) {
    props.validateProp(constants.StepperSizes, newValue, constants.StepperClass.root);
  }
  componentWillLoad() {
    this.validateSize(this.size);
  }
  componentDidLoad() {
    this.host.querySelectorAll(constants.StepperItemClass.root).forEach((child) => {
      child.setAttribute('size', this.size);
      child.addEventListener('gov-change', (e) => {
        e.stopPropagation();
        this.govChange.emit(e.detail);
      });
    });
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(constants.StepperClass.root), role: "list", size: this.size }, index.h("slot", null)));
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "size": ["validateSize"]
  }; }
};
GovStepper.style = govStepperCss;

exports.gov_stepper = GovStepper;

//# sourceMappingURL=gov-stepper.cjs.entry.js.map