import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { V as Variants } from './variants-2b936d58.js';
import { g as govHost } from './template-df429738.js';
import { v as validateProp } from './props-a85d9c89.js';
import { p as pick } from './utils-c057a3fa.js';
import './gov.log-49da0221.js';
import './win-1dbd3f5c.js';

pick(Variants, ['PRIMARY', 'SECONDARY', 'SUCCESS', 'ERROR', 'WARNING']);
const ControlGroupClass = {
  root: 'gov-control-group',
};

const govControlGroupCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-control-group{position:relative;display:flex;width:100%;align-items:center;border-radius:var(--gov-control-group-border-radius, 0.25rem)}.gov-control-group .element *,.gov-control-group .gov-button .element{border:none !important;border-radius:0}.gov-control-group[variant=primary]{border:var(--gov-control-group-border-primary, 0.0625rem solid var(--gov-color-primary-600))}.gov-control-group[variant=primary]>*{border-right:var(--gov-control-group-border-primary, 0.0625rem solid var(--gov-color-primary-600))}.gov-control-group[variant=secondary]{border:var(--gov-control-group-border-secondary, 0.0625rem solid var(--gov-color-secondary-700))}.gov-control-group[variant=secondary]>*{border-right:var(--gov-control-group-border-secondary, 0.0625rem solid var(--gov-color-secondary-700))}.gov-control-group[variant=success]{border:var(--gov-control-group-border-success, 0.0625rem solid var(--gov-color-success-500))}.gov-control-group[variant=success]>*{border-right:var(--gov-control-group-border-success, 0.0625rem solid var(--gov-color-success-500))}.gov-control-group[variant=warning]{border:var(--gov-control-group-border-warning, 0.0625rem solid var(--gov-color-warning-500))}.gov-control-group[variant=warning]>*{border-right:var(--gov-control-group-border-warning, 0.0625rem solid var(--gov-color-warning-500))}.gov-control-group[variant=error]{border:var(--gov-control-group-border-error, 0.0625rem solid var(--gov-color-error-400))}.gov-control-group[variant=error]>*{border-right:var(--gov-control-group-border-error, 0.0625rem solid var(--gov-color-error-400))}.gov-control-group>*:last-child{border-right:none}.gov-control-group.no-border>*{border-right:none}";

const GovControlGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.variant = Variants.PRIMARY;
    this.noBorder = false;
    this.h = govHost(this.host);
  }
  validateVariant(newValue) {
    validateProp(Variants, newValue, ControlGroupClass.root);
  }
  render() {
    const noBorder = this.noBorder === true ? "no-border" : undefined;
    return (h(Host, { class: this.h.classes([ControlGroupClass.root, noBorder]), variant: this.variant }, h("slot", null)));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"]
  }; }
};
GovControlGroup.style = govControlGroupCss;

export { GovControlGroup as gov_control_group };

//# sourceMappingURL=gov-control-group.entry.js.map