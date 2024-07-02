'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const props = require('./props-d6146e54.js');
const variants = require('./variants-f5ffeef3.js');
const utils = require('./utils-c9b1bba3.js');
const template = require('./template-4b951d1d.js');
require('./gov.log-b842920d.js');
require('./win-5521073d.js');

utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY', 'WARNING', 'ERROR', 'SUCCESS']);
const MessageClass = {
  root: 'gov-message',
  icon: 'gov-message__icon',
  content: 'gov-message__content',
  close: 'gov-message__close',
};

const govMessageCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-message{position:relative;display:flex;gap:1rem;flex-direction:column;padding:0.75rem 1rem;border-left:0.25rem solid transparent;background:var(--gov-toast-message-bg, var(--gov-color-neutral-white))}.gov-message__icon{flex:0 0 1.25rem;width:1.25rem;height:1.25rem}.gov-message__content{flex:1 1 auto}.gov-message__content>*:last-child{margin-bottom:0}.gov-message__content p{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing)}@media (min-width: 30em){.gov-message{flex-direction:row}}.gov-message[shadow=\"\"],.gov-message[shadow=true i],.gov-message[shadow=\"1\"]{box-shadow:var(--gov-message-box-shadow, 0 0.25rem 1.25rem rgba(0, 0, 0, 0.1))}.gov-message[variant=warning]{border-left-color:var(--gov-message-warning-color, var(--gov-color-warning));background:var(--gov-message-warning-bg-color, var(--gov-color-warning-100))}.gov-message[variant=warning] .gov-message__icon{color:var(--gov-message-warning-color, var(--gov-color-warning))}.gov-message[variant=warning][inverse=\"\"],.gov-message[variant=warning][inverse=true i],.gov-message[variant=warning][inverse=\"1\"]{background:var(--gov-message-bg-inverse, var(--gov-color-neutral-white))}.gov-message[variant=error]{border-left-color:var(--gov-message-error-color, var(--gov-color-error));background:var(--gov-message-error-bg-color, var(--gov-color-error-100))}.gov-message[variant=error] .gov-message__icon{color:var(--gov-message-error-color, var(--gov-color-error))}.gov-message[variant=error][inverse=\"\"],.gov-message[variant=error][inverse=true i],.gov-message[variant=error][inverse=\"1\"]{background:var(--gov-message-bg-inverse, var(--gov-color-neutral-white))}.gov-message[variant=secondary]{border-left-color:var(--gov-message-secondary-color, var(--gov-color-secondary));background:var(--gov-message-secondary-bg-color, var(--gov-color-secondary-200))}.gov-message[variant=secondary] .gov-message__icon{color:var(--gov-message-secondary-color, var(--gov-color-secondary))}.gov-message[variant=secondary][inverse=\"\"],.gov-message[variant=secondary][inverse=true i],.gov-message[variant=secondary][inverse=\"1\"]{background:var(--gov-message-bg-inverse, var(--gov-color-neutral-white))}.gov-message[variant=success]{border-left-color:var(--gov-message-success-color, var(--gov-color-success));background:var(--gov-message-success-bg-color, var(--gov-color-success-100))}.gov-message[variant=success] .gov-message__icon{color:var(--gov-message-success-color, var(--gov-color-success))}.gov-message[variant=success][inverse=\"\"],.gov-message[variant=success][inverse=true i],.gov-message[variant=success][inverse=\"1\"]{background:var(--gov-message-bg-inverse, var(--gov-color-neutral-white))}.gov-message[variant=primary]{border-left-color:var(--gov-message-primary-color, var(--gov-color-primary));background:var(--gov-message-primary-bg-color, var(--gov-color-primary-100))}.gov-message[variant=primary] .gov-message__icon{color:var(--gov-message-primary-color, var(--gov-color-primary))}.gov-message[variant=primary][inverse=\"\"],.gov-message[variant=primary][inverse=true i],.gov-message[variant=primary][inverse=\"1\"]{background:var(--gov-message-bg-inverse, var(--gov-color-neutral-white))}";

const GovMessage = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.variant = variants.Variants.PRIMARY;
    this.h = template.govHost(this.host);
  }
  validateVariant(newValue) {
    props.validateProp(variants.Variants, newValue, MessageClass.root);
  }
  render() {
    return (index.h(index.Host, { class: this.h.classes(MessageClass.root), variant: this.variant, role: "alert" }, this.h.hasSlot("icon") && (index.h("span", { class: MessageClass.icon }, index.h("slot", { name: "icon" }))), index.h("div", { class: MessageClass.content }, index.h("slot", null))));
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"]
  }; }
};
GovMessage.style = govMessageCss;

exports.gov_message = GovMessage;

//# sourceMappingURL=gov-message.cjs.entry.js.map