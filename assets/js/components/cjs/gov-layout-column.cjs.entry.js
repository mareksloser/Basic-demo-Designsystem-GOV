'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const constants = require('./constants-1490a5eb.js');
const template = require('./template-4b951d1d.js');

const govLayoutColumnCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-layout-column{position:relative;display:block;width:100%}";

const GovLayoutColumn = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.h = template.govHost(this.host);
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(constants.LayoutColumnClass.root) }, index.h("slot", null)));
  }
  get host() { return index.getElement(this); }
};
GovLayoutColumn.style = govLayoutColumnCss;

exports.gov_layout_column = GovLayoutColumn;

//# sourceMappingURL=gov-layout-column.cjs.entry.js.map