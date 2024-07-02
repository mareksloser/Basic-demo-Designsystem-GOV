'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const string_utils = require('./string.utils-0f08c48c.js');
const props = require('./props-d6146e54.js');
const form = require('./form-74063d50.js');
const template = require('./template-4b951d1d.js');
const wcag = require('./wcag-e6257f27.js');
const win = require('./win-5521073d.js');
const utils = require('./utils-c9b1bba3.js');
const Fragment = require('./Fragment-52846f79.js');
require('./gov.log-b842920d.js');
require('./sizes-79872c2a.js');
require('./variants-f5ffeef3.js');
require('./constants-caad94b4.js');
require('./constants-6df82618.js');
require('./constants-97eea364.js');

const govFormSwitchCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-switch{position:relative;display:flex}.gov-form-switch__holder{display:inline-flex}.gov-form-switch__input{position:relative;z-index:1;-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;flex-shrink:0}.gov-form-switch .gov-form-label__label{position:relative;z-index:1;margin-bottom:0;color:var(--gov-form-switch-color, var(--gov-color-secondary-800))}.gov-form-switch__indicator{position:absolute;top:0;left:0;border:var(--gov-form-switch-indicator-border, 0.0625rem solid var(--gov-color-secondary-500));background-color:var(--gov-form-switch-indicator-bg, var(--gov-color-secondary-300));transition:150ms linear background-color}.gov-form-switch__indicator::before{content:\"\";position:absolute;display:block;border-radius:50%;background-color:var(--gov-form-switch-indicator-circle-bg, var(--gov-color-neutral-white));transition:150ms linear left;box-shadow:var(--gov-form-switch-indicator-circle-box-shadow, 0 0.125rem 0.25rem rgba(0, 0, 0, 0.35))}.gov-form-switch__input:focus-visible~.gov-form-switch__indicator{outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base)}.gov-form-switch__input:checked+.gov-form-switch__indicator{border-color:var(--gov-form-switch-indicator-bg-checked, var(--gov-color-primary));background-color:var(--gov-form-switch-indicator-bg-checked, var(--gov-color-primary))}.gov-form-switch[disabled=\"\"],.gov-form-switch[disabled=true i],.gov-form-switch[disabled=\"1\"]{pointer-events:none}.gov-form-switch[disabled=\"\"] .gov-form-label__label,.gov-form-switch[disabled=true i] .gov-form-label__label,.gov-form-switch[disabled=\"1\"] .gov-form-label__label{color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600))}.gov-form-switch[disabled=\"\"] .gov-form-switch__indicator::before,.gov-form-switch[disabled=true i] .gov-form-switch__indicator::before,.gov-form-switch[disabled=\"1\"] .gov-form-switch__indicator::before{background:var(--gov-form-input-disabled-bg, var(--gov-color-secondary-300))}.gov-form-switch[disabled=\"\"] .gov-form-switch__input:checked+.gov-form-switch__indicator,.gov-form-switch[disabled=true i] .gov-form-switch__input:checked+.gov-form-switch__indicator,.gov-form-switch[disabled=\"1\"] .gov-form-switch__input:checked+.gov-form-switch__indicator{border-color:var(--gov-form-input-disabled-bg, var(--gov-color-primary-400));background-color:var(--gov-form-input-disabled-bg, var(--gov-color-primary-400))}.gov-form-switch[invalid=\"\"] .gov-form-label__label,.gov-form-switch[invalid=true i] .gov-form-label__label,.gov-form-switch[invalid=\"1\"] .gov-form-label__label{color:var(--gov-form-state-color-error, var(--gov-color-error))}.gov-form-switch[invalid=\"\"] .gov-form-switch__indicator,.gov-form-switch[invalid=true i] .gov-form-switch__indicator,.gov-form-switch[invalid=\"1\"] .gov-form-switch__indicator{border-color:var(--gov-form-state-color-error, var(--gov-color-error))}.gov-form-switch[invalid=\"\"] .gov-form-switch__input:checked+.gov-form-switch__indicator,.gov-form-switch[invalid=true i] .gov-form-switch__input:checked+.gov-form-switch__indicator,.gov-form-switch[invalid=\"1\"] .gov-form-switch__input:checked+.gov-form-switch__indicator{background-color:var(--gov-form-state-color-error, var(--gov-color-error))}.gov-form-switch[size=xs] .gov-form-label__label{font-weight:var(--gov-text-xs-font-weight);font-size:var(--gov-text-xs-font-size);line-height:var(--gov-text-xs-line-height);letter-spacing:var(--gov-text-xs-letter-spacing);margin-bottom:0}.gov-form-switch[size=xs] .gov-form-switch__holder{gap:var(--gov-form-switch-xs-gap, 0.75rem)}.gov-form-switch[size=xs] .gov-form-switch__input{width:calc(var(--gov-form-switch-xs-indicator-height, 1.25rem) * 1.6666666667);height:var(--gov-form-switch-xs-indicator-height, 1.25rem)}.gov-form-switch[size=xs] .gov-form-switch__indicator{display:block;width:calc(var(--gov-form-switch-xs-indicator-height, 1.25rem) * 1.6666666667);height:var(--gov-form-switch-xs-indicator-height, 1.25rem);border-radius:calc(var(--gov-form-switch-xs-indicator-height, 1.25rem) * 0.5)}.gov-form-switch[size=xs] .gov-form-switch__indicator::before{top:calc(var(--gov-form-switch-xs-toggle-offset, 0.051875rem) - 0.0625rem);left:calc(var(--gov-form-switch-xs-toggle-offset, 0.051875rem) - 0.0625rem);width:calc(var(--gov-form-switch-xs-indicator-height, 1.25rem) - 2 * var(--gov-form-switch-xs-toggle-offset, 0.051875rem));height:calc(var(--gov-form-switch-xs-indicator-height, 1.25rem) - 2 * var(--gov-form-switch-xs-toggle-offset, 0.051875rem))}.gov-form-switch[size=xs] .gov-form-switch__input[aria-checked]+.gov-form-switch__indicator::before{left:calc(var(--gov-form-switch-xs-indicator-height, 1.25rem) * 1.6666666667 - var(--gov-form-switch-xs-indicator-height, 1.25rem) + var(--gov-form-switch-xs-toggle-offset, 0.051875rem) - 0.0625rem)}.gov-form-switch[size=xs] label{display:inline-flex}.gov-form-switch[size=xs] label .gov-form-switch__input{width:calc(var(--gov-form-switch-xs-indicator-height, 1.25rem) * 1.6666666667)}.gov-form-switch[size=s] .gov-form-label__label{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);margin-bottom:0}.gov-form-switch[size=s] .gov-form-switch__holder{gap:var(--gov-form-switch-s-gap, 0.75rem)}.gov-form-switch[size=s] .gov-form-switch__input{width:calc(var(--gov-form-switch-s-indicator-height, 1.375rem) * 1.6666666667);height:var(--gov-form-switch-s-indicator-height, 1.375rem)}.gov-form-switch[size=s] .gov-form-switch__indicator{display:block;width:calc(var(--gov-form-switch-s-indicator-height, 1.375rem) * 1.6666666667);height:var(--gov-form-switch-s-indicator-height, 1.375rem);border-radius:calc(var(--gov-form-switch-s-indicator-height, 1.375rem) * 0.5)}.gov-form-switch[size=s] .gov-form-switch__indicator::before{top:calc(var(--gov-form-switch-s-toggle-offset, 0.0575rem) - 0.0625rem);left:calc(var(--gov-form-switch-s-toggle-offset, 0.0575rem) - 0.0625rem);width:calc(var(--gov-form-switch-s-indicator-height, 1.375rem) - 2 * var(--gov-form-switch-s-toggle-offset, 0.0575rem));height:calc(var(--gov-form-switch-s-indicator-height, 1.375rem) - 2 * var(--gov-form-switch-s-toggle-offset, 0.0575rem))}.gov-form-switch[size=s] .gov-form-switch__input[aria-checked]+.gov-form-switch__indicator::before{left:calc(var(--gov-form-switch-s-indicator-height, 1.375rem) * 1.6666666667 - var(--gov-form-switch-s-indicator-height, 1.375rem) + var(--gov-form-switch-s-toggle-offset, 0.0575rem) - 0.0625rem)}.gov-form-switch[size=s] label{display:inline-flex}.gov-form-switch[size=s] label .gov-form-switch__input{width:calc(var(--gov-form-switch-s-indicator-height, 1.375rem) * 1.6666666667)}.gov-form-switch[size=m] .gov-form-label__label{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);margin-bottom:0}.gov-form-switch[size=m] .gov-form-switch__holder{gap:var(--gov-form-switch-m-gap, 1rem)}.gov-form-switch[size=m] .gov-form-switch__input{width:calc(var(--gov-form-switch-m-indicator-height, 1.5rem) * 1.6666666667);height:var(--gov-form-switch-m-indicator-height, 1.5rem)}.gov-form-switch[size=m] .gov-form-switch__indicator{display:block;width:calc(var(--gov-form-switch-m-indicator-height, 1.5rem) * 1.6666666667);height:var(--gov-form-switch-m-indicator-height, 1.5rem);border-radius:calc(var(--gov-form-switch-m-indicator-height, 1.5rem) * 0.5)}.gov-form-switch[size=m] .gov-form-switch__indicator::before{top:calc(var(--gov-form-switch-m-toggle-offset, 0.0625rem) - 0.0625rem);left:calc(var(--gov-form-switch-m-toggle-offset, 0.0625rem) - 0.0625rem);width:calc(var(--gov-form-switch-m-indicator-height, 1.5rem) - 2 * var(--gov-form-switch-m-toggle-offset, 0.0625rem));height:calc(var(--gov-form-switch-m-indicator-height, 1.5rem) - 2 * var(--gov-form-switch-m-toggle-offset, 0.0625rem))}.gov-form-switch[size=m] .gov-form-switch__input[aria-checked]+.gov-form-switch__indicator::before{left:calc(var(--gov-form-switch-m-indicator-height, 1.5rem) * 1.6666666667 - var(--gov-form-switch-m-indicator-height, 1.5rem) + var(--gov-form-switch-m-toggle-offset, 0.0625rem) - 0.0625rem)}.gov-form-switch[size=m] label{display:inline-flex}.gov-form-switch[size=m] label .gov-form-switch__input{width:calc(var(--gov-form-switch-m-indicator-height, 1.5rem) * 1.6666666667)}.gov-form-switch[size=l] .gov-form-label__label{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);margin-bottom:0}.gov-form-switch[size=l] .gov-form-switch__holder{gap:var(--gov-form-switch-l-gap, 1rem)}.gov-form-switch[size=l] .gov-form-switch__input{width:calc(var(--gov-form-switch-l-indicator-height, 2rem) * 1.6666666667);height:var(--gov-form-switch-l-indicator-height, 2rem)}.gov-form-switch[size=l] .gov-form-switch__indicator{display:block;width:calc(var(--gov-form-switch-l-indicator-height, 2rem) * 1.6666666667);height:var(--gov-form-switch-l-indicator-height, 2rem);border-radius:calc(var(--gov-form-switch-l-indicator-height, 2rem) * 0.5)}.gov-form-switch[size=l] .gov-form-switch__indicator::before{top:calc(var(--gov-form-switch-l-toggle-offset, 0.083125rem) - 0.0625rem);left:calc(var(--gov-form-switch-l-toggle-offset, 0.083125rem) - 0.0625rem);width:calc(var(--gov-form-switch-l-indicator-height, 2rem) - 2 * var(--gov-form-switch-l-toggle-offset, 0.083125rem));height:calc(var(--gov-form-switch-l-indicator-height, 2rem) - 2 * var(--gov-form-switch-l-toggle-offset, 0.083125rem))}.gov-form-switch[size=l] .gov-form-switch__input[aria-checked]+.gov-form-switch__indicator::before{left:calc(var(--gov-form-switch-l-indicator-height, 2rem) * 1.6666666667 - var(--gov-form-switch-l-indicator-height, 2rem) + var(--gov-form-switch-l-toggle-offset, 0.083125rem) - 0.0625rem)}.gov-form-switch[size=l] label{display:inline-flex}.gov-form-switch[size=l] label .gov-form-switch__input{width:calc(var(--gov-form-switch-l-indicator-height, 2rem) * 1.6666666667)}";

const GovFormSwitch = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govFocus = index.createEvent(this, "gov-focus", 7);
    this.govBlur = index.createEvent(this, "gov-blur", 7);
    this.govChange = index.createEvent(this, "gov-change", 7);
    this.value = undefined;
    this.noLabel = false;
    this.checked = false;
    this.required = false;
    this.disabled = false;
    this.name = undefined;
    this.size = "m";
    this.identifier = undefined;
    this.invalid = undefined;
    this.wcagDescribedBy = undefined;
    this.wcagLabelledBy = undefined;
    this.checkboxId = string_utils.createID("GovCheckbox");
    this.h = template.govHost(this.host);
    this.f = form.govForm(this.h);
  }
  validateSize(newValue) {
    props.validateProp(form.FormSwitchSizes, newValue, form.FormSwitchClass.root);
  }
  watchDisabled() {
    this.passControlAttrs();
  }
  passControlAttrs() {
    this.f.passAttrToControl("size", this.size);
    this.f.passAttrToControl("invalid", template.toBoolAttr(this.invalid));
    this.f.passAttrToControl("type", "switch");
  }
  componentWillLoad() {
    this.passControlAttrs();
  }
  async componentDidRender() {
    this.f.passAttrToLabel("identifier", this.identifier || this.checkboxId);
    this.f.passAttrToLabel("required", String(this.required));
    if (win.canValidateWcagOnRender()) {
      await utils.delay(500);
      await this.validateWcag();
    }
  }
  render() {
    const wrapCheckbox = (children) => {
      if (this.noLabel) {
        return (index.h("label", null, children));
      }
      return children;
    };
    return (index.h(index.Host, { class: this.h.classes(form.FormSwitchClass.root), checked: this.checked, size: this.size, invalid: template.toBoolAttrIfDefined(this.invalid) }, index.h("div", { class: form.FormSwitchClass.holder }, wrapCheckbox(index.h(Fragment.Fragment, null, index.h("input", { class: form.FormSwitchClass.input, id: this.identifier || this.checkboxId, type: "checkbox", value: this.value, name: this.name, disabled: this.disabled, checked: this.checked, onClick: this.onClickHandler.bind(this), onChange: this.onChangeHandler.bind(this), onFocus: this.onFocusHandler.bind(this), onBlur: this.onBlurHandler.bind(this), ref: el => (this.inputRef = el), required: this.required, "aria-checked": this.checked, "aria-required": template.toBoolAttrIfDefined(this.required), "aria-invalid": template.toBoolAttrIfDefined(this.invalid), "aria-describedby": this.wcagDescribedBy, "aria-labelledby": this.wcagLabelledBy, "aria-disabled": template.toBoolAttrIfDefined(this.disabled) }), index.h("span", { class: form.FormSwitchClass.indicator }), index.h("slot", { name: "label" }))))));
  }
  onClickHandler(e) {
    e.stopPropagation();
  }
  onFocusHandler(e) {
    e.stopPropagation();
    this.govFocus.emit({
      component: form.FormSwitchClass.root,
      checked: this.checked,
      value: this.value,
      originalEvent: e,
    });
  }
  onBlurHandler(e) {
    e.stopPropagation();
    this.govBlur.emit({
      component: form.FormSwitchClass.root,
      checked: this.checked,
      value: this.value,
      originalEvent: e,
    });
  }
  onChangeHandler(e) {
    this.checked = e.target.checked;
    e.stopPropagation();
    this.govChange.emit({
      component: form.FormSwitchClass.root,
      checked: this.checked,
      value: this.value,
      originalEvent: e,
    });
  }
  /**
   * Returns the reference of the native element
   */
  async getRef() {
    return this.inputRef;
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    wcag.validateWcagRef(this.wcagDescribedBy, "wcag-described-by", form.FormSwitchClass.root);
    wcag.validateWcagRef(this.wcagLabelledBy, "wcag-labelled-by", form.FormSwitchClass.root);
    wcag.validateWcagLabelFor(this.identifier || this.checkboxId, this.wcagLabelledBy, form.FormSwitchClass.root);
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "size": ["validateSize", "watchDisabled"],
    "disabled": ["watchDisabled"],
    "invalid": ["watchDisabled"]
  }; }
};
GovFormSwitch.style = govFormSwitchCss;

exports.gov_form_switch = GovFormSwitch;

//# sourceMappingURL=gov-form-switch.cjs.entry.js.map