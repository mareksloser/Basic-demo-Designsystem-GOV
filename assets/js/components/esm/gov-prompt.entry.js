import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { g as govHost, a as toBoolAttr } from './template-df429738.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { a as govErrorLog } from './gov.log-49da0221.js';
import { a as validateWcagRef } from './wcag-7d25e12b.js';
import { c as createID } from './string.utils-f268fc6b.js';
import { d as delay } from './utils-c057a3fa.js';
import { M as ModalClass } from './constants-2a283e9a.js';

const govPromptCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-modal{display:none}.gov-modal__dialog{z-index:101;position:fixed;top:50%;left:50%;display:flex;justify-content:center;align-items:center;width:100%;max-width:var(--gov-modal-max-width, 52.5rem);height:100%;padding:0.5rem;border:none;background:transparent;transform:translate(-50%, -50%);pointer-events:none}.gov-modal__inner{position:relative;display:flex;flex-direction:column;width:100%;max-height:100%;border-radius:var(--gov-border-radius, 0.1875rem);background:var(--gov-modal-bg, var(--gov-color-neutral-white));overflow:hidden;pointer-events:auto;box-shadow:0 0 1.5rem rgba(var(--gov-color-secondary-800-rgb), 0.24)}.gov-modal__header{display:flex;gap:1rem;align-items:flex-start;padding:1.5rem 1rem;border-bottom:var(--gov-modal-border-color, 0.0625rem solid var(--gov-color-secondary-500))}.gov-modal__icon{flex:0 0 auto;padding-top:calc((var(--gov-text-3xl-font-size) * 1.5 - 1.5rem) / 2)}.gov-modal__icon>*{width:1.5rem;height:1.5rem}.gov-modal__title{font-weight:var(--gov-text-3xl-font-weight);font-size:var(--gov-text-3xl-font-size);line-height:var(--gov-text-3xl-line-height);letter-spacing:var(--gov-text-3xl-letter-spacing);margin:0}.gov-modal__close{flex:0 0 auto;margin-left:auto}.gov-modal__content{height:100%;padding:1.5rem 1rem;color:var(--gov-modal-text-color, var(--gov-color-secondary-700));overflow:auto}.gov-modal__content>*:last-child{margin-bottom:0}.gov-modal__footer,.gov-modal__actions{padding:1.5rem 1rem;border-top:var(--gov-modal-border-color, 0.0625rem solid var(--gov-color-secondary-500))}.gov-modal__actions{display:flex;gap:0.5rem 1rem;flex-wrap:wrap;justify-content:flex-end}.gov-modal__dialog:focus .gov-modal__inner{outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base)}.gov-modal[open=\"\"],.gov-modal[open=true i],.gov-modal[open=\"1\"]{display:block}@media (min-width: 30em){.gov-modal__dialog{max-width:calc(var(--gov-modal-max-width, 52.5rem) + 3rem);padding:1.5rem}.gov-modal__dialog:focus{outline-offset:-1.5rem}.gov-modal__inner{box-shadow:0 0 2rem rgba(var(--gov-color-secondary-800-rgb), 0.32)}.gov-modal--prompt .gov-modal__dialog{max-width:calc(var(--gov-modal-prompt-max-width, 33.125rem) + 3rem)}}@media (min-width: 48em){.gov-modal__header{gap:1.25rem;padding:2rem 2.5rem 2rem 3rem}.gov-modal__content{padding:2rem 3rem}.gov-modal__footer{padding:1rem 3rem}.gov-modal--prompt .gov-modal__header,.gov-modal--prompt .gov-modal__content,.gov-modal--prompt .gov-modal__footer,.gov-modal--prompt .gov-modal__actions{padding:1.5rem}}";

const GovPrompt = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govClose = createEvent(this, "gov-close", 7);
    this.open = false;
    this.label = undefined;
    this.role = 'dialog';
    this.labelTag = 'h2';
    this.wcagLabelledBy = undefined;
    this.wcagDescribedBy = undefined;
    this.wcagCloseLabel = 'Zavřít okno';
    this.wcagCloseLabelledBy = undefined;
    this.h = govHost(this.host);
    this.labelId = createID('GovPromptLabel');
    this.contentId = createID('GovPromptContent');
  }
  validateLabelTag(newValue) {
    const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    if (newValue) {
      if (!validTags.includes(newValue)) {
        govErrorLog(`[${ModalClass.root}]: Tag ${newValue} is not allowed.`);
      }
    }
  }
  watchOpen(newValue) {
    this.open = newValue;
  }
  showModal() {
    this.open = true;
    document.body.classList.add(ModalClass.bodyFix);
  }
  hideModal() {
    this.open = false;
    document.body.classList.remove(ModalClass.bodyFix);
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
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    const LabelTag = this.labelTag;
    return (h(Host, { class: this.h.classes(ModalClass.rootPrompt), open: this.open }, h("dialog", { class: ModalClass.dialog, hidden: !this.open, tabindex: "-1", open: this.open, "aria-modal": "true", "aria-hidden": toBoolAttr(!this.open), "aria-labelledby": this.wcagLabelledBy || this.labelId, "aria-describedby": this.wcagDescribedBy || this.contentId, role: this.role }, h("div", { class: ModalClass.inner }, h("div", { class: ModalClass.header }, this.h.hasSlot('icon') && (h("div", { class: ModalClass.icon }, h("slot", { name: "icon" }))), this.label && (h(LabelTag, { class: ModalClass.title, id: this.labelId }, this.label)), h("gov-button", { class: ModalClass.close, variant: "primary", wcagLabel: this.wcagCloseLabel, wcagLabelledBy: this.wcagCloseLabelledBy, type: "base", "on-gov-click": this.onCloseHandler.bind(this) }, h("gov-icon", { name: "x-lg" }))), h("div", { class: ModalClass.content, id: this.contentId }, h("slot", null)), h("div", { class: ModalClass.actions }, h("slot", { name: "actions" })))), this.open ? (h("gov-backdrop", { "wcag-label": this.wcagCloseLabel, "wcag-labelled-by": this.wcagCloseLabelledBy, "on-gov-click": this.onCloseHandler.bind(this) })) : null));
  }
  onCloseHandler(e) {
    e.stopPropagation();
    this.hideModal();
    this.govClose.emit(e);
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
    validateWcagRef(this.wcagLabelledBy, 'wcag-labelled-by', ModalClass.root);
    validateWcagRef(this.wcagDescribedBy, 'wcag-described-by', ModalClass.root);
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "labelTag": ["validateLabelTag"],
    "open": ["watchOpen"]
  }; }
};
GovPrompt.style = govPromptCss;

export { GovPrompt as gov_prompt };

//# sourceMappingURL=gov-prompt.entry.js.map