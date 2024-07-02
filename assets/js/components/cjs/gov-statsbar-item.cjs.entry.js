'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const template = require('./template-4b951d1d.js');
const props = require('./props-d6146e54.js');
const constants = require('./constants-61f8be34.js');
require('./gov.log-b842920d.js');
require('./win-5521073d.js');
require('./utils-c9b1bba3.js');
require('./variants-f5ffeef3.js');

const govStatsbarItemCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-statsbar-item{position:relative;display:block;padding:1.25rem}.gov-statsbar-item__icon,.gov-statsbar-item__number{margin-bottom:1rem}.gov-statsbar-item__icon,.gov-statsbar-item__icon .gov-icon{display:block;width:2rem;height:2rem}.gov-statsbar-item__number{font-weight:var(--gov-text-5xl-font-weight);font-size:var(--gov-text-5xl-font-size);line-height:var(--gov-text-5xl-line-height);letter-spacing:var(--gov-text-5xl-letter-spacing)}.gov-statsbar-item__text{font-weight:var(--gov-text-xl-font-weight);font-size:var(--gov-text-xl-font-size);line-height:var(--gov-text-xl-line-height);letter-spacing:var(--gov-text-xl-letter-spacing);letter-spacing:0.0125em}.gov-statsbar-item__text>*:last-child{margin-bottom:0}.gov-statsbar-item[icon-position=left]{padding-left:3rem}.gov-statsbar-item[icon-position=left] .gov-statsbar-item__icon{position:absolute;top:1.5rem;left:0}@media (min-width: 30em){.gov-statsbar-item{flex:1 0 50%;max-width:50%}}@media (min-width: 48em){.gov-statsbar-item{padding:2.5rem}.gov-statsbar-item__icon,.gov-statsbar-item__icon .gov-icon{width:3rem;height:3rem}.gov-statsbar-item[icon-position=left]{padding-left:4rem}.gov-statsbar-item[icon-position=left] .gov-statsbar-item__icon{top:2.75rem}}@media (min-width: 64em){.gov-statsbar-item{flex-basis:auto;max-width:25%}}";

const GovStatsbarItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.iconPosition = undefined;
    this.h = template.govHost(this.host);
  }
  validateIconPosition(newValue) {
    props.validateProp(constants.StatsBarIconPosition, newValue, constants.StatsBarItemClass.root);
  }
  componentWillLoad() {
    this.validateIconPosition(this.iconPosition);
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(constants.StatsBarItemClass.root) }, index.h("article", null, this.h.hasSlot('icon') && (index.h("span", { class: constants.StatsBarItemClass.icon }, index.h("slot", { name: "icon" }))), index.h("p", { class: constants.StatsBarItemClass.number }, index.h("slot", null)), this.h.hasSlot('text') && (index.h("div", { class: constants.StatsBarItemClass.text }, index.h("slot", { name: "text" }))))));
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "iconPosition": ["validateIconPosition"]
  }; }
};
GovStatsbarItem.style = govStatsbarItemCss;

exports.gov_statsbar_item = GovStatsbarItem;

//# sourceMappingURL=gov-statsbar-item.cjs.entry.js.map