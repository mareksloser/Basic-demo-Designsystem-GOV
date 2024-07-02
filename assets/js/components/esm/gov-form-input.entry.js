import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { g as govForm, k as FormInputClass, l as FormInputVariants, m as FormInputSizes } from './form-39dc6896.js';
import { g as govHost, a as toBoolAttr, t as toBoolAttrIfDefined, c as toOnOffAttrIfDefined } from './template-df429738.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { v as validateProp } from './props-a85d9c89.js';
import { a as validateWcagRef, b as validateWcagLabelFor } from './wcag-7d25e12b.js';
import { c as createID } from './string.utils-f268fc6b.js';
import { d as delay } from './utils-c057a3fa.js';
import './sizes-6c5943b4.js';
import './variants-2b936d58.js';
import './constants-3df712e2.js';
import './constants-47d7a8bc.js';
import './constants-ebec7de8.js';
import './gov.log-49da0221.js';

const govFormInputCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-input{position:relative;display:flex;width:100%;align-items:center}.gov-form-input .element{position:relative;display:flex;flex:1 1 auto}.gov-form-input input,.gov-form-input select,.gov-form-input textarea{width:100%;border-radius:var(--gov-border-radius, 0.1875rem);background-color:var(--gov-form-bg-color, var(--gov-color-neutral-white));font-family:var(--gov-font-family, \"Roboto\", sans-serif)}.gov-form-input input:focus,.gov-form-input select:focus,.gov-form-input textarea:focus{outline:none}.gov-form-input input:focus-visible,.gov-form-input select:focus-visible,.gov-form-input textarea:focus-visible{border-radius:var(--gov-border-radius, 0.1875rem);outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base);outline-offset:0}.gov-form-input input::-moz-placeholder,.gov-form-input select::-moz-placeholder,.gov-form-input textarea::-moz-placeholder{color:var(--gov-form-placeholder-color, var(--gov-color-secondary-600))}.gov-form-input input::placeholder,.gov-form-input select::placeholder,.gov-form-input textarea::placeholder{color:var(--gov-form-placeholder-color, var(--gov-color-secondary-600))}.gov-form-input textarea{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);padding:0.5rem 0.75rem;resize:none}.gov-form-input *[slot=left-icon],.gov-form-input *[slot=right-icon]{position:absolute;top:50%;display:flex;justify-content:center;transform:translateY(-50%);pointer-events:none}.gov-form-input *[slot=left-icon]{left:0}.gov-form-input *[slot=right-icon]{right:0}.gov-form-input *[slot=prefix],.gov-form-input *[slot=sufix]{margin:0}[size=s].gov-form-input{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);gap:0.5rem var(--gov-form-input-core-s-icon-size, 1rem)}[size=s].gov-form-input input,[size=s].gov-form-input select{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);height:var(--gov-form-input-core-s-height, 2rem);padding:var(--gov-form-input-core-s-padding, 0.25rem 0.75rem)}[size=s].gov-form-input *[slot=left-icon],[size=s].gov-form-input *[slot=right-icon]{width:var(--gov-form-input-core-s-icon-size, 1rem);height:var(--gov-form-input-core-s-icon-size, 1rem)}[size=s].gov-form-input *[slot=left-icon]{left:calc((var(--gov-form-input-core-s-icon-padding, 2rem) - var(--gov-form-input-core-s-icon-size, 1rem)) / 2)}[size=s].gov-form-input *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-s-icon-padding, 2rem)}[size=s].gov-form-input *[slot=right-icon]{right:calc((var(--gov-form-input-core-s-icon-padding, 2rem) - var(--gov-form-input-core-s-icon-size, 1rem)) / 2)}[size=s].gov-form-input *[slot=right-icon]~input,[size=s].gov-form-input *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-s-icon-padding, 2rem)}[size=m].gov-form-input{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);gap:0.5rem var(--gov-form-input-core-m-icon-size, 1rem)}[size=m].gov-form-input input,[size=m].gov-form-input select{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);height:var(--gov-form-input-core-m-height, 2.5rem);padding:var(--gov-form-input-core-m-padding, 0.4375rem 0.75rem)}[size=m].gov-form-input *[slot=left-icon],[size=m].gov-form-input *[slot=right-icon]{width:var(--gov-form-input-core-m-icon-size, 1rem);height:var(--gov-form-input-core-m-icon-size, 1rem)}[size=m].gov-form-input *[slot=left-icon]{left:calc((var(--gov-form-input-core-m-icon-padding, 2.5rem) - var(--gov-form-input-core-m-icon-size, 1rem)) / 2)}[size=m].gov-form-input *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-m-icon-padding, 2.5rem)}[size=m].gov-form-input *[slot=right-icon]{right:calc((var(--gov-form-input-core-m-icon-padding, 2.5rem) - var(--gov-form-input-core-m-icon-size, 1rem)) / 2)}[size=m].gov-form-input *[slot=right-icon]~input,[size=m].gov-form-input *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-m-icon-padding, 2.5rem)}[size=l].gov-form-input{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);gap:0.5rem var(--gov-form-input-core-l-icon-size, 1rem)}[size=l].gov-form-input input,[size=l].gov-form-input select{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);height:var(--gov-form-input-core-l-height, 3rem);padding:var(--gov-form-input-core-l-padding, 0.6875rem 0.75rem)}[size=l].gov-form-input *[slot=left-icon],[size=l].gov-form-input *[slot=right-icon]{width:var(--gov-form-input-core-l-icon-size, 1rem);height:var(--gov-form-input-core-l-icon-size, 1rem)}[size=l].gov-form-input *[slot=left-icon]{left:calc((var(--gov-form-input-core-l-icon-padding, 2.5rem) - var(--gov-form-input-core-l-icon-size, 1rem)) / 2)}[size=l].gov-form-input *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-l-icon-padding, 2.5rem)}[size=l].gov-form-input *[slot=right-icon]{right:calc((var(--gov-form-input-core-l-icon-padding, 2.5rem) - var(--gov-form-input-core-l-icon-size, 1rem)) / 2)}[size=l].gov-form-input *[slot=right-icon]~input,[size=l].gov-form-input *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-l-icon-padding, 2.5rem)}[size=xl].gov-form-input{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);gap:0.5rem var(--gov-form-input-core-xl-icon-size, 1.25rem)}[size=xl].gov-form-input input,[size=xl].gov-form-input select{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);height:var(--gov-form-input-core-xl-height, 3.5rem);padding:var(--gov-form-input-core-xl-padding, 0.9375rem 1rem 0.875rem)}[size=xl].gov-form-input *[slot=left-icon],[size=xl].gov-form-input *[slot=right-icon]{width:var(--gov-form-input-core-xl-icon-size, 1.25rem);height:var(--gov-form-input-core-xl-icon-size, 1.25rem)}[size=xl].gov-form-input *[slot=left-icon]{left:calc((var(--gov-form-input-core-xl-icon-padding, 3rem) - var(--gov-form-input-core-xl-icon-size, 1.25rem)) / 2)}[size=xl].gov-form-input *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-xl-icon-padding, 3rem)}[size=xl].gov-form-input *[slot=right-icon]{right:calc((var(--gov-form-input-core-xl-icon-padding, 3rem) - var(--gov-form-input-core-xl-icon-size, 1.25rem)) / 2)}[size=xl].gov-form-input *[slot=right-icon]~input,[size=xl].gov-form-input *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-xl-icon-padding, 3rem)}[variant=primary].gov-form-input input,[variant=primary].gov-form-input select,[variant=primary].gov-form-input textarea{color:var(--gov-form-input-color-primary, var(--gov-color-secondary-700));border:var(--gov-form-input-border-primary, 0.0625rem solid var(--gov-color-primary-600))}[variant=primary].gov-form-input *[slot=left-icon],[variant=primary].gov-form-input *[slot=right-icon]:not(.icon-arrow){color:var(--gov-form-input-icon-color-primary, var(--gov-color-primary))}[variant=secondary].gov-form-input input,[variant=secondary].gov-form-input select,[variant=secondary].gov-form-input textarea{color:var(--gov-form-input-color-secondary, var(--gov-color-secondary-700));border:var(--gov-form-input-border-secondary, 0.0625rem solid var(--gov-color-secondary-700))}[variant=secondary].gov-form-input *[slot=left-icon],[variant=secondary].gov-form-input *[slot=right-icon]:not(.icon-arrow){color:var(--gov-form-input-icon-color-secondary, var(--gov-color-primary))}[disabled=\"\"].gov-form-input,[disabled=true i].gov-form-input,[disabled=\"1\"].gov-form-input{pointer-events:none}[disabled=\"\"].gov-form-input input,[disabled=\"\"].gov-form-input select,[disabled=\"\"].gov-form-input textarea,[disabled=true i].gov-form-input input,[disabled=true i].gov-form-input select,[disabled=true i].gov-form-input textarea,[disabled=\"1\"].gov-form-input input,[disabled=\"1\"].gov-form-input select,[disabled=\"1\"].gov-form-input textarea{border-color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600));background:var(--gov-form-input-disabled-bg, var(--gov-color-secondary-300));color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600))}[disabled=\"\"].gov-form-input *[slot=left-icon],[disabled=\"\"].gov-form-input *[slot=right-icon],[disabled=true i].gov-form-input *[slot=left-icon],[disabled=true i].gov-form-input *[slot=right-icon],[disabled=\"1\"].gov-form-input *[slot=left-icon],[disabled=\"1\"].gov-form-input *[slot=right-icon]{color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600)) !important}[invalid=\"\"].gov-form-input input,[invalid=\"\"].gov-form-input select,[invalid=\"\"].gov-form-input textarea,[invalid=true i].gov-form-input input,[invalid=true i].gov-form-input select,[invalid=true i].gov-form-input textarea,[invalid=\"1\"].gov-form-input input,[invalid=\"1\"].gov-form-input select,[invalid=\"1\"].gov-form-input textarea{border-color:var(--gov-form-state-color-error, var(--gov-color-error));color:var(--gov-form-state-color-error, var(--gov-color-error))}[invalid=\"\"].gov-form-input input::-moz-placeholder,[invalid=\"\"].gov-form-input select::-moz-placeholder,[invalid=\"\"].gov-form-input textarea::-moz-placeholder,[invalid=true i].gov-form-input input::-moz-placeholder,[invalid=true i].gov-form-input select::-moz-placeholder,[invalid=true i].gov-form-input textarea::-moz-placeholder,[invalid=\"1\"].gov-form-input input::-moz-placeholder,[invalid=\"1\"].gov-form-input select::-moz-placeholder,[invalid=\"1\"].gov-form-input textarea::-moz-placeholder{color:var(--gov-form-state-color-error, var(--gov-color-error-300))}[invalid=\"\"].gov-form-input input::placeholder,[invalid=\"\"].gov-form-input select::placeholder,[invalid=\"\"].gov-form-input textarea::placeholder,[invalid=true i].gov-form-input input::placeholder,[invalid=true i].gov-form-input select::placeholder,[invalid=true i].gov-form-input textarea::placeholder,[invalid=\"1\"].gov-form-input input::placeholder,[invalid=\"1\"].gov-form-input select::placeholder,[invalid=\"1\"].gov-form-input textarea::placeholder{color:var(--gov-form-state-color-error, var(--gov-color-error-300))}[invalid=\"\"].gov-form-input *[slot=left-icon],[invalid=\"\"].gov-form-input *[slot=right-icon],[invalid=true i].gov-form-input *[slot=left-icon],[invalid=true i].gov-form-input *[slot=right-icon],[invalid=\"1\"].gov-form-input *[slot=left-icon],[invalid=\"1\"].gov-form-input *[slot=right-icon]{color:var(--gov-form-state-color-error, var(--gov-color-error)) !important}[invalid=\"\"].gov-form-input *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[invalid=true i].gov-form-input *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[invalid=\"1\"].gov-form-input *[slot=right-icon]:not(.icon-validation):not(.icon-arrow){display:none}[success=\"\"].gov-form-input *[slot=right-icon]:not(.icon-arrow),[success=true i].gov-form-input *[slot=right-icon]:not(.icon-arrow),[success=\"1\"].gov-form-input *[slot=right-icon]:not(.icon-arrow){color:var(--gov-form-state-color-success, var(--gov-color-success))}[success=\"\"].gov-form-input *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[success=true i].gov-form-input *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[success=\"1\"].gov-form-input *[slot=right-icon]:not(.icon-validation):not(.icon-arrow){display:none}[multiline=\"\"].gov-form-input *[slot=left-icon],[multiline=\"\"].gov-form-input *[slot=right-icon],[multiline=true i].gov-form-input *[slot=left-icon],[multiline=true i].gov-form-input *[slot=right-icon],[multiline=\"1\"].gov-form-input *[slot=left-icon],[multiline=\"1\"].gov-form-input *[slot=right-icon]{display:none}.gov-form-input[type=reset] input{border-width:0}.gov-form-input[type=reset] input:focus{outline:none}";

var Tags;
(function (Tags) {
  Tags["INPUT"] = "input";
  Tags["TEXTAREA"] = "textarea";
})(Tags || (Tags = {}));
const GovFormInput = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govFocus = createEvent(this, "gov-focus", 7);
    this.govBlur = createEvent(this, "gov-blur", 7);
    this.govInput = createEvent(this, "gov-input", 7);
    this.govKeyUp = createEvent(this, "gov-keyup", 7);
    this.govKeyDown = createEvent(this, "gov-keydown", 7);
    this.value = undefined;
    this.identifier = undefined;
    this.variant = "secondary";
    this.success = undefined;
    this.size = "m";
    this.name = undefined;
    this.multiline = undefined;
    this.rows = undefined;
    this.cols = undefined;
    this.required = false;
    this.disabled = false;
    this.placeholder = undefined;
    this.readonly = undefined;
    this.minlength = undefined;
    this.maxlength = undefined;
    this.min = undefined;
    this.max = undefined;
    this.autocomplete = undefined;
    this.autocorrect = undefined;
    this.type = undefined;
    this.inputType = "text";
    this.role = undefined;
    this.invalid = undefined;
    this.wcagDescribedBy = undefined;
    this.wcagLabelledBy = undefined;
    this.wcagOwns = undefined;
    this.wcagAutocomplete = undefined;
    this.wcagExpanded = undefined;
    this.focused = undefined;
    this.h = govHost(this.host);
    this.inputId = createID("GovInput");
    this.f = govForm(this.h);
  }
  validateVariant(newValue) {
    validateProp(FormInputVariants, newValue, FormInputClass.root);
  }
  validateSize(newValue) {
    validateProp(FormInputSizes, newValue, FormInputClass.root);
  }
  watchDisabled() {
    this.passControlAttrs();
  }
  passControlAttrs() {
    this.f.passAttrToControl("size", this.size);
    this.f.passAttrToControl("invalid", toBoolAttr(this.invalid));
    this.f.passAttrToControl("type", this.multiline ? Tags.TEXTAREA : Tags.INPUT);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateSize(this.size);
    this.passControlAttrs();
    this.f.passAttrToLabel("required", String(this.required));
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    const Tag = this.multiline ? Tags.TEXTAREA : Tags.INPUT;
    return (h(Host, { class: FormInputClass.root, size: this.size, variant: this.variant, type: this.type }, this.h.hasSlot("prefix") && h("slot", { name: "prefix" }), h("span", { class: "element" }, this.h.hasSlot("left-icon") && h("slot", { name: "left-icon" }), this.h.hasSlot("right-icon") && !(this.success || this.invalid) && h("slot", { name: "right-icon" }), this.success && !this.multiline &&
      h("gov-icon", { slot: "right-icon", class: "icon-validation", name: "check-lg" }), this.invalid && !this.multiline &&
      h("gov-icon", { slot: "right-icon", class: "icon-validation", name: "exclamation-lg" }), h(Tag, { type: this.inputType, disabled: this.disabled, id: this.identifier || this.inputId, name: this.name, onFocus: this.onFocusHandler.bind(this), onInput: this.onInputHandler.bind(this), onBlur: this.onBlurHandler.bind(this), onKeyUp: this.onKeyUpHandler.bind(this), onKeyDown: this.onKeyDownHandler.bind(this), ref: el => (this.inputRef = el), placeholder: this.placeholder, value: this.value, readonly: toBoolAttrIfDefined(this.readonly), autocomplete: toOnOffAttrIfDefined(this.autocomplete), autocorrect: toOnOffAttrIfDefined(this.autocorrect), minlength: this.minlength, maxlength: this.maxlength, min: this.min, max: this.max, required: this.required, rows: this.rows, cols: this.cols, role: this.role, "aria-required": toBoolAttrIfDefined(this.required), "aria-invalid": toBoolAttrIfDefined(this.invalid), "aria-disabled": toBoolAttrIfDefined(this.disabled), "aria-describedby": this.wcagDescribedBy, "aria-labelledby": this.wcagLabelledBy, "aria-owns": this.wcagOwns, "aria-expanded": toBoolAttrIfDefined(this.wcagExpanded), "aria-autocomplete": this.wcagAutocomplete })), this.h.hasSlot("sufix") && h("slot", { name: "sufix" })));
  }
  onFocusHandler(e) {
    e.stopPropagation();
    this.focused = true;
    this.govFocus.emit({
      component: FormInputClass.root,
      value: this.value,
      originalEvent: e,
    });
  }
  onBlurHandler(e) {
    e.stopPropagation();
    this.focused = false;
    this.govBlur.emit({
      component: FormInputClass.root,
      value: this.value,
      originalEvent: e,
    });
  }
  onKeyUpHandler(e) {
    e.stopPropagation();
    this.govKeyUp.emit({
      component: FormInputClass.root,
      value: this.value,
      originalEvent: e,
    });
  }
  onKeyDownHandler(e) {
    e.stopPropagation();
    this.govKeyDown.emit({
      component: FormInputClass.root,
      value: this.value,
      originalEvent: e,
    });
  }
  onInputHandler(e) {
    this.value = e.target.value;
    e.stopPropagation();
    this.govInput.emit({
      component: FormInputClass.root,
      value: this.value,
      originalEvent: e,
    });
  }
  /**
   * Returns the current state of the component
   */
  async setFocus(options) {
    return this.inputRef.focus(options);
  }
  /**
   * Sets the ordered value of the element
   */
  async setValue(value) {
    this.value = value;
  }
  /**
   * Clears input value
   */
  async clearValue() {
    this.value = "";
    this.inputRef.value = "";
  }
  /**
   * Returns an instance of the native html input element
   */
  async getRef() {
    return this.inputRef;
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagRef(this.wcagDescribedBy, "wcag-described-by", FormInputClass.root);
    validateWcagRef(this.wcagLabelledBy, "wcag-labelled-by", FormInputClass.root);
    validateWcagRef(this.wcagOwns, "wcag-owns", FormInputClass.root);
    validateWcagLabelFor(this.identifier || this.inputId, this.wcagLabelledBy, FormInputClass.root);
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"],
    "size": ["validateSize", "watchDisabled"],
    "disabled": ["watchDisabled"],
    "invalid": ["watchDisabled"],
    "type": ["watchDisabled"]
  }; }
};
GovFormInput.style = govFormInputCss;

export { GovFormInput as gov_form_input };

//# sourceMappingURL=gov-form-input.entry.js.map