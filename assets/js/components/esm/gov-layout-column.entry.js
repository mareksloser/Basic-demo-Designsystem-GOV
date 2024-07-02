import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { a as LayoutColumnClass } from './constants-3786b01b.js';
import { g as govHost } from './template-df429738.js';

const govLayoutColumnCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-layout-column{position:relative;display:block;width:100%}";

const GovLayoutColumn = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.h = govHost(this.host);
  }
  render() {
    return (h(Host, { class: this.h.classes(LayoutColumnClass.root) }, h("slot", null)));
  }
  get host() { return getElement(this); }
};
GovLayoutColumn.style = govLayoutColumnCss;

export { GovLayoutColumn as gov_layout_column };

//# sourceMappingURL=gov-layout-column.entry.js.map