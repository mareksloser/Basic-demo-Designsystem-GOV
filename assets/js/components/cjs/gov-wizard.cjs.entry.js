'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const props = require('./props-d6146e54.js');
const constants = require('./constants-440cd5c8.js');
const template = require('./template-4b951d1d.js');
const wcag = require('./wcag-e6257f27.js');
const win = require('./win-5521073d.js');
const utils = require('./utils-c9b1bba3.js');
require('./gov.log-b842920d.js');
require('./variants-f5ffeef3.js');
require('./sizes-79872c2a.js');
require('./string.utils-0f08c48c.js');

const govWizardCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-wizard{position:relative;display:block;width:100%}.gov-wizard>*:last-child{margin-bottom:0}";

const GovWizard = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govChange = index.createEvent(this, "gov-change", 7);
    this.size = "m";
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.h = template.govHost(this.host);
  }
  validateSize(newValue) {
    props.validateProp(constants.WizardSizes, newValue, constants.WizardClass.root);
  }
  componentWillLoad() {
    this.validateSize(this.size);
  }
  componentDidLoad() {
    this.host.querySelectorAll(constants.WizardItemClass.root).forEach((child) => {
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
    if (win.canValidateWcagOnRender()) {
      await utils.delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(constants.WizardClass.root), role: "list", size: this.size }, index.h("slot", null)));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    wcag.validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, constants.WizardClass.root);
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "size": ["validateSize"]
  }; }
};
GovWizard.style = govWizardCss;

exports.gov_wizard = GovWizard;

//# sourceMappingURL=gov-wizard.cjs.entry.js.map