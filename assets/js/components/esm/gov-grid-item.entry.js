import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { a as GridItemClass } from './constants-2b14bb01.js';
import { g as govHost } from './template-df429738.js';

const govGridItemCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-grid-item{border:0 solid transparent;-o-border-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E\");border-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E\")}.gov-grid-item[size=\"1/12\"]{width:8.3333333333%}.gov-grid-item[size=\"2/12\"]{width:16.6666666667%}.gov-grid-item[size=\"3/12\"]{width:25%}.gov-grid-item[size=\"4/12\"]{width:33.3333333333%}.gov-grid-item[size=\"5/12\"]{width:41.6666666667%}.gov-grid-item[size=\"6/12\"]{width:50%}.gov-grid-item[size=\"7/12\"]{width:58.3333333333%}.gov-grid-item[size=\"8/12\"]{width:66.6666666667%}.gov-grid-item[size=\"9/12\"]{width:75%}.gov-grid-item[size=\"10/12\"]{width:83.3333333333%}.gov-grid-item[size=\"11/12\"]{width:91.6666666667%}.gov-grid-item[size=\"12/12\"]{width:100%}@media (min-width: 30em){.gov-grid-item[size-sm=\"1/12\"]{width:8.3333333333%}.gov-grid-item[size-sm=\"2/12\"]{width:16.6666666667%}.gov-grid-item[size-sm=\"3/12\"]{width:25%}.gov-grid-item[size-sm=\"4/12\"]{width:33.3333333333%}.gov-grid-item[size-sm=\"5/12\"]{width:41.6666666667%}.gov-grid-item[size-sm=\"6/12\"]{width:50%}.gov-grid-item[size-sm=\"7/12\"]{width:58.3333333333%}.gov-grid-item[size-sm=\"8/12\"]{width:66.6666666667%}.gov-grid-item[size-sm=\"9/12\"]{width:75%}.gov-grid-item[size-sm=\"10/12\"]{width:83.3333333333%}.gov-grid-item[size-sm=\"11/12\"]{width:91.6666666667%}.gov-grid-item[size-sm=\"12/12\"]{width:100%}}@media (min-width: 48em){.gov-grid-item[size-md=\"1/12\"]{width:8.3333333333%}.gov-grid-item[size-md=\"2/12\"]{width:16.6666666667%}.gov-grid-item[size-md=\"3/12\"]{width:25%}.gov-grid-item[size-md=\"4/12\"]{width:33.3333333333%}.gov-grid-item[size-md=\"5/12\"]{width:41.6666666667%}.gov-grid-item[size-md=\"6/12\"]{width:50%}.gov-grid-item[size-md=\"7/12\"]{width:58.3333333333%}.gov-grid-item[size-md=\"8/12\"]{width:66.6666666667%}.gov-grid-item[size-md=\"9/12\"]{width:75%}.gov-grid-item[size-md=\"10/12\"]{width:83.3333333333%}.gov-grid-item[size-md=\"11/12\"]{width:91.6666666667%}.gov-grid-item[size-md=\"12/12\"]{width:100%}}@media (min-width: 64em){.gov-grid-item[size-lg=\"1/12\"]{width:8.3333333333%}.gov-grid-item[size-lg=\"2/12\"]{width:16.6666666667%}.gov-grid-item[size-lg=\"3/12\"]{width:25%}.gov-grid-item[size-lg=\"4/12\"]{width:33.3333333333%}.gov-grid-item[size-lg=\"5/12\"]{width:41.6666666667%}.gov-grid-item[size-lg=\"6/12\"]{width:50%}.gov-grid-item[size-lg=\"7/12\"]{width:58.3333333333%}.gov-grid-item[size-lg=\"8/12\"]{width:66.6666666667%}.gov-grid-item[size-lg=\"9/12\"]{width:75%}.gov-grid-item[size-lg=\"10/12\"]{width:83.3333333333%}.gov-grid-item[size-lg=\"11/12\"]{width:91.6666666667%}.gov-grid-item[size-lg=\"12/12\"]{width:100%}}@media (min-width: 75em){.gov-grid-item[size-xl=\"1/12\"]{width:8.3333333333%}.gov-grid-item[size-xl=\"2/12\"]{width:16.6666666667%}.gov-grid-item[size-xl=\"3/12\"]{width:25%}.gov-grid-item[size-xl=\"4/12\"]{width:33.3333333333%}.gov-grid-item[size-xl=\"5/12\"]{width:41.6666666667%}.gov-grid-item[size-xl=\"6/12\"]{width:50%}.gov-grid-item[size-xl=\"7/12\"]{width:58.3333333333%}.gov-grid-item[size-xl=\"8/12\"]{width:66.6666666667%}.gov-grid-item[size-xl=\"9/12\"]{width:75%}.gov-grid-item[size-xl=\"10/12\"]{width:83.3333333333%}.gov-grid-item[size-xl=\"11/12\"]{width:91.6666666667%}.gov-grid-item[size-xl=\"12/12\"]{width:100%}}";

const GovGridItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.size = '12/12';
    this.sizeSm = undefined;
    this.sizeMd = undefined;
    this.sizeLg = undefined;
    this.sizeXl = undefined;
    this.h = govHost(this.host);
  }
  render() {
    return (h(Host, { class: this.h.classes(GridItemClass.root), role: "listitem", size: this.size, "size-sm": this.sizeSm, "size-md": this.sizeMd, "size-lg": this.sizeLg, "size-xl": this.sizeXl }, h("slot", null)));
  }
  get host() { return getElement(this); }
};
GovGridItem.style = govGridItemCss;

export { GovGridItem as gov_grid_item };

//# sourceMappingURL=gov-grid-item.entry.js.map