import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { c as createID } from './string.utils-f268fc6b.js';
import { g as govHost, t as toBoolAttrIfDefined } from './template-df429738.js';
import { T as TabsItemClass } from './constants-6df4edc4.js';
import './variants-2b936d58.js';
import './utils-c057a3fa.js';

const govTabsItemCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-tabs-item{color:var(--gov-tabs-text-color, var(--gov-color-secondary-700))}.gov-tabs-item__inner>*:last-child{margin-bottom:0}";

const GovTabsItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.identifier = undefined;
    this.triggerIdentifier = undefined;
    this.label = undefined;
    this.default = false;
    this.isActive = false;
    this.h = govHost(this.host);
    this.contentId = createID('GovTabContent');
    this.triggerId = createID('GovTabTrigger');
  }
  render() {
    return (h(Host, { class: this.h.classes(TabsItemClass.root), default: this.default }, h("div", { class: TabsItemClass.inner, role: "tabpanel", id: this.identifier || this.contentId, hidden: !this.isActive, "aria-labelledby": this.triggerIdentifier || this.triggerId, "aria-hidden": toBoolAttrIfDefined(!this.isActive) }, h("slot", null))));
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
  get host() { return getElement(this); }
};
GovTabsItem.style = govTabsItemCss;

export { GovTabsItem as gov_tabs_item };

//# sourceMappingURL=gov-tabs-item.entry.js.map