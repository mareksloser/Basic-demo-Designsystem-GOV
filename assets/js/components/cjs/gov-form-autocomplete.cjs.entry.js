'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const template = require('./template-4b951d1d.js');
const props = require('./props-d6146e54.js');
const string_utils = require('./string.utils-0f08c48c.js');
const utils = require('./utils-c9b1bba3.js');
const constants = require('./constants-6df82618.js');
require('./gov.log-b842920d.js');
require('./win-5521073d.js');
require('./sizes-79872c2a.js');
require('./variants-f5ffeef3.js');

const govFormAutocompleteCss = ".gov-form-autocomplete__list{margin:0;padding:0}.gov-form-autocomplete__list>.gov-form-autocomplete__item{margin:0;padding:0;background:none}.gov-form-autocomplete__list>.gov-form-autocomplete__item::before{display:none}.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-autocomplete{position:relative;display:block;width:100%}.gov-form-autocomplete__list{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);position:absolute;top:100%;right:0;left:0;z-index:5;max-height:14.0625rem;margin-top:0.5rem;border:var(--gov-autocomplete-item-hover, 0.0625rem solid var(--gov-color-secondary-500));border-radius:var(--gov-border-radius, 0.1875rem);background:var(--gov-autocomplete-bg, var(--gov-color-neutral-white));overflow-x:hidden;overflow-y:auto;overscroll-behavior:none}.gov-form-autocomplete__list>.gov-form-autocomplete__item{padding:0.75rem 0.5rem;cursor:pointer}.gov-form-autocomplete__item--empty,.gov-form-autocomplete__item--loading{padding:0.75rem 0.5rem;color:var(--gov-autocomplete-item-disable-color, var(--gov-color-secondary-600))}.gov-form-autocomplete__item--empty .gov-icon,.gov-form-autocomplete__item--loading .gov-icon{height:12px}.gov-form-autocomplete__list:empty{display:none}.gov-form-autocomplete__item[aria-selected=\"\"],.gov-form-autocomplete__item[aria-selected=true i],.gov-form-autocomplete__item[aria-selected=\"1\"]{background:var(--gov-autocomplete-item-select, var(--gov-color-secondary-400))}@media not all and (pointer: coarse){.gov-form-autocomplete__item:hover{background:var(--gov-autocomplete-item-hover, var(--gov-color-primary-100))}}";

const GovFormAutocomplete = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govFocus = index.createEvent(this, "gov-focus", 7);
    this.govBlur = index.createEvent(this, "gov-blur", 7);
    this.govInput = index.createEvent(this, "gov-input", 7);
    this.govSelect = index.createEvent(this, "gov-select", 7);
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
    this.listBoxId = string_utils.createID('GovListBox');
  }
  validateVariant(newValue) {
    props.validateProp(constants.FormAutocompleteVariants, newValue, constants.FormAutocompleteClass.root);
  }
  validateSize(newValue) {
    props.validateProp(constants.FormAutocompleteSizes, newValue, constants.FormAutocompleteClass.root);
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
    await utils.delay(200);
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
    return (index.h(index.Host, { class: constants.FormAutocompleteClass.root, size: this.size, variant: this.variant }, index.h("gov-form-input", { placeholder: this.placeholder, name: this.name, disabled: this.disabled, readonly: this.readonly, autocomplete: false, size: this.size, variant: this.variant, required: this.required, invalid: this.invalid, success: this.success, role: 'searchbox', value: this.value, minlength: this.minlength, maxlength: this.maxlength, "on-gov-input": utils.throttle(this.onInputHandler.bind(this), 200), "on-gov-keyup": this.onKeyUpHandler.bind(this), "on-gov-keydown": this.onKeyDownHandler.bind(this), "on-gov-focus": this.onFocusHandler.bind(this), "on-gov-blur": this.onBlurHandler.bind(this), wcagAutocomplete: 'list', wcagDescribedBy: this.wcagDescribedBy, wcagLabelledBy: this.wcagLabelledBy, wcagOwns: [this.listBoxId, this.wcagOwns].join(' '), wcagExpanded: this.list.length && this.focused, ref: el => (this.inputRef = el) }, index.h("slot", { slot: "right-icon", name: "right-icon" })), index.h("ul", { class: constants.FormAutocompleteClass.list, role: 'listbox', id: this.listBoxId, ref: el => (this.listRef = el) }, this.focused && this.list.length === 0 && this.processing === false && this.isValueAccepted && this.messageEmpty ? (index.h("li", { class: constants.FormAutocompleteClass.empty }, this.messageEmpty)) : null, this.focused && this.processing === true && this.isValueAccepted ? (index.h("li", { class: constants.FormAutocompleteClass.loading }, index.h("gov-icon", { name: "loader", class: "gov-spin-animation" }), "\u00A0", this.messageLoading)) : null, this.list.map((item, index$1) => {
      const isSelected = this.arrowCounter === index$1;
      return (index.h("li", { class: constants.FormAutocompleteClass.item, innerHTML: this.templateResolver(item, isSelected), role: 'option', "aria-posinset": index$1, tabindex: isSelected ? 0 : -1, "aria-setsize": this.list.length, onTouchStart: (e) => this.onSelectHandler(e, index$1), onMouseDown: (e) => this.onSelectHandler(e, index$1), "aria-selected": template.toBoolAttr(isSelected) }));
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
      component: constants.FormAutocompleteClass.root,
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
      component: constants.FormAutocompleteClass.root,
      value: this.value,
      selected: null,
    });
  }
  onInputHandler(e) {
    this.value = e.target.value;
    e.stopPropagation();
    this.govInput.emit({
      originalEvent: e,
      component: constants.FormAutocompleteClass.root,
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
    else if (utils.has(this.arrowCounter, this.list)) {
      selected = this.list[this.arrowCounter];
    }
    if (selected) {
      this.govSelect.emit({
        component: constants.FormAutocompleteClass.root,
        value: this.value,
        selected: selected,
        originalEvent: e,
      });
      this.list = [];
      if (utils.has(this.nameKey, selected) && typeof selected[this.nameKey] === 'string') {
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
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"],
    "size": ["validateSize"]
  }; }
};
GovFormAutocomplete.style = govFormAutocompleteCss;

exports.gov_form_autocomplete = GovFormAutocomplete;

//# sourceMappingURL=gov-form-autocomplete.cjs.entry.js.map