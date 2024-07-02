import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { G as GridClass } from './constants-2b14bb01.js';
import { g as govHost } from './template-df429738.js';

const govGridCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-grid{position:relative;display:flex;width:100%;flex-wrap:wrap}.gov-grid[align-x=middle]{align-items:center}.gov-grid[align-x=bottom]{align-items:flex-end}.gov-grid[align-y=center]{justify-content:center}.gov-grid[align-y=right]{justify-content:flex-end}.gov-grid[align-y=space-between]{justify-content:space-between}.gov-grid[align-y=space-around]{justify-content:space-around}";

const GovGrid = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.alignX = undefined;
    this.alignY = undefined;
    this.h = govHost(this.host);
  }
  // vertical / horizontal align
  render() {
    return (h(Host, { class: this.h.classes(GridClass.root), "align-x": this.alignX, "align-y": this.alignY, role: "list" }, h("slot", null)));
  }
  get host() { return getElement(this); }
};
GovGrid.style = govGridCss;

export { GovGrid as gov_grid };

//# sourceMappingURL=gov-grid.entry.js.map