import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { a as govErrorLog } from './gov.log-49da0221.js';
import { v as validateProp } from './props-a85d9c89.js';
import { W as WizardItemClass, c as WizardVariants } from './constants-2499979c.js';
import { c as createID } from './string.utils-f268fc6b.js';
import { g as govHost, b as booleanString, t as toBoolAttrIfDefined } from './template-df429738.js';
import { F as Fragment } from './Fragment-8d8d54fb.js';
import './win-1dbd3f5c.js';
import './utils-c057a3fa.js';
import './variants-2b936d58.js';
import './sizes-6c5943b4.js';

const govWizardItemCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-wizard-item{position:relative;display:block;width:100%;margin-bottom:1rem;background:var(--gov-wizard-bg-color, var(--gov-color-neutral-white))}.gov-wizard-item__header{position:relative;width:100%}.gov-wizard-item__arrow{flex:0 0 auto;width:0.75rem;height:0.75rem}.gov-wizard-item__title{margin:0;padding:0;font-family:var(--gov-font-family, \"Roboto\", sans-serif);font-weight:400;box-sizing:border-box;display:flex;gap:1rem;align-items:baseline}.gov-wizard-item__prefix{display:flex;flex:0 0 auto;justify-content:center;align-items:center;border-radius:50%;text-align:center}.gov-wizard-item__prefix .gov-icon{width:45%;height:45%}.gov-wizard-item__prefix span[slot=prefix]{display:flex;justify-content:center;align-items:center;width:100%;height:100%}.gov-wizard-item__name{display:flex;flex-direction:column}.gov-wizard-item__label{display:flex;gap:0.5rem;align-items:center;font-weight:var(--gov-wizard-title-font-weight, 700)}.gov-wizard-item__annot{color:var(--gov-color-secondary)}.gov-wizard-item__content>*:last-child{margin-bottom:0}.gov-wizard-item[variant=primary] .gov-wizard-item__header{color:var(--gov-wizard-primary-color, var(--gov-color-primary-800))}.gov-wizard-item[variant=primary] .gov-wizard-item__prefix{background:var(--gov-wizard-primary-indicator-bg, var(--gov-color-primary-300));color:var(--gov-wizard-primary-indicator-color, var(--gov-color-primary-800))}.gov-wizard-item[variant=secondary] .gov-wizard-item__header{color:var(--gov-wizard-secondary-color, var(--gov-color-secondary-700))}.gov-wizard-item[variant=secondary] .gov-wizard-item__prefix{background:var(--gov-wizard-secondary-indicator-bg, var(--gov-color-secondary-400));color:var(--gov-wizard-secondary-indicator-color, var(--gov-color-secondary-700))}.gov-wizard-item[variant=success] .gov-wizard-item__header{color:var(--gov-wizard-success-color, var(--gov-color-success-500))}.gov-wizard-item[variant=success] .gov-wizard-item__prefix{background:var(--gov-wizard-success-indicator-bg, var(--gov-color-success));color:var(--gov-wizard-success-indicator-color, var(--gov-color-neutral-white))}.gov-wizard-item[variant=error] .gov-wizard-item__header{color:var(--gov-wizard-error-color, var(--gov-color-error-500))}.gov-wizard-item[variant=error] .gov-wizard-item__prefix{background:var(--gov-wizard-error-indicator-bg, var(--gov-color-error));color:var(--gov-wizard-error-indicator-color, var(--gov-color-neutral-white))}.gov-wizard-item[variant=warning] .gov-wizard-item__header{color:var(--gov-wizard-warning-color, var(--gov-color-warning-500))}.gov-wizard-item[variant=warning] .gov-wizard-item__prefix{background:var(--gov-wizard-warning-indicator-bg, var(--gov-color-warning));color:var(--gov-wizard-warning-indicator-color, var(--gov-color-neutral-white))}.gov-wizard-item__header{gap:1rem;padding:1rem;border-radius:0;text-align:left;transition:150ms linear color}.gov-wizard-item__header:focus{outline:none}.gov-wizard-item__header:focus-visible{border-radius:var(--gov-border-radius, 0.1875rem);outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base);outline-offset:0}.gov-wizard-item__prefix{position:absolute;left:1rem}.gov-wizard-item__header[aria-expanded=true] .gov-wizard-item__label .gov-icon{transform:scale(-1)}.gov-wizard-item[size=xs] .gov-wizard-item__title,.gov-wizard-item[size=s] .gov-wizard-item__title,.gov-wizard-item[size=m] .gov-wizard-item__title{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing)}.gov-wizard-item[size=xs] .gov-wizard-item__annot,.gov-wizard-item[size=s] .gov-wizard-item__annot,.gov-wizard-item[size=m] .gov-wizard-item__annot{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing)}.gov-wizard-item[size=xs] .gov-wizard-item__prefix,.gov-wizard-item[size=s] .gov-wizard-item__prefix,.gov-wizard-item[size=m] .gov-wizard-item__prefix{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);width:var(--gov-wizard-xs-indicator-size, 1.5rem);height:var(--gov-wizard-xs-indicator-size, 1.5rem);top:var(--gov-wizard-xs-top, 1rem)}.gov-wizard-item[size=xs] .gov-wizard-item__prefix+.gov-wizard-item__header,.gov-wizard-item[size=s] .gov-wizard-item__prefix+.gov-wizard-item__header,.gov-wizard-item[size=m] .gov-wizard-item__prefix+.gov-wizard-item__header{padding:var(--gov-wizard-xs-header-padding, 1rem 1rem 1rem 3.5rem)}.gov-wizard-item[size=xs] .gov-wizard-item__content,.gov-wizard-item[size=s] .gov-wizard-item__content,.gov-wizard-item[size=m] .gov-wizard-item__content{padding:var(--gov-wizard-content-padding, 0rem 1rem 1rem 1rem)}@media not all and (pointer: coarse){.gov-wizard-item[variant=primary][collapsible=\"\"] .gov-wizard-item__header:hover,.gov-wizard-item[variant=primary][collapsible=true i] .gov-wizard-item__header:hover,.gov-wizard-item[variant=primary][collapsible=\"1\"] .gov-wizard-item__header:hover{color:var(--gov-wizard-primary-hover-color, var(--gov-color-primary-900))}}@media not all and (pointer: coarse){.gov-wizard-item[variant=secondary][collapsible=\"\"] .gov-wizard-item__header:hover,.gov-wizard-item[variant=secondary][collapsible=true i] .gov-wizard-item__header:hover,.gov-wizard-item[variant=secondary][collapsible=\"1\"] .gov-wizard-item__header:hover{color:var(--gov-wizard-secondary-hover-color, var(--gov-color-secondary-800))}}@media not all and (pointer: coarse){.gov-wizard-item[variant=success][collapsible=\"\"] .gov-wizard-item__header:hover,.gov-wizard-item[variant=success][collapsible=true i] .gov-wizard-item__header:hover,.gov-wizard-item[variant=success][collapsible=\"1\"] .gov-wizard-item__header:hover{color:var(--gov-wizard-success-hover-color, var(--gov-color-success-600))}}@media not all and (pointer: coarse){.gov-wizard-item[variant=error][collapsible=\"\"] .gov-wizard-item__header:hover,.gov-wizard-item[variant=error][collapsible=true i] .gov-wizard-item__header:hover,.gov-wizard-item[variant=error][collapsible=\"1\"] .gov-wizard-item__header:hover{color:var(--gov-wizard-error-hover-color, var(--gov-color-error-600))}}@media not all and (pointer: coarse){.gov-wizard-item[variant=warning][collapsible=\"\"] .gov-wizard-item__header:hover,.gov-wizard-item[variant=warning][collapsible=true i] .gov-wizard-item__header:hover,.gov-wizard-item[variant=warning][collapsible=\"1\"] .gov-wizard-item__header:hover{color:var(--gov-wizard-warning-hover-color, var(--gov-color-warning-600))}}button.gov-wizard-item__header{display:inline-flex;vertical-align:middle;justify-content:center;align-items:center;border:0;background-color:transparent;text-align:center;text-decoration:none;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;justify-content:flex-start;text-align:left}button.gov-wizard-item__header:focus{outline:none}@media (min-width: 30em){.gov-wizard-item[size=s] .gov-wizard-item__title,.gov-wizard-item[size=m] .gov-wizard-item__title{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing)}.gov-wizard-item[size=s] .gov-wizard-item__prefix,.gov-wizard-item[size=m] .gov-wizard-item__prefix{font-weight:var(--gov-text-xl-font-weight);font-size:var(--gov-text-xl-font-size);line-height:var(--gov-text-xl-line-height);letter-spacing:var(--gov-text-xl-letter-spacing);width:var(--gov-wizard-s-indicator-size, 2rem);height:var(--gov-wizard-s-indicator-size, 2rem);top:var(--gov-wizard-s-top, 0.8125rem)}.gov-wizard-item[size=s] .gov-wizard-item__prefix+.gov-wizard-item__header,.gov-wizard-item[size=m] .gov-wizard-item__prefix+.gov-wizard-item__header{padding:var(--gov-wizard-s-header-padding, 1rem 1rem 1rem 4rem)}}@media (min-width: 48em){.gov-wizard-item[size=m] .gov-wizard-item__title{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing)}.gov-wizard-item[size=m] .gov-wizard-item__prefix{font-weight:var(--gov-text-xl-font-weight);font-size:var(--gov-text-xl-font-size);line-height:var(--gov-text-xl-line-height);letter-spacing:var(--gov-text-xl-letter-spacing);width:var(--gov-wizard-m-indicator-size, 2.5rem);height:var(--gov-wizard-m-indicator-size, 2.5rem);top:var(--gov-wizard-m-top, 0.5625rem)}.gov-wizard-item[size=m] .gov-wizard-item__prefix+.gov-wizard-item__header{padding:var(--gov-wizard-m-header-padding, 1rem 1rem 1rem 4.5rem)}.gov-wizard-item[size=xs] .gov-wizard-item__content{padding:var(--gov-wizard-xs-content-padding, 0rem 1rem 1rem 3.5rem)}.gov-wizard-item[size=s] .gov-wizard-item__content{padding:var(--gov-wizard-s-content-padding, 0rem 1rem 1rem 4rem)}.gov-wizard-item[size=m] .gov-wizard-item__content{padding:var(--gov-wizard-m-content-padding, 0rem 1rem 1rem 4.5rem)}}";

var Tags;
(function (Tags) {
  Tags["DIV"] = "div";
  Tags["BUTTON"] = "button";
})(Tags || (Tags = {}));
const GovWizardItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govChange = createEvent(this, "gov-change", 7);
    this.variant = "primary";
    this.size = "m";
    this.identifier = undefined;
    this.collapsible = false;
    this.annotation = undefined;
    this.label = undefined;
    this.disabled = false;
    this.isExpanded = false;
    this.labelTag = "h3";
    this.h = govHost(this.host);
    this.triggerId = createID("GovWizardItem");
    this.contentId = createID("GovWizardContent");
  }
  validateLabel(newValue) {
    if (!newValue) {
      govErrorLog(`[${WizardItemClass.root}]: Parameter label is required.`);
    }
  }
  validateTriggerTag(newValue) {
    const validTags = ["h1", "h2", "h3", "h4", "h5", "h6", "span"];
    if (newValue) {
      if (!validTags.includes(newValue)) {
        govErrorLog(`[${WizardItemClass.root}]: Tag ${newValue} is not allowed.`);
      }
    }
  }
  validateVariant(newValue) {
    validateProp(WizardVariants, newValue, WizardItemClass.root);
  }
  emmitChange() {
    this.govChange.emit({ expanded: this.isExpanded, component: WizardItemClass.root });
  }
  componentWillLoad() {
    this.validateLabel(this.label);
    this.validateVariant(this.variant);
    this.validateTriggerTag(this.labelTag);
  }
  render() {
    const triggerId = this.identifier || this.triggerId;
    const LabelTag = this.labelTag;
    const Tag = this.collapsible ? Tags.BUTTON : Tags.DIV;
    const prefixSlot = this.h.hasSlot("prefix") && (h("span", { class: WizardItemClass.prefix }, h("slot", { name: "prefix" })));
    const label = (h(LabelTag, { class: WizardItemClass.title }, h("span", { class: WizardItemClass.name }, h("span", { class: WizardItemClass.label }, h("span", null, this.label), this.collapsible && h("gov-icon", { class: WizardItemClass.arrow, name: "chevron-down" })), this.annotation && h("span", { class: WizardItemClass.annot }, this.annotation))));
    return (h(Host, { class: this.h.classes(WizardItemClass.root), "is-expanded": this.isExpanded, variant: this.variant, size: this.size, role: "listitem", collapsible: this.collapsible }, this.collapsible ? (h(Fragment, null, prefixSlot, h(Tag, { id: triggerId, class: WizardItemClass.header, "aria-expanded": booleanString(this.isExpanded), "aria-controls": this.contentId, disabled: this.disabled, "aria-disabled": toBoolAttrIfDefined(this.disabled), onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.collapsible ? this.toggle() : false;
      } }, label))) : (h(Fragment, null, prefixSlot, h("div", { class: WizardItemClass.header }, label))), this.collapsible ? (h("div", { class: WizardItemClass.content, id: this.contentId, "aria-hidden": booleanString(!this.isExpanded), hidden: !this.isExpanded, "aria-labelledby": triggerId }, h("slot", null))) : (h("div", { class: WizardItemClass.content, "aria-hidden": booleanString(!this.isExpanded), hidden: !this.isExpanded }, h("slot", null)))));
  }
  /**
   * Opening the Wizard
   */
  async open() {
    this.isExpanded = true;
    this.emmitChange();
  }
  /**
   * Closing the Wizard
   */
  async close() {
    this.isExpanded = false;
    this.emmitChange();
  }
  /**
   * Wizard switch
   */
  async toggle() {
    this.isExpanded = !this.isExpanded;
    this.emmitChange();
  }
  /**
   * Returns the current state of the component
   */
  async currentState() {
    return this.isExpanded;
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "label": ["validateLabel"],
    "labelTag": ["validateTriggerTag"],
    "variant": ["validateVariant"]
  }; }
};
GovWizardItem.style = govWizardItemCss;

export { GovWizardItem as gov_wizard_item };

//# sourceMappingURL=gov-wizard-item.entry.js.map