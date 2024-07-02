'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const utils = require('./utils-c9b1bba3.js');
const sizes = require('./sizes-79872c2a.js');
const template = require('./template-4b951d1d.js');
const props = require('./props-d6146e54.js');
require('./gov.log-b842920d.js');
require('./win-5521073d.js');

const FormGroupSizes = utils.pick(sizes.Sizes, ['_2XS', '_XS', '_S', '_M', '_L']);
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
    index.registerInstance(this, hostRef);
    this.gap = undefined;
    this.orientation = 'vertical';
    this.h = template.govHost(this.host);
  }
  validateGap(newValue) {
    if (newValue) {
      props.validateProp(FormGroupSizes, newValue, FormGroupClass.root);
    }
  }
  validateOrientation(newValue) {
    if (newValue) {
      props.validateProp(FormGroupOrientation, newValue, FormGroupClass.root);
    }
  }
  componentWillLoad() {
    this.validateGap(this.gap);
    this.validateOrientation(this.orientation);
  }
  render() {
    return (index.h(index.Host, { gap: this.gap, class: this.h.classes(FormGroupClass.root) }, index.h("slot", null)));
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "gap": ["validateGap"],
    "orientation": ["validateOrientation"]
  }; }
};
GovFormGroup.style = govFormGroupCss;

exports.gov_form_group = GovFormGroup;

//# sourceMappingURL=gov-form-group.cjs.entry.js.map