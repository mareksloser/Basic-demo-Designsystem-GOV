import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { v as validateProp } from './props-a85d9c89.js';
import { V as Variants } from './variants-2b936d58.js';
import { p as pick } from './utils-c057a3fa.js';
import { g as govHost } from './template-df429738.js';
import './gov.log-49da0221.js';
import './win-1dbd3f5c.js';

pick(Variants, ['PRIMARY', 'SECONDARY', 'WARNING', 'ERROR', 'SUCCESS']);
const MessageClass = {
  root: 'gov-message',
  icon: 'gov-message__icon',
  content: 'gov-message__content',
  close: 'gov-message__close',
};

const govMessageCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-message{position:relative;display:flex;gap:1rem;flex-direction:column;padding:0.75rem 1rem;border-left:0.25rem solid transparent;background:var(--gov-toast-message-bg, var(--gov-color-neutral-white))}.gov-message__icon{flex:0 0 1.25rem;width:1.25rem;height:1.25rem}.gov-message__content{flex:1 1 auto}.gov-message__content>*:last-child{margin-bottom:0}.gov-message__content p{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing)}@media (min-width: 30em){.gov-message{flex-direction:row}}.gov-message[shadow=\"\"],.gov-message[shadow=true i],.gov-message[shadow=\"1\"]{box-shadow:var(--gov-message-box-shadow, 0 0.25rem 1.25rem rgba(0, 0, 0, 0.1))}.gov-message[variant=warning]{border-left-color:var(--gov-message-warning-color, var(--gov-color-warning));background:var(--gov-message-warning-bg-color, var(--gov-color-warning-100))}.gov-message[variant=warning] .gov-message__icon{color:var(--gov-message-warning-color, var(--gov-color-warning))}.gov-message[variant=warning][inverse=\"\"],.gov-message[variant=warning][inverse=true i],.gov-message[variant=warning][inverse=\"1\"]{background:var(--gov-message-bg-inverse, var(--gov-color-neutral-white))}.gov-message[variant=error]{border-left-color:var(--gov-message-error-color, var(--gov-color-error));background:var(--gov-message-error-bg-color, var(--gov-color-error-100))}.gov-message[variant=error] .gov-message__icon{color:var(--gov-message-error-color, var(--gov-color-error))}.gov-message[variant=error][inverse=\"\"],.gov-message[variant=error][inverse=true i],.gov-message[variant=error][inverse=\"1\"]{background:var(--gov-message-bg-inverse, var(--gov-color-neutral-white))}.gov-message[variant=secondary]{border-left-color:var(--gov-message-secondary-color, var(--gov-color-secondary));background:var(--gov-message-secondary-bg-color, var(--gov-color-secondary-200))}.gov-message[variant=secondary] .gov-message__icon{color:var(--gov-message-secondary-color, var(--gov-color-secondary))}.gov-message[variant=secondary][inverse=\"\"],.gov-message[variant=secondary][inverse=true i],.gov-message[variant=secondary][inverse=\"1\"]{background:var(--gov-message-bg-inverse, var(--gov-color-neutral-white))}.gov-message[variant=success]{border-left-color:var(--gov-message-success-color, var(--gov-color-success));background:var(--gov-message-success-bg-color, var(--gov-color-success-100))}.gov-message[variant=success] .gov-message__icon{color:var(--gov-message-success-color, var(--gov-color-success))}.gov-message[variant=success][inverse=\"\"],.gov-message[variant=success][inverse=true i],.gov-message[variant=success][inverse=\"1\"]{background:var(--gov-message-bg-inverse, var(--gov-color-neutral-white))}.gov-message[variant=primary]{border-left-color:var(--gov-message-primary-color, var(--gov-color-primary));background:var(--gov-message-primary-bg-color, var(--gov-color-primary-100))}.gov-message[variant=primary] .gov-message__icon{color:var(--gov-message-primary-color, var(--gov-color-primary))}.gov-message[variant=primary][inverse=\"\"],.gov-message[variant=primary][inverse=true i],.gov-message[variant=primary][inverse=\"1\"]{background:var(--gov-message-bg-inverse, var(--gov-color-neutral-white))}";

const GovMessage = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.variant = Variants.PRIMARY;
    this.h = govHost(this.host);
  }
  validateVariant(newValue) {
    validateProp(Variants, newValue, MessageClass.root);
  }
  render() {
    return (h(Host, { class: this.h.classes(MessageClass.root), variant: this.variant, role: "alert" }, this.h.hasSlot("icon") && (h("span", { class: MessageClass.icon }, h("slot", { name: "icon" }))), h("div", { class: MessageClass.content }, h("slot", null))));
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"]
  }; }
};
GovMessage.style = govMessageCss;

export { GovMessage as gov_message };

//# sourceMappingURL=gov-message.entry.js.map