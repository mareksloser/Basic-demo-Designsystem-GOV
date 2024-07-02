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

const govFormRadioCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-radio{cursor:pointer}.gov-form-radio input{position:absolute;top:0;left:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.gov-form-radio input+span{position:relative;display:block;cursor:pointer}.gov-form-radio input+span::before{content:\"\";position:absolute;display:block;top:0;left:0;border:var(--gov-form-checkbox-border-size, 0.125rem solid var(--gov-color-primary));background-color:var(--gov-form-checkbox-background-color, var(--gov-color-neutral-white));transition:150ms linear border-color, 150ms linear background-color, 150ms linear outline-color}.gov-form-radio .gov-form-label__label{position:relative;z-index:1;width:100%}.gov-form-radio input:focus-visible+span::before{outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base)}[invalid=\"\"].gov-form-radio .gov-form-label__label,[invalid=true i].gov-form-radio .gov-form-label__label,[invalid=\"1\"].gov-form-radio .gov-form-label__label{color:var(--gov-form-state-color-error, var(--gov-color-error))}[invalid=\"\"].gov-form-radio input+span::before,[invalid=true i].gov-form-radio input+span::before,[invalid=\"1\"].gov-form-radio input+span::before{border-color:var(--gov-form-state-color-error, var(--gov-color-error))}[disabled=\"\"].gov-form-radio,[disabled=true i].gov-form-radio,[disabled=\"1\"].gov-form-radio{pointer-events:none}[disabled=\"\"].gov-form-radio .gov-form-label__label,[disabled=true i].gov-form-radio .gov-form-label__label,[disabled=\"1\"].gov-form-radio .gov-form-label__label{color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600))}[disabled=\"\"].gov-form-radio input+span::before,[disabled=true i].gov-form-radio input+span::before,[disabled=\"1\"].gov-form-radio input+span::before{border-color:var(--gov-form-input-disabled-bg, var(--gov-color-primary-400))}[size=xs].gov-form-radio{font-weight:var(--gov-text-xs-font-weight);font-size:var(--gov-text-xs-font-size);line-height:var(--gov-text-xs-line-height);letter-spacing:var(--gov-text-xs-letter-spacing);display:block;min-width:var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem);min-height:var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem)}[size=xs].gov-form-radio .gov-form-label__label{padding-top:calc((var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem) - var(--gov-text-xs-font-size) * 1.5) / 2);padding-left:calc(var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem) + var(--gov-form-checkbox-core-xs-gap, 0.75rem))}[size=xs].gov-form-radio input+span::before{width:var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem);height:var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem)}[size=s].gov-form-radio{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);display:block;min-width:var(--gov-form-checkbox-core-s-indicator-size, 1.375rem);min-height:var(--gov-form-checkbox-core-s-indicator-size, 1.375rem)}[size=s].gov-form-radio .gov-form-label__label{padding-top:calc((var(--gov-form-checkbox-core-s-indicator-size, 1.375rem) - var(--gov-text-s-font-size) * 1.5) / 2);padding-left:calc(var(--gov-form-checkbox-core-s-indicator-size, 1.375rem) + var(--gov-form-checkbox-core-s-gap, 0.75rem))}[size=s].gov-form-radio input+span::before{width:var(--gov-form-checkbox-core-s-indicator-size, 1.375rem);height:var(--gov-form-checkbox-core-s-indicator-size, 1.375rem)}[size=m].gov-form-radio{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);display:block;min-width:var(--gov-form-checkbox-core-m-indicator-size, 1.5rem);min-height:var(--gov-form-checkbox-core-m-indicator-size, 1.5rem)}[size=m].gov-form-radio .gov-form-label__label{padding-top:calc((var(--gov-form-checkbox-core-m-indicator-size, 1.5rem) - var(--gov-text-m-font-size) * 1.5) / 2);padding-left:calc(var(--gov-form-checkbox-core-m-indicator-size, 1.5rem) + var(--gov-form-checkbox-core-m-gap, 1rem))}[size=m].gov-form-radio input+span::before{width:var(--gov-form-checkbox-core-m-indicator-size, 1.5rem);height:var(--gov-form-checkbox-core-m-indicator-size, 1.5rem)}[size=l].gov-form-radio{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);display:block;min-width:var(--gov-form-checkbox-core-l-indicator-size, 2rem);min-height:var(--gov-form-checkbox-core-l-indicator-size, 2rem)}[size=l].gov-form-radio .gov-form-label__label{padding-top:calc((var(--gov-form-checkbox-core-l-indicator-size, 2rem) - var(--gov-text-l-font-size) * 1.5) / 2);padding-left:calc(var(--gov-form-checkbox-core-l-indicator-size, 2rem) + var(--gov-form-checkbox-core-l-gap, 1rem))}[size=l].gov-form-radio input+span::before{width:var(--gov-form-checkbox-core-l-indicator-size, 2rem);height:var(--gov-form-checkbox-core-l-indicator-size, 2rem)}.gov-form-radio input+span::before{border-radius:50%}.gov-form-radio input+span::after{content:\"\";position:absolute;display:block;border-radius:50%;background:var(--gov-form-radio-indicator-bg, var(--gov-color-primary));opacity:0;transition:150ms linear opacity}.gov-form-radio__label{position:relative}.gov-form-radio input:checked+span::after{opacity:1}.gov-form-radio[invalid=\"\"] input+span::after,.gov-form-radio[invalid=true i] input+span::after,.gov-form-radio[invalid=\"1\"] input+span::after{background:var(--gov-form-state-color-error, var(--gov-color-error))}.gov-form-radio[disabled=\"\"] input:checked+span::after,.gov-form-radio[disabled=true i] input:checked+span::after,.gov-form-radio[disabled=\"1\"] input:checked+span::after{background-color:var(--gov-form-input-disabled-bg, var(--gov-color-primary-400))}.gov-form-radio[size=xs] input+span::after{top:calc((var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem) - var(--gov-form-checkbox-core-xs-dot-size, 0.625rem)) / 2);left:calc((var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem) - var(--gov-form-checkbox-core-xs-dot-size, 0.625rem)) / 2);width:var(--gov-form-checkbox-core-xs-dot-size, 0.625rem);height:var(--gov-form-checkbox-core-xs-dot-size, 0.625rem)}.gov-form-radio[size=s] input+span::after{top:calc((var(--gov-form-checkbox-core-s-indicator-size, 1.375rem) - var(--gov-form-checkbox-core-s-dot-size, 0.6875rem)) / 2);left:calc((var(--gov-form-checkbox-core-s-indicator-size, 1.375rem) - var(--gov-form-checkbox-core-s-dot-size, 0.6875rem)) / 2);width:var(--gov-form-checkbox-core-s-dot-size, 0.6875rem);height:var(--gov-form-checkbox-core-s-dot-size, 0.6875rem)}.gov-form-radio[size=m] input+span::after{top:calc((var(--gov-form-checkbox-core-m-indicator-size, 1.5rem) - var(--gov-form-checkbox-core-m-dot-size, 0.75rem)) / 2);left:calc((var(--gov-form-checkbox-core-m-indicator-size, 1.5rem) - var(--gov-form-checkbox-core-m-dot-size, 0.75rem)) / 2);width:var(--gov-form-checkbox-core-m-dot-size, 0.75rem);height:var(--gov-form-checkbox-core-m-dot-size, 0.75rem)}.gov-form-radio[size=l] input+span::after{top:calc((var(--gov-form-checkbox-core-l-indicator-size, 2rem) - var(--gov-form-checkbox-core-l-dot-size, 1rem)) / 2);left:calc((var(--gov-form-checkbox-core-l-indicator-size, 2rem) - var(--gov-form-checkbox-core-l-dot-size, 1rem)) / 2);width:var(--gov-form-checkbox-core-l-dot-size, 1rem);height:var(--gov-form-checkbox-core-l-dot-size, 1rem)}";

const GovFormRadio = class {
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
    this.radioId = string_utils.createID("GovRadio");
    this.h = template.govHost(this.host);
    this.f = form.govForm(this.h);
  }
  validateSize(newValue) {
    props.validateProp(form.FormRadioSizes, newValue, form.FormRadioClass.root);
  }
  watchDisabled() {
    this.passControlAttrs();
  }
  passControlAttrs() {
    this.f.passAttrToControl("size", this.size);
    this.f.passAttrToControl("invalid", template.toBoolAttr(this.invalid));
    this.f.passAttrToControl("type", "radio");
  }
  componentWillLoad() {
    this.passControlAttrs();
  }
  async componentDidRender() {
    this.f.passAttrToLabel("identifier", this.identifier || this.radioId);
    this.f.passAttrToLabel("required", String(this.required));
    if (win.canValidateWcagOnRender()) {
      await utils.delay(500);
      await this.validateWcag();
    }
  }
  render() {
    const wrapRadio = children => {
      if (this.noLabel) {
        return index.h("label", { class: form.FormRadioClass.label }, children);
      }
      return children;
    };
    return (index.h(index.Host, { class: form.FormRadioClass.root, checked: this.checked, size: this.size, invalid: template.toBoolAttrIfDefined(this.invalid) }, index.h("div", { class: form.FormRadioClass.holder }, wrapRadio(index.h(Fragment.Fragment, null, index.h("input", { class: form.FormRadioClass.input, id: this.identifier || this.radioId, type: "radio", value: this.value, name: this.name, checked: this.checked, disabled: this.disabled, onClick: this.onClickHandler.bind(this), onChange: this.onChangeHandler.bind(this), onFocus: this.onFocusHandler.bind(this), onBlur: this.onBlurHandler.bind(this), ref: el => (this.inputRef = el), required: this.required, "aria-checked": this.checked, "aria-required": template.toBoolAttrIfDefined(this.required), "aria-invalid": template.toBoolAttrIfDefined(this.invalid), "aria-describedby": this.wcagDescribedBy, "aria-labelledby": this.wcagLabelledBy, "aria-disabled": template.toBoolAttrIfDefined(this.disabled) }), index.h("span", null, index.h("slot", { name: "label" })))))));
  }
  onClickHandler(e) {
    e.stopPropagation();
  }
  onFocusHandler(e) {
    e.stopPropagation();
    this.govFocus.emit({
      component: form.FormRadioClass.root,
      value: this.value,
      checked: this.checked,
      originalEvent: e,
    });
  }
  onBlurHandler(e) {
    e.stopPropagation();
    this.govBlur.emit({
      component: form.FormRadioClass.root,
      value: this.value,
      checked: this.checked,
      originalEvent: e,
    });
  }
  onChangeHandler(e) {
    this.checked = e.target.checked;
    e.stopPropagation();
    this.govChange.emit({
      component: form.FormRadioClass.root,
      value: this.value,
      checked: this.checked,
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
    wcag.validateWcagRef(this.wcagDescribedBy, "wcag-described-by", form.FormRadioClass.root);
    wcag.validateWcagRef(this.wcagLabelledBy, "wcag-labelled-by", form.FormRadioClass.root);
    wcag.validateWcagLabelFor(this.identifier || this.radioId, this.wcagLabelledBy, form.FormRadioClass.root);
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "size": ["validateSize", "watchDisabled"],
    "disabled": ["watchDisabled"],
    "invalid": ["watchDisabled"]
  }; }
};
GovFormRadio.style = govFormRadioCss;

exports.gov_form_radio = GovFormRadio;

//# sourceMappingURL=gov-form-radio.cjs.entry.js.map