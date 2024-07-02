import { r as registerInstance, c as createEvent, h, a as Host } from './index-eb59f132.js';
import { F as FormLabelClass } from './constants-ebec7de8.js';
import './utils-c057a3fa.js';
import './sizes-6c5943b4.js';

const govFormLabelCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-label{position:relative;display:flex;width:100%}.gov-form-label__label{display:inline-block;color:var(--gov-form-label-color, #686868);cursor:pointer;box-sizing:border-box}.gov-form-label[legend=\"\"] .gov-form-label__label,.gov-form-label[legend=true i] .gov-form-label__label,.gov-form-label[legend=\"1\"] .gov-form-label__label{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);margin-bottom:1rem;padding:0;color:var(--gov-form-legend-color, #3b3b3b)}";

const GovFormLabel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govClick = createEvent(this, "gov-click", 7);
    this.identifier = undefined;
    this.size = 'm';
    this.required = false;
    this.legend = false;
  }
  render() {
    const Tag = this.legend ? 'legend' : 'label';
    return (h(Host, { class: FormLabelClass.root, size: this.size }, h(Tag, { class: FormLabelClass.label, htmlFor: this.identifier, onClick: () => this.govClick.emit() }, h("slot", null), this.required ? h("span", { class: "gov-color--error-500" }, "\u00A0*") : null)));
  }
};
GovFormLabel.style = govFormLabelCss;

export { GovFormLabel as gov_form_label };

//# sourceMappingURL=gov-form-label.entry.js.map