'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const props = require('./props-d6146e54.js');
const sizes = require('./sizes-79872c2a.js');
const utils = require('./utils-c9b1bba3.js');
const template = require('./template-4b951d1d.js');
require('./gov.log-b842920d.js');
require('./win-5521073d.js');

const SpacerSize = utils.pick(sizes.Sizes, ['_2XS', '_XS', '_S', '_M', '_L', '_XL', '_2XL', '_3XL', '_4XL']);
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
    index.registerInstance(this, hostRef);
    this.size = undefined;
    this.breakpoint = undefined;
    this.h = template.govHost(this.host);
  }
  validateSize(newValue) {
    props.validateProp(SpacerSize, newValue, SpacerClass.root);
  }
  validateBreakpoint(newValue) {
    props.validateProp(SpacerBreakpoints, newValue, SpacerClass.root);
  }
  componentWillLoad() {
    this.validateSize(this.size);
    this.validateBreakpoint(this.breakpoint);
  }
  render() {
    return index.h(index.Host, { class: this.h.classes(SpacerClass.root), size: this.size, breakpoint: this.breakpoint });
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "size": ["validateSize"],
    "breakpoint": ["validateBreakpoint"]
  }; }
};
GovSpacer.style = govSpacerCss;

exports.gov_spacer = GovSpacer;

//# sourceMappingURL=gov-spacer.cjs.entry.js.map