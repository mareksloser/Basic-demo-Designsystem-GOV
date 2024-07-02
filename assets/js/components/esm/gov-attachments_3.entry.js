import { r as registerInstance, h, a as Host, g as getElement, c as createEvent } from './index-eb59f132.js';
import { c as validateWcagProp, v as validateWcagLabel } from './wcag-7d25e12b.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { d as delay } from './utils-c057a3fa.js';
import { g as govHost } from './template-df429738.js';
import { F as FormMessageClass, a as FormMessageVariants } from './constants-3df712e2.js';
import { v as validateProp } from './props-a85d9c89.js';
import { c as createID } from './string.utils-f268fc6b.js';
import './gov.log-49da0221.js';
import './variants-2b936d58.js';

const AttachmentsClass = {
  root: 'gov-attachments',
  label: 'gov-attachments__label',
  list: 'gov-attachments__list',
};
const AttachmentsItemClass = {
  root: 'gov-attachments-item',
  name: 'gov-attachments-item__name',
  file: 'gov-attachments-item__file',
  messages: 'gov-attachments-item__messages',
};

const govAttachmentsCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-attachments{position:relative;display:block;width:100%}.gov-attachments__label{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);color:var(--gov-form-label-color, #686868)}.gov-attachments__list>*:last-child{margin-bottom:0}";

const GovAttachments = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.label = undefined;
    this.wcagLabel = undefined;
    this.h = govHost(this.host);
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (h(Host, { class: this.h.classes(AttachmentsClass.root) }, this.label ? h("p", { class: AttachmentsClass.label }, this.label) : null, h("div", { class: AttachmentsClass.list, role: "list", "aria-label": this.wcagLabel }, h("slot", null))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagProp(this.wcagLabel, 'wcag-label', AttachmentsClass.root);
  }
  get host() { return getElement(this); }
};
GovAttachments.style = govAttachmentsCss;

const govAttachmentsItemCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-attachments-item{position:relative;display:block;width:100%;margin:0rem 0rem 0.5rem}.gov-attachments-item__messages>*:last-child{margin-bottom:0}.gov-attachments-item__file{display:flex;gap:1rem}.gov-attachments-item__name{display:flex;gap:0 0.5rem;flex-wrap:wrap;align-items:center;align-self:center;margin:0;color:var(--gov-attachments-name-color, var(--gov-color-primary))}.gov-attachments-item__name span{font-weight:var(--gov-text-xs-font-weight);font-size:var(--gov-text-xs-font-size);line-height:var(--gov-text-xs-line-height);letter-spacing:var(--gov-text-xs-letter-spacing);color:var(--gov-attachments-decor-color, var(--gov-color-secondary-700))}";

const GovAttachmentsItem = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govRemove = createEvent(this, "gov-remove", 7);
    this.wcagRemoveLabel = undefined;
    this.wcagRemoveLabelledBy = undefined;
    this.h = govHost(this.host);
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (h(Host, { class: this.h.classes(AttachmentsItemClass.root), role: "listitem" }, h("div", { class: AttachmentsItemClass.file }, h("p", { class: AttachmentsItemClass.name }, h("slot", null), h("slot", { name: "info" })), h("gov-button", { variant: "primary", type: "base", size: "s", "wcag-label": this.wcagRemoveLabel, "wcag-labelled-by": this.wcagRemoveLabelledBy, "on-gov-click": this.govRemove.emit }, h("gov-icon", { slot: "left-icon", name: "x-lg" }))), this.h.hasSlot('message') && (h("div", { class: AttachmentsItemClass.messages }, h("slot", { name: "message" })))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagRemoveLabel, this.wcagRemoveLabelledBy, AttachmentsItemClass.root);
  }
  get host() { return getElement(this); }
};
GovAttachmentsItem.style = govAttachmentsItemCss;

const govFormMessageCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-message{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);display:flex;gap:0.5rem;margin:0rem 0rem 1rem}.gov-form-message__icon{position:relative;top:calc(var(--gov-text-s-font-size) / 6);display:flex}.gov-form-message__icon>*{width:calc(var(--gov-text-s-font-size) * 1.167);height:calc(var(--gov-text-s-font-size) * 1.167)}.gov-form-message[variant=error]{color:var(--gov-form-message-error-color, var(--gov-color-error-400))}.gov-form-message[variant=secondary]{color:var(--gov-form-message-secondary-color, var(--gov-color-secondary-700))}.gov-form-message[variant=warning]{color:var(--gov-form-message-warning-color, var(--gov-color-warning-500))}.gov-form-message[variant=success]{color:var(--gov-form-message-success-color, var(--gov-color-success-500))}";

const GovFormMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.variant = 'secondary';
    this.h = govHost(this.host);
    this.messageId = createID('GovFormMessage');
  }
  validateVariant(newValue) {
    validateProp(FormMessageVariants, newValue, FormMessageClass.root);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
  }
  render() {
    return (h(Host, { class: this.h.classes(FormMessageClass.root), variant: this.variant }, this.h.hasSlot('icon') && (h("span", { class: FormMessageClass.icon }, h("slot", { name: "icon" }))), h("span", { id: this.messageId, class: FormMessageClass.content }, h("slot", null))));
  }
  /**
   * Returns unique identfiier of message
   */
  async identifier() {
    return this.messageId;
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"]
  }; }
};
GovFormMessage.style = govFormMessageCss;

export { GovAttachments as gov_attachments, GovAttachmentsItem as gov_attachments_item, GovFormMessage as gov_form_message };

//# sourceMappingURL=gov-attachments_3.entry.js.map