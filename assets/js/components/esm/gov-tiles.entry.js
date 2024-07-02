import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { g as govHost, p as prepareClasses } from './template-df429738.js';

const TilesClass = {
  root: 'gov-tiles',
};

const govTilesCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-tiles{overflow:hidden}.gov-tiles>*{margin:0 -0.0625rem -0.0625rem 0;border:0.0625rem solid var(--gov-tiles-border-color, var(--gov-color-secondary-500));border-width:0 0 0.0625rem}.gov-tiles>*:last-child{border-bottom-width:0}.gov-tiles[no-border]>*{border:none}@media (min-width: 48em){.gov-tiles{display:grid}.gov-tiles--x2{grid-template-columns:repeat(2, 1fr)}.gov-tiles--x2>*{border-width:0.0625rem 0.0625rem 0.0625rem 0}.gov-tiles--x2>*:nth-child(-n+3){border-top-width:0}.gov-tiles--x2>*:nth-child(2n+2){border-right-width:0}}@media (min-width: 48em) and (max-width: 63.99em){.gov-tiles--x3,.gov-tiles--x4{grid-template-columns:repeat(2, 1fr)}.gov-tiles--x3>*,.gov-tiles--x4>*{border-width:0.0625rem 0.0625rem 0.0625rem 0}.gov-tiles--x3>*:nth-child(-n+3),.gov-tiles--x4>*:nth-child(-n+3){border-top-width:0}.gov-tiles--x3>*:nth-child(2n+2),.gov-tiles--x4>*:nth-child(2n+2){border-right-width:0}}@media (min-width: 64em){.gov-tiles--x3{grid-template-columns:repeat(3, 1fr)}.gov-tiles--x3>*{border-width:0.0625rem 0.0625rem 0.0625rem 0}.gov-tiles--x3>*:nth-child(-n+4){border-top-width:0}.gov-tiles--x3>*:nth-child(3n+3){border-right-width:0}}@media (min-width: 64em) and (max-width: 74.99em){.gov-tiles--x4{grid-template-columns:repeat(3, 1fr)}.gov-tiles--x4>*{border-width:0.0625rem 0.0625rem 0.0625rem 0}.gov-tiles--x4>*:nth-child(-n+4){border-top-width:0}.gov-tiles--x4>*:nth-child(3n+3){border-right-width:0}}@media (min-width: 75em){.gov-tiles--x4{grid-template-columns:repeat(4, 1fr)}.gov-tiles--x4>*{border-width:0.0625rem 0.0625rem 0.0625rem 0}.gov-tiles--x4>*:nth-child(-n+5){border-top-width:0}.gov-tiles--x4>*:nth-child(4n+4){border-right-width:0}}";

const GovTiles = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.columns = 3;
    this.noBorder = false;
    this.h = govHost(this.host);
  }
  get classNames() {
    return prepareClasses([TilesClass.root, this.columns && TilesClass.root + '--x' + this.columns]);
  }
  render() {
    return (h(Host, { class: this.h.classes(this.classNames) }, h("slot", null)));
  }
  get host() { return getElement(this); }
};
GovTiles.style = govTilesCss;

export { GovTiles as gov_tiles };

//# sourceMappingURL=gov-tiles.entry.js.map