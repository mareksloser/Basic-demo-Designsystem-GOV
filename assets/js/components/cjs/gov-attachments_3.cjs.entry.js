'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const wcag = require('./wcag-e6257f27.js');
const win = require('./win-5521073d.js');
const utils = require('./utils-c9b1bba3.js');
const template = require('./template-4b951d1d.js');
const constants = require('./constants-caad94b4.js');
const props = require('./props-d6146e54.js');
const string_utils = require('./string.utils-0f08c48c.js');
require('./gov.log-b842920d.js');
require('./variants-f5ffeef3.js');

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
    index.registerInstance(this, hostRef);
    this.label = undefined;
    this.wcagLabel = undefined;
    this.h = template.govHost(this.host);
  }
  async componentDidRender() {
    if (win.canValidateWcagOnRender()) {
      await utils.delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(AttachmentsClass.root) }, this.label ? index.h("p", { class: AttachmentsClass.label }, this.label) : null, index.h("div", { class: AttachmentsClass.list, role: "list", "aria-label": this.wcagLabel }, index.h("slot", null))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    wcag.validateWcagProp(this.wcagLabel, 'wcag-label', AttachmentsClass.root);
  }
  get host() { return index.getElement(this); }
};
GovAttachments.style = govAttachmentsCss;

const govAttachmentsItemCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-attachments-item{position:relative;display:block;width:100%;margin:0rem 0rem 0.5rem}.gov-attachments-item__messages>*:last-child{margin-bottom:0}.gov-attachments-item__file{display:flex;gap:1rem}.gov-attachments-item__name{display:flex;gap:0 0.5rem;flex-wrap:wrap;align-items:center;align-self:center;margin:0;color:var(--gov-attachments-name-color, var(--gov-color-primary))}.gov-attachments-item__name span{font-weight:var(--gov-text-xs-font-weight);font-size:var(--gov-text-xs-font-size);line-height:var(--gov-text-xs-line-height);letter-spacing:var(--gov-text-xs-letter-spacing);color:var(--gov-attachments-decor-color, var(--gov-color-secondary-700))}";

const GovAttachmentsItem = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govRemove = index.createEvent(this, "gov-remove", 7);
    this.wcagRemoveLabel = undefined;
    this.wcagRemoveLabelledBy = undefined;
    this.h = template.govHost(this.host);
  }
  async componentDidRender() {
    if (win.canValidateWcagOnRender()) {
      await utils.delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(AttachmentsItemClass.root), role: "listitem" }, index.h("div", { class: AttachmentsItemClass.file }, index.h("p", { class: AttachmentsItemClass.name }, index.h("slot", null), index.h("slot", { name: "info" })), index.h("gov-button", { variant: "primary", type: "base", size: "s", "wcag-label": this.wcagRemoveLabel, "wcag-labelled-by": this.wcagRemoveLabelledBy, "on-gov-click": this.govRemove.emit }, index.h("gov-icon", { slot: "left-icon", name: "x-lg" }))), this.h.hasSlot('message') && (index.h("div", { class: AttachmentsItemClass.messages }, index.h("slot", { name: "message" })))));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    wcag.validateWcagLabel(this.wcagRemoveLabel, this.wcagRemoveLabelledBy, AttachmentsItemClass.root);
  }
  get host() { return index.getElement(this); }
};
GovAttachmentsItem.style = govAttachmentsItemCss;

const govFormMessageCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-message{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);display:flex;gap:0.5rem;margin:0rem 0rem 1rem}.gov-form-message__icon{position:relative;top:calc(var(--gov-text-s-font-size) / 6);display:flex}.gov-form-message__icon>*{width:calc(var(--gov-text-s-font-size) * 1.167);height:calc(var(--gov-text-s-font-size) * 1.167)}.gov-form-message[variant=error]{color:var(--gov-form-message-error-color, var(--gov-color-error-400))}.gov-form-message[variant=secondary]{color:var(--gov-form-message-secondary-color, var(--gov-color-secondary-700))}.gov-form-message[variant=warning]{color:var(--gov-form-message-warning-color, var(--gov-color-warning-500))}.gov-form-message[variant=success]{color:var(--gov-form-message-success-color, var(--gov-color-success-500))}";

const GovFormMessage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.variant = 'secondary';
    this.h = template.govHost(this.host);
    this.messageId = string_utils.createID('GovFormMessage');
  }
  validateVariant(newValue) {
    props.validateProp(constants.FormMessageVariants, newValue, constants.FormMessageClass.root);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(constants.FormMessageClass.root), variant: this.variant }, this.h.hasSlot('icon') && (index.h("span", { class: constants.FormMessageClass.icon }, index.h("slot", { name: "icon" }))), index.h("span", { id: this.messageId, class: constants.FormMessageClass.content }, index.h("slot", null))));
  }
  /**
   * Returns unique identfiier of message
   */
  async identifier() {
    return this.messageId;
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"]
  }; }
};
GovFormMessage.style = govFormMessageCss;

exports.gov_attachments = GovAttachments;
exports.gov_attachments_item = GovAttachmentsItem;
exports.gov_form_message = GovFormMessage;

//# sourceMappingURL=gov-attachments_3.cjs.entry.js.map