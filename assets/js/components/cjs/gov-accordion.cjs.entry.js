'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const props = require('./props-d6146e54.js');
const constants = require('./constants-dde21dcf.js');
const variants = require('./variants-f5ffeef3.js');
const wcag = require('./wcag-e6257f27.js');
const win = require('./win-5521073d.js');
const utils = require('./utils-c9b1bba3.js');
const template = require('./template-4b951d1d.js');
require('./gov.log-b842920d.js');
require('./sizes-79872c2a.js');
require('./string.utils-0f08c48c.js');

const govAccordionCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-accordion{position:relative;display:block;width:100%}.gov-accordion[no-border] .gov-accordion-item::before{background-color:transparent !important}";

const GovAccordion = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govChange = index.createEvent(this, "gov-change", 7);
    this.size = 'm';
    this.variant = 'primary';
    this.noBorder = false;
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.h = template.govHost(this.host);
  }
  validateSize(newValue) {
    props.validateProp(constants.AccordionSizes, newValue, constants.AccordionClass.root);
  }
  validateVariant(newValue) {
    props.validateProp(variants.Variants, newValue, constants.AccordionClass.root);
  }
  componentWillLoad() {
    this.validateSize(this.size);
    this.validateVariant(this.variant);
  }
  componentDidLoad() {
    this.host.querySelectorAll(constants.AccordionItemClass.root).forEach((child) => {
      child.addEventListener('gov-change', (e) => {
        e.stopPropagation();
        this.govChange.emit({
          component: constants.AccordionClass.root,
          open: e.detail.open,
          ref: e.detail.ref
        });
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
    return (index.h(index.Host, { class: this.h.classes(constants.AccordionClass.root), size: this.size, variant: this.variant, role: 'list', "arial-label": this.wcagLabel, "arial-labelledby": this.wcagLabelledBy }, index.h("slot", null)));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    wcag.validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, constants.AccordionClass.root);
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "size": ["validateSize"],
    "variant": ["validateVariant"]
  }; }
};
GovAccordion.style = govAccordionCss;

exports.gov_accordion = GovAccordion;

//# sourceMappingURL=gov-accordion.cjs.entry.js.map