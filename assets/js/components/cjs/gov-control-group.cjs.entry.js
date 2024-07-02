'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const variants = require('./variants-f5ffeef3.js');
const template = require('./template-4b951d1d.js');
const props = require('./props-d6146e54.js');
const utils = require('./utils-c9b1bba3.js');
require('./gov.log-b842920d.js');
require('./win-5521073d.js');

utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY', 'SUCCESS', 'ERROR', 'WARNING']);
const ControlGroupClass = {
  root: 'gov-control-group',
};

const govControlGroupCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-control-group{position:relative;display:flex;width:100%;align-items:center;border-radius:var(--gov-control-group-border-radius, 0.25rem)}.gov-control-group .element *,.gov-control-group .gov-button .element{border:none !important;border-radius:0}.gov-control-group[variant=primary]{border:var(--gov-control-group-border-primary, 0.0625rem solid var(--gov-color-primary-600))}.gov-control-group[variant=primary]>*{border-right:var(--gov-control-group-border-primary, 0.0625rem solid var(--gov-color-primary-600))}.gov-control-group[variant=secondary]{border:var(--gov-control-group-border-secondary, 0.0625rem solid var(--gov-color-secondary-700))}.gov-control-group[variant=secondary]>*{border-right:var(--gov-control-group-border-secondary, 0.0625rem solid var(--gov-color-secondary-700))}.gov-control-group[variant=success]{border:var(--gov-control-group-border-success, 0.0625rem solid var(--gov-color-success-500))}.gov-control-group[variant=success]>*{border-right:var(--gov-control-group-border-success, 0.0625rem solid var(--gov-color-success-500))}.gov-control-group[variant=warning]{border:var(--gov-control-group-border-warning, 0.0625rem solid var(--gov-color-warning-500))}.gov-control-group[variant=warning]>*{border-right:var(--gov-control-group-border-warning, 0.0625rem solid var(--gov-color-warning-500))}.gov-control-group[variant=error]{border:var(--gov-control-group-border-error, 0.0625rem solid var(--gov-color-error-400))}.gov-control-group[variant=error]>*{border-right:var(--gov-control-group-border-error, 0.0625rem solid var(--gov-color-error-400))}.gov-control-group>*:last-child{border-right:none}.gov-control-group.no-border>*{border-right:none}";

const GovControlGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.variant = variants.Variants.PRIMARY;
    this.noBorder = false;
    this.h = template.govHost(this.host);
  }
  validateVariant(newValue) {
    props.validateProp(variants.Variants, newValue, ControlGroupClass.root);
  }
  render() {
    const noBorder = this.noBorder === true ? "no-border" : undefined;
    return (index.h(index.Host, { class: this.h.classes([ControlGroupClass.root, noBorder]), variant: this.variant }, index.h("slot", null)));
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"]
  }; }
};
GovControlGroup.style = govControlGroupCss;

exports.gov_control_group = GovControlGroup;

//# sourceMappingURL=gov-control-group.cjs.entry.js.map