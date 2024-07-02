'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const template = require('./template-4b951d1d.js');
const win = require('./win-5521073d.js');
const gov_log = require('./gov.log-b842920d.js');
const wcag = require('./wcag-e6257f27.js');
const string_utils = require('./string.utils-0f08c48c.js');
const utils = require('./utils-c9b1bba3.js');
const constants = require('./constants-66cb0615.js');

const govModalCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-modal{display:none}.gov-modal__dialog{z-index:101;position:fixed;top:50%;left:50%;display:flex;justify-content:center;align-items:center;width:100%;max-width:var(--gov-modal-max-width, 52.5rem);height:100%;padding:0.5rem;border:none;background:transparent;transform:translate(-50%, -50%);pointer-events:none}.gov-modal__inner{position:relative;display:flex;flex-direction:column;width:100%;max-height:100%;border-radius:var(--gov-border-radius, 0.1875rem);background:var(--gov-modal-bg, var(--gov-color-neutral-white));overflow:hidden;pointer-events:auto;box-shadow:0 0 1.5rem rgba(var(--gov-color-secondary-800-rgb), 0.24)}.gov-modal__header{display:flex;gap:1rem;align-items:flex-start;padding:1.5rem 1rem;border-bottom:var(--gov-modal-border-color, 0.0625rem solid var(--gov-color-secondary-500))}.gov-modal__icon{flex:0 0 auto;padding-top:calc((var(--gov-text-3xl-font-size) * 1.5 - 1.5rem) / 2)}.gov-modal__icon>*{width:1.5rem;height:1.5rem}.gov-modal__title{font-weight:var(--gov-text-3xl-font-weight);font-size:var(--gov-text-3xl-font-size);line-height:var(--gov-text-3xl-line-height);letter-spacing:var(--gov-text-3xl-letter-spacing);margin:0}.gov-modal__close{flex:0 0 auto;margin-left:auto}.gov-modal__content{height:100%;padding:1.5rem 1rem;color:var(--gov-modal-text-color, var(--gov-color-secondary-700));overflow:auto}.gov-modal__content>*:last-child{margin-bottom:0}.gov-modal__footer,.gov-modal__actions{padding:1.5rem 1rem;border-top:var(--gov-modal-border-color, 0.0625rem solid var(--gov-color-secondary-500))}.gov-modal__actions{display:flex;gap:0.5rem 1rem;flex-wrap:wrap;justify-content:flex-end}.gov-modal__dialog:focus .gov-modal__inner{outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base)}.gov-modal[open=\"\"],.gov-modal[open=true i],.gov-modal[open=\"1\"]{display:block}@media (min-width: 30em){.gov-modal__dialog{max-width:calc(var(--gov-modal-max-width, 52.5rem) + 3rem);padding:1.5rem}.gov-modal__dialog:focus{outline-offset:-1.5rem}.gov-modal__inner{box-shadow:0 0 2rem rgba(var(--gov-color-secondary-800-rgb), 0.32)}.gov-modal--prompt .gov-modal__dialog{max-width:calc(var(--gov-modal-prompt-max-width, 33.125rem) + 3rem)}}@media (min-width: 48em){.gov-modal__header{gap:1.25rem;padding:2rem 2.5rem 2rem 3rem}.gov-modal__content{padding:2rem 3rem}.gov-modal__footer{padding:1rem 3rem}.gov-modal--prompt .gov-modal__header,.gov-modal--prompt .gov-modal__content,.gov-modal--prompt .gov-modal__footer,.gov-modal--prompt .gov-modal__actions{padding:1.5rem}}";

const GovModal = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govClose = index.createEvent(this, "gov-close", 7);
    this.open = false;
    this.blockClose = false;
    this.label = undefined;
    this.role = 'dialog';
    this.labelTag = 'h2';
    this.wcagLabelledBy = undefined;
    this.wcagDescribedBy = undefined;
    this.wcagCloseLabel = 'Zavřít okno';
    this.wcagCloseLabelledBy = undefined;
    this.h = template.govHost(this.host);
    this.labelId = string_utils.createID('GovModalLabel');
    this.contentId = string_utils.createID('GovModalContent');
  }
  validateLabelTag(newValue) {
    const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    if (newValue) {
      if (!validTags.includes(newValue)) {
        gov_log.govErrorLog(`[${constants.ModalClass.root}]: Tag ${newValue} is not allowed.`);
      }
    }
  }
  watchOpen(newValue) {
    this.open = newValue;
  }
  showModal() {
    this.open = true;
    document.body.classList.add(constants.ModalClass.bodyFix);
  }
  hideModal() {
    this.open = false;
    document.body.classList.remove(constants.ModalClass.bodyFix);
  }
  async componentWillRender() {
    if (this.open) {
      this.showModal();
    }
    else {
      this.hideModal();
    }
  }
  async componentDidRender() {
    if (win.canValidateWcagOnRender()) {
      await utils.delay(500);
      await this.validateWcag();
    }
  }
  render() {
    const LabelTag = this.labelTag;
    return (index.h(index.Host, { class: this.h.classes(constants.ModalClass.root), open: this.open }, index.h("dialog", { class: constants.ModalClass.dialog, hidden: !this.open, tabindex: "-1", open: this.open, "aria-modal": "true", "aria-hidden": template.toBoolAttr(!this.open), "aria-labelledby": this.wcagLabelledBy || this.labelId, "aria-describedby": this.wcagDescribedBy || this.contentId, role: this.role }, index.h("div", { class: constants.ModalClass.inner }, index.h("div", { class: constants.ModalClass.header }, this.h.hasSlot('icon') && (index.h("div", { class: constants.ModalClass.icon }, index.h("slot", { name: "icon" }))), this.label && (index.h(LabelTag, { class: constants.ModalClass.title, id: this.labelId }, this.label)), index.h("gov-button", { disabled: this.blockClose, class: constants.ModalClass.close, variant: "primary", wcagLabel: this.wcagCloseLabel, wcagLabelledBy: this.wcagCloseLabelledBy, type: "base", "on-gov-click": this.onCloseHandler.bind(this) }, index.h("gov-icon", { name: "x-lg" }))), index.h("div", { class: constants.ModalClass.content, id: this.contentId }, index.h("slot", null)), this.h.hasSlot('footer') && (index.h("div", { class: constants.ModalClass.footer }, index.h("slot", { name: "footer" }))))), this.open ? (index.h("gov-backdrop", { "wcag-label": this.wcagCloseLabel, "wcag-labelled-by": this.wcagCloseLabelledBy, "on-gov-click": this.onCloseHandler.bind(this) })) : null));
  }
  onCloseHandler(e) {
    e.stopPropagation();
    if (this.blockClose === false) {
      this.hideModal();
      this.govClose.emit(e);
    }
  }
  /**
   * Showing the modal
   */
  async show() {
    this.showModal();
  }
  /**
   * Hiding the modal
   */
  async hide() {
    this.hideModal();
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    wcag.validateWcagRef(this.wcagLabelledBy, 'wcag-labelled-by', constants.ModalClass.root);
    wcag.validateWcagRef(this.wcagDescribedBy, 'wcag-described-by', constants.ModalClass.root);
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "labelTag": ["validateLabelTag"],
    "open": ["watchOpen"]
  }; }
};
GovModal.style = govModalCss;

exports.gov_modal = GovModal;

//# sourceMappingURL=gov-modal.cjs.entry.js.map