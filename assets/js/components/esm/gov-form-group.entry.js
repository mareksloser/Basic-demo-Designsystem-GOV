import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { p as pick } from './utils-c057a3fa.js';
import { S as Sizes } from './sizes-6c5943b4.js';
import { g as govHost } from './template-df429738.js';
import { v as validateProp } from './props-a85d9c89.js';
import './gov.log-49da0221.js';
import './win-1dbd3f5c.js';

const FormGroupSizes = pick(Sizes, ['_2XS', '_XS', '_S', '_M', '_L']);
var FormGroupOrientation;
(function (FormGroupOrientation) {
  FormGroupOrientation["HORIZONTAL"] = "horizontal";
  FormGroupOrientation["VERTICAL"] = "vertical";
})(FormGroupOrientation || (FormGroupOrientation = {}));
const FormGroupClass = {
  root: 'gov-form-group',
};

const govFormGroupCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-group{position:relative;display:flex;width:100%;flex-direction:column;align-items:flex-start}.gov-form-group .gov-form-label__label{margin:0}.gov-form-group[orientation=horizontal]{flex-direction:row;flex-wrap:wrap}.gov-form-group[orientation=horizontal] .gov-form-label__label{white-space:nowrap}.gov-form-group[gap=\"2xs\"]{gap:0.25rem}.gov-form-group[gap=xs]{gap:0.5rem}.gov-form-group[gap=s]{gap:0.75rem}.gov-form-group[gap=m]{gap:1rem}.gov-form-group[gap=l]{gap:1.25rem}";

const GovFormGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.gap = undefined;
    this.orientation = 'vertical';
    this.h = govHost(this.host);
  }
  validateGap(newValue) {
    if (newValue) {
      validateProp(FormGroupSizes, newValue, FormGroupClass.root);
    }
  }
  validateOrientation(newValue) {
    if (newValue) {
      validateProp(FormGroupOrientation, newValue, FormGroupClass.root);
    }
  }
  componentWillLoad() {
    this.validateGap(this.gap);
    this.validateOrientation(this.orientation);
  }
  render() {
    return (h(Host, { gap: this.gap, class: this.h.classes(FormGroupClass.root) }, h("slot", null)));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "gap": ["validateGap"],
    "orientation": ["validateOrientation"]
  }; }
};
GovFormGroup.style = govFormGroupCss;

export { GovFormGroup as gov_form_group };

//# sourceMappingURL=gov-form-group.entry.js.map