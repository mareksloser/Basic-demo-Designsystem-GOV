import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { a as toBoolAttr } from './template-df429738.js';
import { v as validateProp } from './props-a85d9c89.js';
import { c as createID } from './string.utils-f268fc6b.js';
import { d as delay, t as throttle, h as has } from './utils-c057a3fa.js';
import { F as FormAutocompleteClass, a as FormAutocompleteVariants, b as FormAutocompleteSizes } from './constants-47d7a8bc.js';
import './gov.log-49da0221.js';
import './win-1dbd3f5c.js';
import './sizes-6c5943b4.js';
import './variants-2b936d58.js';

const govFormAutocompleteCss = ".gov-form-autocomplete__list{margin:0;padding:0}.gov-form-autocomplete__list>.gov-form-autocomplete__item{margin:0;padding:0;background:none}.gov-form-autocomplete__list>.gov-form-autocomplete__item::before{display:none}.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-autocomplete{position:relative;display:block;width:100%}.gov-form-autocomplete__list{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);position:absolute;top:100%;right:0;left:0;z-index:5;max-height:14.0625rem;margin-top:0.5rem;border:var(--gov-autocomplete-item-hover, 0.0625rem solid var(--gov-color-secondary-500));border-radius:var(--gov-border-radius, 0.1875rem);background:var(--gov-autocomplete-bg, var(--gov-color-neutral-white));overflow-x:hidden;overflow-y:auto;overscroll-behavior:none}.gov-form-autocomplete__list>.gov-form-autocomplete__item{padding:0.75rem 0.5rem;cursor:pointer}.gov-form-autocomplete__item--empty,.gov-form-autocomplete__item--loading{padding:0.75rem 0.5rem;color:var(--gov-autocomplete-item-disable-color, var(--gov-color-secondary-600))}.gov-form-autocomplete__item--empty .gov-icon,.gov-form-autocomplete__item--loading .gov-icon{height:12px}.gov-form-autocomplete__list:empty{display:none}.gov-form-autocomplete__item[aria-selected=\"\"],.gov-form-autocomplete__item[aria-selected=true i],.gov-form-autocomplete__item[aria-selected=\"1\"]{background:var(--gov-autocomplete-item-select, var(--gov-color-secondary-400))}@media not all and (pointer: coarse){.gov-form-autocomplete__item:hover{background:var(--gov-autocomplete-item-hover, var(--gov-color-primary-100))}}";

const GovFormAutocomplete = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govFocus = createEvent(this, "gov-focus", 7);
    this.govBlur = createEvent(this, "gov-blur", 7);
    this.govInput = createEvent(this, "gov-input", 7);
    this.govSelect = createEvent(this, "gov-select", 7);
    this.templateResolver = item => item[this.nameKey];
    this.value = '';
    this.identifier = undefined;
    this.variant = undefined;
    this.success = undefined;
    this.size = 'm';
    this.nameKey = 'name';
    this.name = undefined;
    this.required = false;
    this.disabled = false;
    this.placeholder = undefined;
    this.readonly = undefined;
    this.invalid = undefined;
    this.minlength = 3;
    this.maxlength = undefined;
    this.messageEmpty = 'Nebyly nalezeny žádné výsledky';
    this.messageLoading = 'Načítám...';
    this.wcagDescribedBy = undefined;
    this.wcagLabelledBy = undefined;
    this.wcagOwns = undefined;
    this.focused = undefined;
    this.processing = false;
    this.arrowCounter = -1;
    this.list = [];
    this.listBoxId = createID('GovListBox');
  }
  validateVariant(newValue) {
    validateProp(FormAutocompleteVariants, newValue, FormAutocompleteClass.root);
  }
  validateSize(newValue) {
    validateProp(FormAutocompleteSizes, newValue, FormAutocompleteClass.root);
  }
  onArrowUp() {
    if (this.arrowCounter > 0) {
      this.arrowCounter = this.arrowCounter - 1;
      this.moveToView().finally();
    }
  }
  onArrowDown() {
    if (this.arrowCounter < this.list.length - 1) {
      this.arrowCounter = this.arrowCounter + 1;
      this.moveToView().finally();
    }
  }
  async moveToView() {
    await delay(200);
    const heightOfList = this.listRef.offsetHeight;
    const selected = this.listRef.querySelector('li[aria-selected="true"]');
    if (selected && heightOfList) {
      const offsetTop = selected.offsetTop;
      this.listRef.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }
  doSearch() {
    if (Number.isInteger(this.minlength) && this.isValueAccepted === false && this.minlength) {
      this.list = [];
      this.arrowCounter = -1;
      this.processing = false;
      return;
    }
    if (this.searchCallback) {
      this.processing = true;
      this.searchCallback(this.value)
        .then(response => (this.list = response))
        .catch(() => (this.list = []))
        .finally(() => {
        this.arrowCounter = -1;
        this.processing = false;
      });
    }
  }
  get isValueAccepted() {
    if (typeof this.value === 'string') {
      return this.value.length >= this.minlength;
    }
    else {
      return false;
    }
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateSize(this.size);
  }
  render() {
    return (h(Host, { class: FormAutocompleteClass.root, size: this.size, variant: this.variant }, h("gov-form-input", { placeholder: this.placeholder, name: this.name, disabled: this.disabled, readonly: this.readonly, autocomplete: false, size: this.size, variant: this.variant, required: this.required, invalid: this.invalid, success: this.success, role: 'searchbox', value: this.value, minlength: this.minlength, maxlength: this.maxlength, "on-gov-input": throttle(this.onInputHandler.bind(this), 200), "on-gov-keyup": this.onKeyUpHandler.bind(this), "on-gov-keydown": this.onKeyDownHandler.bind(this), "on-gov-focus": this.onFocusHandler.bind(this), "on-gov-blur": this.onBlurHandler.bind(this), wcagAutocomplete: 'list', wcagDescribedBy: this.wcagDescribedBy, wcagLabelledBy: this.wcagLabelledBy, wcagOwns: [this.listBoxId, this.wcagOwns].join(' '), wcagExpanded: this.list.length && this.focused, ref: el => (this.inputRef = el) }, h("slot", { slot: "right-icon", name: "right-icon" })), h("ul", { class: FormAutocompleteClass.list, role: 'listbox', id: this.listBoxId, ref: el => (this.listRef = el) }, this.focused && this.list.length === 0 && this.processing === false && this.isValueAccepted && this.messageEmpty ? (h("li", { class: FormAutocompleteClass.empty }, this.messageEmpty)) : null, this.focused && this.processing === true && this.isValueAccepted ? (h("li", { class: FormAutocompleteClass.loading }, h("gov-icon", { name: "loader", class: "gov-spin-animation" }), "\u00A0", this.messageLoading)) : null, this.list.map((item, index) => {
      const isSelected = this.arrowCounter === index;
      return (h("li", { class: FormAutocompleteClass.item, innerHTML: this.templateResolver(item, isSelected), role: 'option', "aria-posinset": index, tabindex: isSelected ? 0 : -1, "aria-setsize": this.list.length, onTouchStart: (e) => this.onSelectHandler(e, index), onMouseDown: (e) => this.onSelectHandler(e, index), "aria-selected": toBoolAttr(isSelected) }));
    }))));
  }
  onFocusHandler(e) {
    this.focused = true;
    this.arrowCounter = -1;
    if ((this.value || this.minlength === 0) && this.searchCallback) {
      this.doSearch();
    }
    e.stopPropagation();
    this.govFocus.emit({
      originalEvent: e,
      component: FormAutocompleteClass.root,
      value: this.value,
      selected: null,
    });
  }
  onBlurHandler(e) {
    this.focused = false;
    this.list = [];
    this.arrowCounter = -1;
    e.stopPropagation();
    this.govBlur.emit({
      originalEvent: e,
      component: FormAutocompleteClass.root,
      value: this.value,
      selected: null,
    });
  }
  onInputHandler(e) {
    this.value = e.target.value;
    e.stopPropagation();
    this.govInput.emit({
      originalEvent: e,
      component: FormAutocompleteClass.root,
      value: this.value,
      selected: null,
    });
    this.doSearch();
  }
  onSelectHandler(e, index = -1) {
    let selected = null;
    if (index > -1) {
      selected = this.list[index];
    }
    else if (has(this.arrowCounter, this.list)) {
      selected = this.list[this.arrowCounter];
    }
    if (selected) {
      this.govSelect.emit({
        component: FormAutocompleteClass.root,
        value: this.value,
        selected: selected,
        originalEvent: e,
      });
      this.list = [];
      if (has(this.nameKey, selected) && typeof selected[this.nameKey] === 'string') {
        this.value = selected[this.nameKey];
      }
    }
  }
  onKeyUpHandler(e) {
    const event = e.detail.originalEvent;
    e.stopPropagation();
    event.stopPropagation();
    if (event.keyCode === 38)
      this.onArrowUp();
    else if (event.keyCode === 40)
      this.onArrowDown();
    else if (event.keyCode === 13) {
      e.preventDefault();
      event.preventDefault();
      this.onSelectHandler(e);
    }
  }
  onKeyDownHandler(e) {
    const event = e.detail.originalEvent;
    e.stopPropagation();
    event.stopPropagation();
    if (event.keyCode === 13) {
      e.preventDefault();
      event.preventDefault();
    }
  }
  /**
   * Returns the current state of the component
   */
  async setFocus(options) {
    return this.inputRef.focus(options);
  }
  /**
   * Set options for list
   */
  async setOptions(options) {
    this.list = Array.isArray(options) ? options : [];
    this.arrowCounter = -1;
  }
  /**
   * Clears whisperer value
   */
  async clearValue() {
    this.value = '';
    this.inputRef.value = '';
    await this.inputRef.clearValue();
  }
  /**
   * Clears whisperer value
   */
  async setProcessing(status) {
    this.processing = status;
  }
  /**
   * Set a custom asynchronous function for the whisperer
   */
  async setSearchCallback(callback) {
    this.searchCallback = callback;
  }
  /**
   * Setting a custom whisper result template
   * @param callback
   */
  async setTemplateResolver(callback) {
    this.templateResolver = callback;
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"],
    "size": ["validateSize"]
  }; }
};
GovFormAutocomplete.style = govFormAutocompleteCss;

export { GovFormAutocomplete as gov_form_autocomplete };

//# sourceMappingURL=gov-form-autocomplete.entry.js.map