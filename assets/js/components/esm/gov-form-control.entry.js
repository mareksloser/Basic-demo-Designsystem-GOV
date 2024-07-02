import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { g as govForm, b as FormControlClass } from './form-39dc6896.js';
import { g as govHost } from './template-df429738.js';
import { c as createID, s as splitByWhitespace } from './string.utils-f268fc6b.js';
import './sizes-6c5943b4.js';
import './utils-c057a3fa.js';
import './variants-2b936d58.js';
import './constants-3df712e2.js';
import './constants-47d7a8bc.js';
import './constants-ebec7de8.js';

const govFormControlCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-control__holder{display:flex;flex-direction:column;padding:0;border:none}.gov-form-control__bottom>*:last-child{margin-bottom:0}.gov-form-control__bottom>:first-child{margin-top:0.25rem}.gov-form-control .gov-form-label .gov-form-label__label{margin:0rem 0rem 0.25rem}.gov-form-control[type=file] .gov-form-label[slot=top] .gov-form-label__label{margin:0rem 0rem 0.5rem}.gov-form-control[type=file] .gov-form-control__bottom>:first-child{margin-top:0.5rem}.gov-form-control[size=xs][type=checkbox] .gov-form-control__holder>.gov-form-control__bottom>:first-child,.gov-form-control[size=xs][type=radio] .gov-form-control__holder>.gov-form-control__bottom>:first-child{margin-top:var(--gov-form-checkbox-core-xs-message-gap, 0.5rem);margin-left:calc(var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem) + var(--gov-form-checkbox-core-xs-gap, 0.75rem))}.gov-form-control[size=s][type=checkbox] .gov-form-control__holder>.gov-form-control__bottom>:first-child,.gov-form-control[size=s][type=radio] .gov-form-control__holder>.gov-form-control__bottom>:first-child{margin-top:var(--gov-form-checkbox-core-s-message-gap, 0.5rem);margin-left:calc(var(--gov-form-checkbox-core-s-indicator-size, 1.375rem) + var(--gov-form-checkbox-core-s-gap, 0.75rem))}.gov-form-control[size=m][type=checkbox] .gov-form-control__holder>.gov-form-control__bottom>:first-child,.gov-form-control[size=m][type=radio] .gov-form-control__holder>.gov-form-control__bottom>:first-child{margin-top:var(--gov-form-checkbox-core-m-message-gap, 0.75rem);margin-left:calc(var(--gov-form-checkbox-core-m-indicator-size, 1.5rem) + var(--gov-form-checkbox-core-m-gap, 1rem))}.gov-form-control[size=l][type=checkbox] .gov-form-control__holder>.gov-form-control__bottom>:first-child,.gov-form-control[size=l][type=radio] .gov-form-control__holder>.gov-form-control__bottom>:first-child{margin-top:var(--gov-form-checkbox-core-l-message-gap, 0.75rem);margin-left:calc(var(--gov-form-checkbox-core-l-indicator-size, 2rem) + var(--gov-form-checkbox-core-l-gap, 1rem))}.gov-form-control[size=xs][type=switch] .gov-form-control__bottom>:first-child{margin-top:var(--gov-form-switch-xs-message-gap, 0.5rem);margin-left:calc(var(--gov-form-switch-xs-indicator-height, 1.25rem) * 1.6666666667 + var(--gov-form-switch-xs-gap, 0.75rem))}.gov-form-control[size=s][type=switch] .gov-form-control__bottom>:first-child{margin-top:var(--gov-form-switch-s-message-gap, 0.5rem);margin-left:calc(var(--gov-form-switch-s-indicator-height, 1.375rem) * 1.6666666667 + var(--gov-form-switch-s-gap, 0.75rem))}.gov-form-control[size=m][type=switch] .gov-form-control__bottom>:first-child{margin-top:var(--gov-form-switch-m-message-gap, 0.75rem);margin-left:calc(var(--gov-form-switch-m-indicator-height, 1.5rem) * 1.6666666667 + var(--gov-form-switch-m-gap, 1rem))}.gov-form-control[size=l][type=switch] .gov-form-control__bottom>:first-child{margin-top:var(--gov-form-switch-l-message-gap, 0.75rem);margin-left:calc(var(--gov-form-switch-l-indicator-height, 2rem) * 1.6666666667 + var(--gov-form-switch-l-gap, 1rem))}.gov-form-control[invalid=\"\"] .gov-form-label[slot=top] .gov-form-label__label,.gov-form-control[invalid=true i] .gov-form-label[slot=top] .gov-form-label__label,.gov-form-control[invalid=\"1\"] .gov-form-label[slot=top] .gov-form-label__label{color:var(--gov-form-state-color-error, var(--gov-color-error))}.gov-form-control[disabled=\"\"] .gov-form-label__label,.gov-form-control[disabled=true i] .gov-form-label__label,.gov-form-control[disabled=\"1\"] .gov-form-label__label{pointer-events:none}";

const GovFormControl = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.gap = undefined;
    this.identifier = undefined;
    this.invalid = false;
    this.disabled = false;
    this.success = false;
    this.fieldset = false;
    this.size = "m";
    this.h = govHost(this.host);
    this.f = govForm(this.h);
    this.controlId = createID("GovFormControl");
  }
  componentDidRender() {
    this.passChildAttrs();
    this.invalidChildAttrs();
    this.syncControlMessages();
    this.formElementDescriptionControl();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  passChildAttrs() {
    const formElements = [
      "gov-form-select",
      "gov-form-input",
      "gov-form-switch",
      "gov-form-checkbox",
      "gov-form-radio",
      "gov-form-multi-select",
      "gov-form-file",
      "gov-form-search",
    ];
    this.h.passChildAttr(formElements, "success", this.success);
    if (this.f.hasGroupChildren === false) {
      this.h.passChildAttr([...formElements, "gov-form-label"], "identifier", this.identifier || this.controlId);
    }
  }
  invalidChildAttrs() {
    const formElements = [
      "gov-form-select",
      "gov-form-input",
      "gov-form-switch",
      "gov-form-checkbox",
      "gov-form-radio",
      "gov-form-multi-select",
      "gov-form-file",
      "gov-form-search",
    ];
    this.h.passChildAttr(formElements, "invalid", this.invalid);
    if (this.f.hasGroupChildren === false) {
      this.h.passChildAttr([...formElements, "gov-form-label"], "identifier", this.identifier || this.controlId);
    }
  }
  formElementDescriptionControl() {
    const bottomSlot = this.host.querySelector("." + FormControlClass.bottom);
    if (!bottomSlot)
      return;
    this.observer = new MutationObserver(function () {
      this.syncControlMessages();
    }.bind(this));
    this.observer.observe(bottomSlot, { childList: true });
  }
  syncControlMessages() {
    Promise.all(this.f.messageElements.map((message) => message.identifier())).then((ids) => {
      this.f.mainElementsInControl.forEach((element) => {
        const currentValue = splitByWhitespace(element.getAttribute("wcag-described-by"));
        element.removeAttribute("wcag-described-by");
        if (Array.isArray(currentValue)) {
          currentValue.forEach(id => (id.indexOf("GovFormMessage") === -1 ? ids.push(id) : null));
        }
        if (ids.length) {
          element.setAttribute("wcag-described-by", ids.join(" "));
        }
      });
    });
  }
  render() {
    const Tag = this.fieldset ? "fieldset" : "div";
    return (h(Host, { size: this.size, class: this.h.classes(FormControlClass.root) }, h(Tag, { class: FormControlClass.holder }, this.h.hasSlot("top") && h("slot", { name: "top" }), h("slot", null), this.h.hasSlot("bottom") && (h("div", { class: FormControlClass.bottom }, h("slot", { name: "bottom" }))))));
  }
  get host() { return getElement(this); }
};
GovFormControl.style = govFormControlCss;

export { GovFormControl as gov_form_control };

//# sourceMappingURL=gov-form-control.entry.js.map