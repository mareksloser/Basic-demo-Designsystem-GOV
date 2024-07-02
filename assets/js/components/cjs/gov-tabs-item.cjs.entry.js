'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const string_utils = require('./string.utils-0f08c48c.js');
const template = require('./template-4b951d1d.js');
const constants = require('./constants-427a2843.js');
require('./variants-f5ffeef3.js');
require('./utils-c9b1bba3.js');

const govTabsItemCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-tabs-item{color:var(--gov-tabs-text-color, var(--gov-color-secondary-700))}.gov-tabs-item__inner>*:last-child{margin-bottom:0}";

const GovTabsItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.identifier = undefined;
    this.triggerIdentifier = undefined;
    this.label = undefined;
    this.default = false;
    this.isActive = false;
    this.h = template.govHost(this.host);
    this.contentId = string_utils.createID('GovTabContent');
    this.triggerId = string_utils.createID('GovTabTrigger');
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(constants.TabsItemClass.root), default: this.default }, index.h("div", { class: constants.TabsItemClass.inner, role: "tabpanel", id: this.identifier || this.contentId, hidden: !this.isActive, "aria-labelledby": this.triggerIdentifier || this.triggerId, "aria-hidden": template.toBoolAttrIfDefined(!this.isActive) }, index.h("slot", null))));
  }
  /**
   * Returns a unique tab content identifier
   */
  async getIdentifier() {
    return this.identifier || this.contentId;
  }
  /**
   * Returns a unique tab trigger identifier
   */
  async getTriggerIdentifier() {
    return this.triggerIdentifier || this.triggerId;
  }
  /**
   * Set status of tab-item
   */
  async setActiveStatus(status) {
    this.isActive = status;
  }
  get host() { return index.getElement(this); }
};
GovTabsItem.style = govTabsItemCss;

exports.gov_tabs_item = GovTabsItem;

//# sourceMappingURL=gov-tabs-item.cjs.entry.js.map