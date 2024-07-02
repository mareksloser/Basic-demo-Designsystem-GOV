'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const props = require('./props-d6146e54.js');
const constants = require('./constants-427a2843.js');
const template = require('./template-4b951d1d.js');
const wcag = require('./wcag-e6257f27.js');
const win = require('./win-5521073d.js');
const utils = require('./utils-c9b1bba3.js');
const string_utils = require('./string.utils-0f08c48c.js');
require('./gov.log-b842920d.js');
require('./variants-f5ffeef3.js');

const govTabsCss = ".gov-tabs__list{margin:0;padding:0}.gov-tabs__list>.gov-tabs__item{margin:0;padding:0;background:none}.gov-tabs__list>.gov-tabs__item::before{display:none}.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-tabs{position:relative;display:block;width:100%}.gov-tabs__list{display:flex;flex-wrap:wrap;margin:0rem 0rem 1.25rem}.gov-tabs__list>.gov-tabs__item{display:flex;margin:0}.gov-tabs__btn{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);display:inline-flex;vertical-align:middle;justify-content:center;align-items:center;border:0;background-color:transparent;text-align:center;text-decoration:none;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;margin:0;padding:0.75rem 0rem 0.625rem;border-bottom:0.125rem solid transparent;font-weight:700;text-align:center;transition:150ms linear color, 150ms linear border-color}.gov-tabs__btn:focus{outline:none}.gov-tabs__btn:focus{outline:none}.gov-tabs__btn:focus-visible{border-radius:var(--gov-border-radius, 0.1875rem);outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base);outline-offset:0}.gov-tabs[type=text] .gov-tabs__list{gap:0.5rem 2rem;border-bottom:var(--gov-tabs-list-border-width, 0.0625rem solid var(--gov-color-secondary-500))}.gov-tabs[type=chip] .gov-tabs__list{gap:0.5rem 1rem}.gov-tabs[variant=primary][type=text] .gov-tabs__btn{color:var(--gov-tabs-primary-color, var(--gov-color-primary))}@media not all and (pointer: coarse){.gov-tabs[variant=primary][type=text] .gov-tabs__btn:hover{color:var(--gov-tabs-primary-color-hover, var(--gov-color-primary-800))}}.gov-tabs[variant=primary][type=text] .gov-tabs__btn[aria-selected=true]{border-bottom-color:var(--gov-tabs-primary-color-active, var(--gov-color-primary-800));color:var(--gov-tabs-primary-color-active, var(--gov-color-primary-800))}.gov-tabs[variant=secondary][type=text] .gov-tabs__btn{color:var(--gov-tabs-secondary-color, var(--gov-color-secondary-700))}@media not all and (pointer: coarse){.gov-tabs[variant=secondary][type=text] .gov-tabs__btn:hover{color:var(--gov-tabs-secondary-color-hover, var(--gov-color-secondary-900))}}.gov-tabs[variant=secondary][type=text] .gov-tabs__btn[aria-selected=true]{border-bottom-color:var(--gov-tabs-secondary-color-active, var(--gov-color-secondary-900));color:var(--gov-tabs-secondary-color-active, var(--gov-color-secondary-900))}.gov-tabs[variant=success][type=text] .gov-tabs__btn{color:var(--gov-tabs-success-color, var(--gov-color-success-500))}@media not all and (pointer: coarse){.gov-tabs[variant=success][type=text] .gov-tabs__btn:hover{color:var(--gov-tabs-success-color-hover, var(--gov-color-success-700))}}.gov-tabs[variant=success][type=text] .gov-tabs__btn[aria-selected=true]{border-bottom-color:var(--gov-tabs-success-color-active, var(--gov-color-success-700));color:var(--gov-tabs-success-color-active, var(--gov-color-success-700))}.gov-tabs[variant=warning][type=text] .gov-tabs__btn{color:var(--gov-tabs-warning-color, var(--gov-color-warning-500))}@media not all and (pointer: coarse){.gov-tabs[variant=warning][type=text] .gov-tabs__btn:hover{color:var(--gov-tabs-warning-color-hover, var(--gov-color-warning-700))}}.gov-tabs[variant=warning][type=text] .gov-tabs__btn[aria-selected=true]{border-bottom-color:var(--gov-tabs-warning-color-active, var(--gov-color-warning-700));color:var(--gov-tabs-warning-color-active, var(--gov-color-warning-700))}.gov-tabs[variant=error][type=text] .gov-tabs__btn{color:var(--gov-tabs-error-color, var(--gov-color-error-400))}@media not all and (pointer: coarse){.gov-tabs[variant=error][type=text] .gov-tabs__btn:hover{color:var(--gov-tabs-error-color-hover, var(--gov-color-error-600))}}.gov-tabs[variant=error][type=text] .gov-tabs__btn[aria-selected=true]{border-bottom-color:var(--gov-tabs-error-color-active, var(--gov-color-error-600));color:var(--gov-tabs-error-color-active, var(--gov-color-error-600))}.gov-tabs[orientation=vertical] .gov-tabs__btn{text-align:left}@media (min-width: 75em){.gov-tabs[orientation=vertical]{display:flex;flex-direction:row}.gov-tabs[orientation=vertical] .gov-tabs__list{flex-wrap:nowrap;flex-direction:column;width:-moz-max-content;width:max-content;max-width:30vw;margin-right:1.25rem;padding:0rem 0.5rem;border-bottom:none;border-right:var(--gov-tabs-list-border-width, 0.0625rem solid var(--gov-color-secondary-500))}.gov-tabs[orientation=vertical] .gov-tabs__item{justify-content:flex-end}.gov-tabs[orientation=vertical] .gov-tabs__btn{padding:0.5rem 0.75rem;text-align:right}}";

const GovTabs = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govChange = index.createEvent(this, "gov-change", 7);
    this.triggerRefs = {};
    this.controller = [];
    this.focusIndex = 0;
    this.compactControls = false;
    this.type = "text";
    this.variant = "primary";
    this.orientation = "horizontal";
    this.wcagLabel = undefined;
    this.wcagSelectLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.h = template.govHost(this.host);
    this.formSelectId = string_utils.createID("GovFormSelect");
  }
  validateType(newValue) {
    props.validateProp(constants.TabTypes, newValue, constants.TabsClass.root);
  }
  validateVariant(newValue) {
    props.validateProp(constants.TabVariants, newValue, constants.TabsClass.root);
  }
  componentWillLoad() {
    this.prepareDataSource();
  }
  async componentDidRender() {
    if (win.canValidateWcagOnRender()) {
      await utils.delay(500);
      await this.validateWcag();
    }
    this.resizeObserver();
  }
  prepareDataSource() {
    this.controller = [];
    const promises = [];
    this.host.querySelectorAll(constants.TabsItemClass.root).forEach((tab) => {
      const controlItem = Promise.all([
        tab.getIdentifier(),
        tab.getTriggerIdentifier(),
      ]).then(([identifier, triggerIdentifier]) => {
        const isDefault = typeof tab.getAttribute("default") === "string";
        return {
          label: tab.getAttribute("label"),
          contentIdentifier: identifier,
          triggerIdentifier: triggerIdentifier,
          element: tab,
          active: false,
          default: isDefault,
        };
      });
      promises.push(controlItem);
    });
    Promise.all(promises).then(controllers => {
      let defaultTab = controllers.findIndex(controller => controller.default);
      if (defaultTab === -1)
        defaultTab = 0;
      this.focusIndex = defaultTab;
      controllers[defaultTab].active = true;
      this.controller = [...controllers];
      this.reRender();
    });
  }
  setActiveByIdentifier(identifier) {
    const temp = [];
    this.controller.map(item => {
      item.active = identifier === item.triggerIdentifier || identifier === item.contentIdentifier;
      temp.push(item);
    });
    this.controller = [...temp];
  }
  reRender() {
    this.controller.map(control => {
      control.element.setActiveStatus(control.active);
    });
  }
  /*
  private evaluateControls() {
    this.compactControls = false
    let sumOfWidth = this.tabsRef.querySelector("ul").offsetWidth
    this.compactControls = this.tabsRef.offsetWidth < sumOfWidth
  }
  */
  resizeObserver() {
    const resizeObserver = new ResizeObserver(utils.throttle(() => {
      // this.evaluateControls()
    }, 200));
    resizeObserver.observe(this.tabsRef);
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(constants.TabsClass.root), variant: this.variant, type: this.type, role: "tablist", ref: el => (this.tabsRef = el), "aria-label": this.wcagLabel, "aria-labelledby": this.wcagLabelledBy, onKeyDown: this.onKeydownHandler.bind(this) }, index.h("div", { class: constants.TabsClass.tabs, "aria-hidden": template.toBoolAttr(this.compactControls) }, index.h("ul", { class: constants.TabsClass.list }, this.controller.map((control, index$1) => (index.h("li", { class: constants.TabsClass.item }, this.type == "text" ? (index.h("button", { class: constants.TabsClass.btn, id: control.triggerIdentifier, role: "tab", onClick: () => this.onSelectHandler(control, index$1), "aria-selected": template.toBoolAttr(control.active), "aria-controls": control.contentIdentifier, tabindex: control.active ? 0 : -1, ref: el => (this.triggerRefs[control.triggerIdentifier] = el) }, control.label)) : (index.h("gov-chip", { role: "tab", tag: 'button', identifier: control.triggerIdentifier, "wcag-selected": control.active, "wcag-controls": control.contentIdentifier, focusable: control.active, variant: this.variant, inverse: !control.active, ref: el => (this.triggerRefs[control.triggerIdentifier] = el), "on-gov-click": () => this.onSelectHandler(control, index$1) }, control.label))))))), index.h("span", { id: this.formSelectId, hidden: true }, this.wcagSelectLabel), this.compactControls ? (index.h("gov-form-select", { "wcag-labelled-by": this.formSelectId, "onGov-change": this.onChangeHandler.bind(this) }, this.controller.map(control => (index.h("option", { value: control.triggerIdentifier, selected: control.active }, control.label))))) : null, index.h("slot", null)));
  }
  getCurrentTab() {
    return this.controller.find(control => control.active) || null;
  }
  onSelectHandler(control, index) {
    this.focusIndex = index;
    this.setActiveByIdentifier(control.triggerIdentifier);
    this.reRender();
    this.govChange.emit(this.getCurrentTab().element);
  }
  onChangeHandler(e) {
    const triggerId = e.target.value;
    e.stopPropagation();
    this.setActiveByIdentifier(triggerId);
    this.reRender();
    this.govChange.emit(this.getCurrentTab().element);
  }
  onKeydownHandler(e) {
    const keyCode = e.keyCode;
    e.stopPropagation();
    if ([37, 38, 39, 40].includes(keyCode)) {
      if (false === (this.focusIndex >= 0 && this.focusIndex <= this.controller.length - 1)) {
        return;
      }
      this.controller[this.focusIndex].active = false;
      if (keyCode === 39 || keyCode === 40) {
        this.focusIndex++;
        if (this.focusIndex >= this.controller.length) {
          this.focusIndex = 0;
        }
      }
      else if (keyCode === 37 || keyCode === 38) {
        this.focusIndex--;
        if (this.focusIndex < 0) {
          this.focusIndex = this.controller.length - 1;
        }
      }
      if (this.focusIndex >= 0 && this.focusIndex <= this.controller.length - 1) {
        const current = this.controller[this.focusIndex];
        current.active = true;
        const trigger = this.triggerRefs[current.triggerIdentifier];
        if (trigger.nodeName.toLowerCase() === 'gov-chip') {
          this.triggerRefs[current.triggerIdentifier].setFocus();
        }
        else {
          this.triggerRefs[current.triggerIdentifier].focus();
        }
        this.controller = [...this.controller];
        this.reRender();
        this.govChange.emit(this.getCurrentTab().element);
      }
    }
  }
  /**
   * Regenerate tabs controllers
   */
  async refresh() {
    this.prepareDataSource();
  }
  /**
   * Returns the currently selected tabs-item
   */
  async currentTab() {
    return this.getCurrentTab().element || null;
  }
  /**
   * Regenerate tabs controllers
   */
  async setActiveTab(identifier) {
    this.setActiveByIdentifier(identifier);
    this.reRender();
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    wcag.validateWcagProp(this.wcagSelectLabel, "wcag-select-label", constants.TabsClass.root);
    wcag.validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, constants.TabsClass.root);
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "type": ["validateType"],
    "variant": ["validateVariant"]
  }; }
};
GovTabs.style = govTabsCss;

exports.gov_tabs = GovTabs;

//# sourceMappingURL=gov-tabs.cjs.entry.js.map