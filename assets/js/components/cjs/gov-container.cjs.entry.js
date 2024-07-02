'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const template = require('./template-4b951d1d.js');

const ContainerClass = {
  root: 'gov-container',
};

const govContainerCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-container{display:block;width:100%;max-width:calc(var(--gov-container-width, 73.75rem) + 2 * var(--gov-container-padding, 2.5rem));margin-right:auto;margin-left:auto;padding-right:var(--gov-container-padding-mobile, 1.25rem);padding-left:var(--gov-container-padding-mobile, 1.25rem)}@media (min-width: 48em){.gov-container{padding-right:var(--gov-container-padding, 2.5rem);padding-left:var(--gov-container-padding, 2.5rem)}}";

const GovContainer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.h = template.govHost(this.host);
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(ContainerClass.root) }, index.h("slot", null)));
  }
  /**
   * Returns slotted children
   *
   * @return {Promise<Node[]>}
   */
  async slottedChildren() {
    return Promise.resolve(template.slottedChildren(this.host));
  }
  get host() { return index.getElement(this); }
};
GovContainer.style = govContainerCss;

exports.gov_container = GovContainer;

//# sourceMappingURL=gov-container.cjs.entry.js.map