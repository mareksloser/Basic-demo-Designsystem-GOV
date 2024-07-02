'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const template = require('./template-4b951d1d.js');

const TileClass = {
  root: 'gov-tile',
  icon: 'gov-tile__icon',
  arrow: 'gov-tile__arrow',
  title: 'gov-tile__title',
  link: 'gov-tile__link',
  content: 'gov-tile__content',
  heading: 'gov-tile__heading',
};

const govTileCss = ".gov-tile__title::before{content:\"\";position:absolute;top:0;right:0;bottom:0;left:0;z-index:1}.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-tile{position:relative;display:block;width:100%;padding:0.75rem;transition:background-color 150ms}.gov-tile__icon{display:block;margin:0rem 0rem 1.5rem;color:var(--gov-tile-main-color, var(--gov-color-primary))}.gov-tile__icon .gov-icon{width:2.5rem;height:2.5rem}.gov-tile__title{display:flex;gap:0.5rem;justify-content:space-between;align-items:flex-start;color:var(--gov-tile-main-color, var(--gov-color-primary));text-decoration:none;margin-bottom:0.5rem}.gov-tile__title [slot=title]{font-weight:var(--gov-text-xl-font-weight);font-size:var(--gov-text-xl-font-size);line-height:var(--gov-text-xl-line-height);letter-spacing:var(--gov-text-xl-letter-spacing);margin:0}.gov-tile__arrow{flex:0 0 auto;width:1.25rem;height:1.25rem;position:relative;top:0.3125rem;color:inherit}.gov-tile__content{color:var(--gov-tile-text-color, var(--gov-color-secondary-700))}.gov-tile__content>*:last-child{margin-bottom:0}.gov-tile__content a{position:relative;z-index:1}.gov-tile__link{display:block;text-decoration:none}@media not all and (pointer: coarse){.gov-tile[href]:hover{background:var(--gov-tile-hover-bg, var(--gov-color-primary-200))}.gov-tile[href]:hover .gov-tile__title{color:var(--gov-tile-main-color, var(--gov-color-primary))}}@media (min-width: 48em){.gov-tile{padding:1.5rem}.gov-tile__icon{margin:0rem 0rem 1.5rem}.gov-tile__icon .gov-icon{width:3rem;height:3rem}}";

const GovTile = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.href = undefined;
    this.target = undefined;
    this.h = template.govHost(this.host);
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(TileClass.root) }, this.href ? (index.h("a", { href: this.href, target: this.target, class: TileClass.link, ref: el => (this.triggerRef = el) }, this.h.hasSlot("icon") && (index.h("span", { class: TileClass.icon }, index.h("slot", { name: "icon" }))), this.h.hasSlot("title") && (index.h("span", { class: TileClass.title }, index.h("slot", { name: "title" }), index.h("gov-icon", { class: TileClass.arrow, name: "chevron-right" }))), index.h("div", { class: TileClass.content }, index.h("slot", null)))) : (index.h("span", null, this.h.hasSlot("icon") && (index.h("span", { class: TileClass.icon }, index.h("slot", { name: "icon" }))), this.h.hasSlot("title") && (index.h("span", { class: TileClass.title }, index.h("slot", { name: "title" }))), index.h("div", { class: TileClass.content }, index.h("slot", null))))));
  }
  /**
   * Returns a clickable element instance
   */
  async getTriggerRef() {
    return this.triggerRef;
  }
  get host() { return index.getElement(this); }
};
GovTile.style = govTileCss;

exports.gov_tile = GovTile;

//# sourceMappingURL=gov-tile.cjs.entry.js.map