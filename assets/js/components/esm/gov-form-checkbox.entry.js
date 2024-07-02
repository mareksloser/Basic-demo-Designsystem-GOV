import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { c as createID } from './string.utils-f268fc6b.js';
import { v as validateProp } from './props-a85d9c89.js';
import { g as govForm, F as FormCheckboxClass, a as FormCheckboxSizes } from './form-39dc6896.js';
import { g as govHost, a as toBoolAttr, t as toBoolAttrIfDefined } from './template-df429738.js';
import { a as validateWcagRef, b as validateWcagLabelFor } from './wcag-7d25e12b.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { d as delay } from './utils-c057a3fa.js';
import { F as Fragment } from './Fragment-8d8d54fb.js';
import './gov.log-49da0221.js';
import './sizes-6c5943b4.js';
import './variants-2b936d58.js';
import './constants-3df712e2.js';
import './constants-47d7a8bc.js';
import './constants-ebec7de8.js';

const govFormCheckboxCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-checkbox{cursor:pointer}.gov-form-checkbox input{position:absolute;top:0;left:0;-webkit-appearance:none;-moz-appearance:none;appearance:none}.gov-form-checkbox input+span{position:relative;display:block;cursor:pointer}.gov-form-checkbox input+span::before{content:\"\";position:absolute;display:block;top:0;left:0;border:var(--gov-form-checkbox-border-size, 0.125rem solid var(--gov-color-primary));background-color:var(--gov-form-checkbox-background-color, var(--gov-color-neutral-white));transition:150ms linear border-color, 150ms linear background-color, 150ms linear outline-color}.gov-form-checkbox .gov-form-label__label{position:relative;z-index:1;width:100%}.gov-form-checkbox input:focus-visible+span::before{outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base)}[invalid=\"\"].gov-form-checkbox .gov-form-label__label,[invalid=true i].gov-form-checkbox .gov-form-label__label,[invalid=\"1\"].gov-form-checkbox .gov-form-label__label{color:var(--gov-form-state-color-error, var(--gov-color-error))}[invalid=\"\"].gov-form-checkbox input+span::before,[invalid=true i].gov-form-checkbox input+span::before,[invalid=\"1\"].gov-form-checkbox input+span::before{border-color:var(--gov-form-state-color-error, var(--gov-color-error))}[disabled=\"\"].gov-form-checkbox,[disabled=true i].gov-form-checkbox,[disabled=\"1\"].gov-form-checkbox{pointer-events:none}[disabled=\"\"].gov-form-checkbox .gov-form-label__label,[disabled=true i].gov-form-checkbox .gov-form-label__label,[disabled=\"1\"].gov-form-checkbox .gov-form-label__label{color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600))}[disabled=\"\"].gov-form-checkbox input+span::before,[disabled=true i].gov-form-checkbox input+span::before,[disabled=\"1\"].gov-form-checkbox input+span::before{border-color:var(--gov-form-input-disabled-bg, var(--gov-color-primary-400))}[size=xs].gov-form-checkbox{font-weight:var(--gov-text-xs-font-weight);font-size:var(--gov-text-xs-font-size);line-height:var(--gov-text-xs-line-height);letter-spacing:var(--gov-text-xs-letter-spacing);display:block;min-width:var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem);min-height:var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem)}[size=xs].gov-form-checkbox .gov-form-label__label{padding-top:calc((var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem) - var(--gov-text-xs-font-size) * 1.5) / 2);padding-left:calc(var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem) + var(--gov-form-checkbox-core-xs-gap, 0.75rem))}[size=xs].gov-form-checkbox input+span::before{width:var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem);height:var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem)}[size=s].gov-form-checkbox{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);display:block;min-width:var(--gov-form-checkbox-core-s-indicator-size, 1.375rem);min-height:var(--gov-form-checkbox-core-s-indicator-size, 1.375rem)}[size=s].gov-form-checkbox .gov-form-label__label{padding-top:calc((var(--gov-form-checkbox-core-s-indicator-size, 1.375rem) - var(--gov-text-s-font-size) * 1.5) / 2);padding-left:calc(var(--gov-form-checkbox-core-s-indicator-size, 1.375rem) + var(--gov-form-checkbox-core-s-gap, 0.75rem))}[size=s].gov-form-checkbox input+span::before{width:var(--gov-form-checkbox-core-s-indicator-size, 1.375rem);height:var(--gov-form-checkbox-core-s-indicator-size, 1.375rem)}[size=m].gov-form-checkbox{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);display:block;min-width:var(--gov-form-checkbox-core-m-indicator-size, 1.5rem);min-height:var(--gov-form-checkbox-core-m-indicator-size, 1.5rem)}[size=m].gov-form-checkbox .gov-form-label__label{padding-top:calc((var(--gov-form-checkbox-core-m-indicator-size, 1.5rem) - var(--gov-text-m-font-size) * 1.5) / 2);padding-left:calc(var(--gov-form-checkbox-core-m-indicator-size, 1.5rem) + var(--gov-form-checkbox-core-m-gap, 1rem))}[size=m].gov-form-checkbox input+span::before{width:var(--gov-form-checkbox-core-m-indicator-size, 1.5rem);height:var(--gov-form-checkbox-core-m-indicator-size, 1.5rem)}[size=l].gov-form-checkbox{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);display:block;min-width:var(--gov-form-checkbox-core-l-indicator-size, 2rem);min-height:var(--gov-form-checkbox-core-l-indicator-size, 2rem)}[size=l].gov-form-checkbox .gov-form-label__label{padding-top:calc((var(--gov-form-checkbox-core-l-indicator-size, 2rem) - var(--gov-text-l-font-size) * 1.5) / 2);padding-left:calc(var(--gov-form-checkbox-core-l-indicator-size, 2rem) + var(--gov-form-checkbox-core-l-gap, 1rem))}[size=l].gov-form-checkbox input+span::before{width:var(--gov-form-checkbox-core-l-indicator-size, 2rem);height:var(--gov-form-checkbox-core-l-indicator-size, 2rem)}.gov-form-checkbox input+span::before{border-radius:var(--gov-border-radius, 0.1875rem)}.gov-form-checkbox__check{position:absolute;color:var(--gov-form-checkbox-check-color, var(--gov-color-neutral-white));opacity:0;transition:150ms linear opacity}.gov-form-checkbox__label{position:relative}.gov-form-checkbox input:checked+span::before{background:var(--gov-form-checkbox-indicator-bg, var(--gov-color-primary))}input:checked+span .gov-form-checkbox__check{opacity:1}.gov-form-checkbox[invalid=\"\"] input:checked+span::before,.gov-form-checkbox[invalid=true i] input:checked+span::before,.gov-form-checkbox[invalid=\"1\"] input:checked+span::before{background:var(--gov-form-state-color-error, var(--gov-color-error))}.gov-form-checkbox[disabled=\"\"] input:checked+span::before,.gov-form-checkbox[disabled=true i] input:checked+span::before,.gov-form-checkbox[disabled=\"1\"] input:checked+span::before{border-color:var(--gov-form-input-disabled-bg, var(--gov-color-primary-400));background-color:var(--gov-form-input-disabled-bg, var(--gov-color-primary-400))}.gov-form-checkbox[size=xs] .gov-form-checkbox__check{top:calc((var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem) - var(--gov-form-checkbox-core-xs-check-size, 0.75rem)) / 2);left:calc((var(--gov-form-checkbox-core-xs-indicator-size, 1.25rem) - var(--gov-form-checkbox-core-xs-check-size, 0.75rem)) / 2);width:var(--gov-form-checkbox-core-xs-check-size, 0.75rem);height:var(--gov-form-checkbox-core-xs-check-size, 0.75rem)}.gov-form-checkbox[size=s] .gov-form-checkbox__check{top:calc((var(--gov-form-checkbox-core-s-indicator-size, 1.375rem) - var(--gov-form-checkbox-core-s-check-size, 0.825rem)) / 2);left:calc((var(--gov-form-checkbox-core-s-indicator-size, 1.375rem) - var(--gov-form-checkbox-core-s-check-size, 0.825rem)) / 2);width:var(--gov-form-checkbox-core-s-check-size, 0.825rem);height:var(--gov-form-checkbox-core-s-check-size, 0.825rem)}.gov-form-checkbox[size=m] .gov-form-checkbox__check{top:calc((var(--gov-form-checkbox-core-m-indicator-size, 1.5rem) - var(--gov-form-checkbox-core-m-check-size, 0.9rem)) / 2);left:calc((var(--gov-form-checkbox-core-m-indicator-size, 1.5rem) - var(--gov-form-checkbox-core-m-check-size, 0.9rem)) / 2);width:var(--gov-form-checkbox-core-m-check-size, 0.9rem);height:var(--gov-form-checkbox-core-m-check-size, 0.9rem)}.gov-form-checkbox[size=l] .gov-form-checkbox__check{top:calc((var(--gov-form-checkbox-core-l-indicator-size, 2rem) - var(--gov-form-checkbox-core-l-check-size, 1.2rem)) / 2);left:calc((var(--gov-form-checkbox-core-l-indicator-size, 2rem) - var(--gov-form-checkbox-core-l-check-size, 1.2rem)) / 2);width:var(--gov-form-checkbox-core-l-check-size, 1.2rem);height:var(--gov-form-checkbox-core-l-check-size, 1.2rem)}";

const GovFormCheckbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govFocus = createEvent(this, "gov-focus", 7);
    this.govBlur = createEvent(this, "gov-blur", 7);
    this.govChange = createEvent(this, "gov-change", 7);
    this.value = undefined;
    this.checked = false;
    this.required = false;
    this.disabled = false;
    this.name = undefined;
    this.size = "m";
    this.identifier = undefined;
    this.noLabel = false;
    this.invalid = undefined;
    this.wcagDescribedBy = undefined;
    this.wcagLabelledBy = undefined;
    this.checkboxId = createID("GovCheckbox");
    this.h = govHost(this.host);
    this.f = govForm(this.h);
  }
  validateSize(newValue) {
    validateProp(FormCheckboxSizes, newValue, FormCheckboxClass.root);
  }
  watchDisabled() {
    this.passControlAttrs();
  }
  passControlAttrs() {
    this.f.passAttrToControl("size", this.size);
    this.f.passAttrToControl("invalid", toBoolAttr(this.invalid));
  }
  componentWillLoad() {
    this.f.passAttrToControl("type", "checkbox");
    this.passControlAttrs();
  }
  async componentDidRender() {
    this.f.passAttrToLabel("identifier", this.identifier || this.checkboxId);
    this.f.passAttrToLabel("required", String(this.required));
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    const wrapCheckbox = (children) => {
      if (this.noLabel) {
        return (h("label", { class: FormCheckboxClass.label }, children));
      }
      return children;
    };
    return (h(Host, { class: FormCheckboxClass.root, checked: this.checked, size: this.size, invalid: toBoolAttrIfDefined(this.invalid) }, wrapCheckbox(h(Fragment, null, h("input", { id: this.identifier || this.checkboxId, type: "checkbox", value: this.value, name: this.name, checked: this.checked, onClick: this.onClickHandler.bind(this), onChange: this.onChangeHandler.bind(this), onFocus: this.onFocusHandler.bind(this), onBlur: this.onBlurHandler.bind(this), required: this.required, disabled: this.disabled, ref: el => (this.inputRef = el), "aria-checked": toBoolAttr(this.checked), "aria-required": toBoolAttrIfDefined(this.required), "aria-invalid": toBoolAttrIfDefined(this.invalid), "aria-describedby": this.wcagDescribedBy, "aria-labelledby": this.wcagLabelledBy, "aria-disabled": toBoolAttrIfDefined(this.disabled) }), h("span", null, h("slot", { name: "label" }), h("gov-icon", { class: FormCheckboxClass.check, name: "check-lg" }))))));
  }
  onFocusHandler(e) {
    e.stopPropagation();
    this.govFocus.emit({
      component: FormCheckboxClass.root,
      value: this.value,
      checked: this.checked,
      originalEvent: e,
    });
  }
  onBlurHandler(e) {
    e.stopPropagation();
    this.govBlur.emit({
      component: FormCheckboxClass.root,
      value: this.value,
      checked: this.checked,
      originalEvent: e,
    });
  }
  onClickHandler(e) {
    e.stopPropagation();
  }
  onChangeHandler(e) {
    this.checked = e.target.checked;
    e.stopPropagation();
    this.govChange.emit({
      component: FormCheckboxClass.root,
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
    validateWcagRef(this.wcagDescribedBy, "wcag-described-by", FormCheckboxClass.root);
    validateWcagRef(this.wcagLabelledBy, "wcag-labelled-by", FormCheckboxClass.root);
    validateWcagLabelFor(this.identifier || this.checkboxId, this.wcagLabelledBy, FormCheckboxClass.root);
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "size": ["validateSize", "watchDisabled"],
    "disabled": ["watchDisabled"],
    "invalid": ["watchDisabled"]
  }; }
};
GovFormCheckbox.style = govFormCheckboxCss;

export { GovFormCheckbox as gov_form_checkbox };

//# sourceMappingURL=gov-form-checkbox.entry.js.map