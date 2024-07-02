'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const form = require('./form-74063d50.js');
const template = require('./template-4b951d1d.js');
const string_utils = require('./string.utils-0f08c48c.js');
require('./sizes-79872c2a.js');
require('./utils-c9b1bba3.js');
require('./variants-f5ffeef3.js');
require('./constants-caad94b4.js');
require('./constants-6df82618.js');
require('./constants-97eea364.js');

const govFormControlCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-control__holder{display:flex;flex-direction:column;padding:0;border:none}.gov-form-control__bottom>*:last-child{margin-bottom:0}.gov-form-control__bottom>:first-child{margin-top:0.25rem}.gov-form-control .gov-form-label .gov-form-label__label{margin:0rem 0rem 0.25rem}.gov-form-control[type=file] .gov-form-label[slot=top] .gov-form-label__label{margin:0rem 0rem 0.5rem}.gov-form-control[type=file] .gov-form-control__bottom>:first-child{margin-top:0.5rem}.gov-form-control[size=xs][type=checkbox] .gov-form-control__holder>.gov-form-control__bottom>:first-child,.gov-form-control[size=xs][type=radio] .gov-form-control__holder>.gov-form-control__bottom>:first-child{margin-top:var(--gov-form-checkbox-core-xs-message-gap, 0.5rem);margin-left:calc(var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem) + var(--gov-form-checkbox-core-xs-gap, 0.75rem))}.gov-form-control[size=s][type=checkbox] .gov-form-control__holder>.gov-form-control__bottom>:first-child,.gov-form-control[size=s][type=radio] .gov-form-control__holder>.gov-form-control__bottom>:first-child{margin-top:var(--gov-form-checkbox-core-s-message-gap, 0.5rem);margin-left:calc(var(--gov-form-checkbox-core-s-indicator-size, 1.375rem) + var(--gov-form-checkbox-core-s-gap, 0.75rem))}.gov-form-control[size=m][type=checkbox] .gov-form-control__holder>.gov-form-control__bottom>:first-child,.gov-form-control[size=m][type=radio] .gov-form-control__holder>.gov-form-control__bottom>:first-child{margin-top:var(--gov-form-checkbox-core-m-message-gap, 0.75rem);margin-left:calc(var(--gov-form-checkbox-core-m-indicator-size, 1.5rem) + var(--gov-form-checkbox-core-m-gap, 1rem))}.gov-form-control[size=l][type=checkbox] .gov-form-control__holder>.gov-form-control__bottom>:first-child,.gov-form-control[size=l][type=radio] .gov-form-control__holder>.gov-form-control__bottom>:first-child{margin-top:var(--gov-form-checkbox-core-l-message-gap, 0.75rem);margin-left:calc(var(--gov-form-checkbox-core-l-indicator-size, 2rem) + var(--gov-form-checkbox-core-l-gap, 1rem))}.gov-form-control[size=xs][type=switch] .gov-form-control__bottom>:first-child{margin-top:var(--gov-form-switch-xs-message-gap, 0.5rem);margin-left:calc(var(--gov-form-switch-xs-indicator-height, 1.25rem) * 1.6666666667 + var(--gov-form-switch-xs-gap, 0.75rem))}.gov-form-control[size=s][type=switch] .gov-form-control__bottom>:first-child{margin-top:var(--gov-form-switch-s-message-gap, 0.5rem);margin-left:calc(var(--gov-form-switch-s-indicator-height, 1.375rem) * 1.6666666667 + var(--gov-form-switch-s-gap, 0.75rem))}.gov-form-control[size=m][type=switch] .gov-form-control__bottom>:first-child{margin-top:var(--gov-form-switch-m-message-gap, 0.75rem);margin-left:calc(var(--gov-form-switch-m-indicator-height, 1.5rem) * 1.6666666667 + var(--gov-form-switch-m-gap, 1rem))}.gov-form-control[size=l][type=switch] .gov-form-control__bottom>:first-child{margin-top:var(--gov-form-switch-l-message-gap, 0.75rem);margin-left:calc(var(--gov-form-switch-l-indicator-height, 2rem) * 1.6666666667 + var(--gov-form-switch-l-gap, 1rem))}.gov-form-control[invalid=\"\"] .gov-form-label[slot=top] .gov-form-label__label,.gov-form-control[invalid=true i] .gov-form-label[slot=top] .gov-form-label__label,.gov-form-control[invalid=\"1\"] .gov-form-label[slot=top] .gov-form-label__label{color:var(--gov-form-state-color-error, var(--gov-color-error))}.gov-form-control[disabled=\"\"] .gov-form-label__label,.gov-form-control[disabled=true i] .gov-form-label__label,.gov-form-control[disabled=\"1\"] .gov-form-label__label{pointer-events:none}";

const GovFormControl = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.gap = undefined;
    this.identifier = undefined;
    this.invalid = false;
    this.disabled = false;
    this.success = false;
    this.fieldset = false;
    this.size = "m";
    this.h = template.govHost(this.host);
    this.f = form.govForm(this.h);
    this.controlId = string_utils.createID("GovFormControl");
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
    const bottomSlot = this.host.querySelector("." + form.FormControlClass.bottom);
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
        const currentValue = string_utils.splitByWhitespace(element.getAttribute("wcag-described-by"));
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
    return (index.h(index.Host, { size: this.size, class: this.h.classes(form.FormControlClass.root) }, index.h(Tag, { class: form.FormControlClass.holder }, this.h.hasSlot("top") && index.h("slot", { name: "top" }), index.h("slot", null), this.h.hasSlot("bottom") && (index.h("div", { class: form.FormControlClass.bottom }, index.h("slot", { name: "bottom" }))))));
  }
  get host() { return index.getElement(this); }
};
GovFormControl.style = govFormControlCss;

exports.gov_form_control = GovFormControl;

//# sourceMappingURL=gov-form-control.cjs.entry.js.map