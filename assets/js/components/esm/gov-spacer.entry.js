import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { v as validateProp } from './props-a85d9c89.js';
import { S as Sizes } from './sizes-6c5943b4.js';
import { p as pick } from './utils-c057a3fa.js';
import { g as govHost } from './template-df429738.js';
import './gov.log-49da0221.js';
import './win-1dbd3f5c.js';

const SpacerSize = pick(Sizes, ['_2XS', '_XS', '_S', '_M', '_L', '_XL', '_2XL', '_3XL', '_4XL']);
var SpacerBreakpoints;
(function (SpacerBreakpoints) {
  SpacerBreakpoints["NONE"] = "none";
  SpacerBreakpoints["SM"] = "sm";
  SpacerBreakpoints["MD"] = "md";
  SpacerBreakpoints["LG"] = "lg";
  SpacerBreakpoints["XL"] = "xl";
})(SpacerBreakpoints || (SpacerBreakpoints = {}));
const SpacerClass = {
  root: 'gov-spacer',
};

const govSpacerCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-spacer{position:relative;display:block;width:100%}.gov-spacer[size=unset]{height:0}.gov-spacer[size=\"2xs\"]{height:0.25rem}.gov-spacer[size=xs]{height:0.5rem}.gov-spacer[size=s]{height:0.75rem}.gov-spacer[size=m]{height:1rem}.gov-spacer[size=l]{height:1.25rem}.gov-spacer[size=xl]{height:1.75rem}.gov-spacer[size=\"2xl\"]{height:2rem}.gov-spacer[size=\"3xl\"]{height:3rem}.gov-spacer[size=\"4xl\"]{height:4.5rem}.gov-spacer[breakpoint=none]{display:none}.gov-spacer[breakpoint=sm]{display:none}@media (min-width: 30em){.gov-spacer[breakpoint=sm]{display:block}}.gov-spacer[breakpoint=md]{display:none}@media (min-width: 48em){.gov-spacer[breakpoint=md]{display:block}}.gov-spacer[breakpoint=lg]{display:none}@media (min-width: 64em){.gov-spacer[breakpoint=lg]{display:block}}.gov-spacer[breakpoint=xl]{display:none}@media (min-width: 75em){.gov-spacer[breakpoint=xl]{display:block}}";

const GovSpacer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = undefined;
    this.breakpoint = undefined;
    this.h = govHost(this.host);
  }
  validateSize(newValue) {
    validateProp(SpacerSize, newValue, SpacerClass.root);
  }
  validateBreakpoint(newValue) {
    validateProp(SpacerBreakpoints, newValue, SpacerClass.root);
  }
  componentWillLoad() {
    this.validateSize(this.size);
    this.validateBreakpoint(this.breakpoint);
  }
  render() {
    return h(Host, { class: this.h.classes(SpacerClass.root), size: this.size, breakpoint: this.breakpoint });
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "size": ["validateSize"],
    "breakpoint": ["validateBreakpoint"]
  }; }
};
GovSpacer.style = govSpacerCss;

export { GovSpacer as gov_spacer };

//# sourceMappingURL=gov-spacer.entry.js.map