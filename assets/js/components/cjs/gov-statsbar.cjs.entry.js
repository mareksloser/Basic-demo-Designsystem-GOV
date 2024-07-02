'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const props = require('./props-d6146e54.js');
const constants = require('./constants-61f8be34.js');
const template = require('./template-4b951d1d.js');
require('./gov.log-b842920d.js');
require('./win-5521073d.js');
require('./utils-c9b1bba3.js');
require('./variants-f5ffeef3.js');

const govStatsbarCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-statsbar{position:relative;display:block;width:100%;padding:1.25rem 0}.gov-statsbar__section{display:block;width:100%;max-width:calc(var(--gov-container-width, 73.75rem) + 2 * var(--gov-container-padding, 2.5rem));margin-right:auto;margin-left:auto;padding-right:var(--gov-container-padding-mobile, 1.25rem);padding-left:var(--gov-container-padding-mobile, 1.25rem)}@media (min-width: 48em){.gov-statsbar__section{padding-right:var(--gov-container-padding, 2.5rem);padding-left:var(--gov-container-padding, 2.5rem)}}.gov-statsbar[variant=primary]{background-color:var(--gov-statsbar-primary-bg-color, var(--gov-color-primary-200));color:var(--gov-statsbar-primary-text-color, var(--gov-color-primary))}.gov-statsbar[variant=primary][inverse=\"\"],.gov-statsbar[variant=primary][inverse=true i],.gov-statsbar[variant=primary][inverse=\"1\"]{background:var(--gov-color-neutral-white);color:var(--gov-statsbar-primary-text-color-inverse, var(--gov-color-primary))}.gov-statsbar[variant=secondary]{background-color:var(--gov-statsbar-secondary-bg-color, var(--gov-color-secondary));color:var(--gov-statsbar-secondary-text-color, var(--gov-color-neutral-white))}.gov-statsbar[variant=secondary][inverse=\"\"],.gov-statsbar[variant=secondary][inverse=true i],.gov-statsbar[variant=secondary][inverse=\"1\"]{background:var(--gov-color-neutral-white);color:var(--gov-statsbar-secondary-text-color-inverse, var(--gov-color-secondary))}@media (min-width: 30em){.gov-statsbar__section{display:flex;flex-wrap:wrap;justify-content:center}}@media (min-width: 48em){.gov-statsbar{padding:0}}";

const GovStatsbar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.iconPosition = undefined;
    this.variant = constants.StatsBarVariants.PRIMARY;
    this.h = template.govHost(this.host);
  }
  validateIconPosition(newValue) {
    props.validateProp(constants.StatsBarIconPosition, newValue, constants.StatsBarClass.root);
  }
  validateVariant(newValue) {
    props.validateProp(constants.StatsBarVariants, newValue, constants.StatsBarClass.root);
  }
  componentWillLoad() {
    this.validateIconPosition(this.iconPosition);
    this.validateVariant(this.variant);
  }
  componentDidLoad() {
    this.host.querySelectorAll(constants.StatsBarItemClass.root).forEach((node) => {
      if (this.iconPosition === "left") {
        node.setAttribute("icon-position", "left");
      }
    });
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(constants.StatsBarClass.root), variant: this.variant }, index.h("section", { class: constants.StatsBarClass.section }, index.h("slot", null))));
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "iconPosition": ["validateIconPosition"],
    "variant": ["validateVariant"]
  }; }
};
GovStatsbar.style = govStatsbarCss;

exports.gov_statsbar = GovStatsbar;

//# sourceMappingURL=gov-statsbar.cjs.entry.js.map