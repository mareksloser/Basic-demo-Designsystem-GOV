'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const gov_log = require('./gov.log-b842920d.js');
const constants = require('./constants-2b1c31b8.js');
require('./win-5521073d.js');
require('./utils-c9b1bba3.js');

const govNavItemCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-nav-item{display:block}.gov-nav-item__link{position:relative;display:block;padding:0.9375rem 3rem 0.9375rem 2.25rem;color:var(--gov-nav-color, var(--gov-color-neutral-white));text-decoration:none}.gov-nav-item__link:focus{outline:none}.gov-nav-item__link:focus-visible{border-radius:var(--gov-border-radius, 0.1875rem);outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base);outline-offset:0}.gov-nav-item__link:focus{outline-color:var(--gov-nav-color, var(--gov-color-neutral-white))}@media not all and (pointer: coarse){.gov-nav-item__link:hover{color:var(--gov-nav-color, var(--gov-color-neutral-white));text-decoration:underline}}@media (min-width: 48em){.gov-nav-item__link{display:inline-flex;justify-content:center;align-items:center;height:100%;padding:1.375rem 1.25rem 1.3125rem}.gov-nav-item__link::before{content:\"\";position:absolute;display:block;top:0;left:50%;width:0;height:0.125rem;background:var(--gov-nav-color, var(--gov-color-neutral-white));transform:translate(-50%);transition:width 150ms}@media not all and (pointer: coarse){.gov-nav-item__link:hover{text-decoration:none}.gov-nav-item__link:hover::before{width:100%}}}";

const GovNavItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.isExpandedState = undefined;
    this.href = undefined;
  }
  validateHref(newValue) {
    if (!newValue) {
      gov_log.govErrorLog(`[${constants.NavItemClass.root}]: Parameter href is required.`);
    }
  }
  componentWillLoad() {
    this.validateHref(this.href);
  }
  render() {
    return (index.h(index.Host, { class: constants.NavItemClass.root, role: "listitem" }, index.h("a", { href: this.href, class: constants.NavItemClass.link }, index.h("slot", null))));
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "href": ["validateHref"]
  }; }
};
GovNavItem.style = govNavItemCss;

exports.gov_nav_item = GovNavItem;

//# sourceMappingURL=gov-nav-item.cjs.entry.js.map