import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { g as govHost, a as toBoolAttr } from './template-df429738.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { F as Fragment } from './Fragment-8d8d54fb.js';
import { v as validateProp } from './props-a85d9c89.js';
import { c as validateWcagProp } from './wcag-7d25e12b.js';
import { p as pick, d as delay } from './utils-c057a3fa.js';
import { V as Variants } from './variants-2b936d58.js';
import './gov.log-49da0221.js';
import './string.utils-f268fc6b.js';

const InfobarVariants = pick(Variants, ['PRIMARY', 'SECONDARY', 'WARNING', 'ERROR', 'SUCCESS']);
const InfobarClass = {
  root: 'gov-infobar',
  section: 'gov-infobar__section',
  icon: 'gov-infobar__icon',
  content: 'gov-infobar__content',
  closable: 'gov-infobar__content--closable',
  headline: 'gov-infobar__headline',
  close: 'gov-infobar__close',
};

const govInfobarCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-infobar{position:relative;display:block;width:100%}.gov-infobar__section{display:flex;gap:1rem;padding:1rem}.gov-infobar__icon{flex:0 0 auto}.gov-infobar__icon>*{width:1.25rem;height:1.25rem}.gov-infobar__headline{display:flex;gap:1rem}.gov-infobar__headline+div{margin-top:0.5rem}.gov-infobar__headline p{margin-bottom:0}.gov-infobar__headline gov-button{margin-top:-0.25rem}.gov-infobar__content{width:100%}.gov-infobar__content>*:last-child{margin-bottom:0}.gov-infobar__content--closable{padding-right:3.5rem}.gov-infobar__content p{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing)}.gov-infobar__content a{color:inherit}@media not all and (pointer: coarse){.gov-infobar__content a:hover{color:inherit}}.gov-infobar__content a .gov-icon{color:inherit}.gov-infobar__close{position:absolute;top:0.875rem;right:1rem}.gov-infobar[variant=warning]{background-color:var(--gov-infobar-warning-bg-color, var(--gov-color-warning))}.gov-infobar[variant=warning] .gov-infobar__icon{color:var(--gov-infobar-warning-icon-color, var(--gov-color-secondary))}.gov-infobar[variant=warning] .gov-infobar__content{color:var(--gov-infobar-warning-text-color, var(--gov-color-secondary))}.gov-infobar[variant=warning][inverse=\"\"],.gov-infobar[variant=warning][inverse=true i],.gov-infobar[variant=warning][inverse=\"1\"]{border-bottom:var(--gov-infobar-border, 0.0625rem solid var(--gov-color-secondary-400));background-color:var(--gov-infobar-inverse-bg, var(--gov-color-neutral-white))}.gov-infobar[variant=warning][inverse=\"\"] .gov-infobar__icon,.gov-infobar[variant=warning][inverse=true i] .gov-infobar__icon,.gov-infobar[variant=warning][inverse=\"1\"] .gov-infobar__icon{color:var(--gov-infobar-warning-bg-color, var(--gov-color-warning))}.gov-infobar[variant=warning][inverse=\"\"] .gov-infobar__content,.gov-infobar[variant=warning][inverse=true i] .gov-infobar__content,.gov-infobar[variant=warning][inverse=\"1\"] .gov-infobar__content{color:var(--gov-infobar-inverse-color, var(--gov-color-secondary-800))}.gov-infobar[variant=error]{background-color:var(--gov-infobar-error-bg-color, var(--gov-color-error))}.gov-infobar[variant=error] .gov-infobar__icon{color:var(--gov-infobar-error-icon-color, var(--gov-color-neutral-white))}.gov-infobar[variant=error] .gov-infobar__content{color:var(--gov-infobar-error-text-color, var(--gov-color-neutral-white))}.gov-infobar[variant=error][inverse=\"\"],.gov-infobar[variant=error][inverse=true i],.gov-infobar[variant=error][inverse=\"1\"]{border-bottom:var(--gov-infobar-border, 0.0625rem solid var(--gov-color-secondary-400));background-color:var(--gov-infobar-inverse-bg, var(--gov-color-neutral-white))}.gov-infobar[variant=error][inverse=\"\"] .gov-infobar__icon,.gov-infobar[variant=error][inverse=true i] .gov-infobar__icon,.gov-infobar[variant=error][inverse=\"1\"] .gov-infobar__icon{color:var(--gov-infobar-error-bg-color, var(--gov-color-error))}.gov-infobar[variant=error][inverse=\"\"] .gov-infobar__content,.gov-infobar[variant=error][inverse=true i] .gov-infobar__content,.gov-infobar[variant=error][inverse=\"1\"] .gov-infobar__content{color:var(--gov-infobar-inverse-color, var(--gov-color-secondary-800))}.gov-infobar[variant=secondary]{background-color:var(--gov-infobar-secondary-bg-color, var(--gov-color-secondary))}.gov-infobar[variant=secondary] .gov-infobar__icon{color:var(--gov-infobar-secondary-icon-color, var(--gov-color-neutral-white))}.gov-infobar[variant=secondary] .gov-infobar__content{color:var(--gov-infobar-secondary-text-color, var(--gov-color-neutral-white))}.gov-infobar[variant=secondary][inverse=\"\"],.gov-infobar[variant=secondary][inverse=true i],.gov-infobar[variant=secondary][inverse=\"1\"]{border-bottom:var(--gov-infobar-border, 0.0625rem solid var(--gov-color-secondary-400));background-color:var(--gov-infobar-inverse-bg, var(--gov-color-neutral-white))}.gov-infobar[variant=secondary][inverse=\"\"] .gov-infobar__icon,.gov-infobar[variant=secondary][inverse=true i] .gov-infobar__icon,.gov-infobar[variant=secondary][inverse=\"1\"] .gov-infobar__icon{color:var(--gov-infobar-secondary-bg-color, var(--gov-color-secondary))}.gov-infobar[variant=secondary][inverse=\"\"] .gov-infobar__content,.gov-infobar[variant=secondary][inverse=true i] .gov-infobar__content,.gov-infobar[variant=secondary][inverse=\"1\"] .gov-infobar__content{color:var(--gov-infobar-inverse-color, var(--gov-color-secondary-800))}.gov-infobar[variant=success]{background-color:var(--gov-infobar-success-bg-color, var(--gov-color-success-500))}.gov-infobar[variant=success] .gov-infobar__icon{color:var(--gov-infobar-success-icon-color, var(--gov-color-neutral-white))}.gov-infobar[variant=success] .gov-infobar__content{color:var(--gov-infobar-success-text-color, var(--gov-color-neutral-white))}.gov-infobar[variant=success][inverse=\"\"],.gov-infobar[variant=success][inverse=true i],.gov-infobar[variant=success][inverse=\"1\"]{border-bottom:var(--gov-infobar-border, 0.0625rem solid var(--gov-color-secondary-400));background-color:var(--gov-infobar-inverse-bg, var(--gov-color-neutral-white))}.gov-infobar[variant=success][inverse=\"\"] .gov-infobar__icon,.gov-infobar[variant=success][inverse=true i] .gov-infobar__icon,.gov-infobar[variant=success][inverse=\"1\"] .gov-infobar__icon{color:var(--gov-infobar-success-bg-color, var(--gov-color-success-500))}.gov-infobar[variant=success][inverse=\"\"] .gov-infobar__content,.gov-infobar[variant=success][inverse=true i] .gov-infobar__content,.gov-infobar[variant=success][inverse=\"1\"] .gov-infobar__content{color:var(--gov-infobar-inverse-color, var(--gov-color-secondary-800))}.gov-infobar[variant=primary]{background-color:var(--gov-infobar-primary-bg-color, var(--gov-color-primary))}.gov-infobar[variant=primary] .gov-infobar__icon{color:var(--gov-infobar-primary-icon-color, var(--gov-color-neutral-white))}.gov-infobar[variant=primary] .gov-infobar__content{color:var(--gov-infobar-primary-text-color, var(--gov-color-neutral-white))}.gov-infobar[variant=primary][inverse=\"\"],.gov-infobar[variant=primary][inverse=true i],.gov-infobar[variant=primary][inverse=\"1\"]{border-bottom:var(--gov-infobar-border, 0.0625rem solid var(--gov-color-secondary-400));background-color:var(--gov-infobar-inverse-bg, var(--gov-color-neutral-white))}.gov-infobar[variant=primary][inverse=\"\"] .gov-infobar__icon,.gov-infobar[variant=primary][inverse=true i] .gov-infobar__icon,.gov-infobar[variant=primary][inverse=\"1\"] .gov-infobar__icon{color:var(--gov-infobar-primary-bg-color, var(--gov-color-primary))}.gov-infobar[variant=primary][inverse=\"\"] .gov-infobar__content,.gov-infobar[variant=primary][inverse=true i] .gov-infobar__content,.gov-infobar[variant=primary][inverse=\"1\"] .gov-infobar__content{color:var(--gov-infobar-inverse-color, var(--gov-color-secondary-800))}";

const GovInfobar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govClose = createEvent(this, "gov-close", 7);
    this.headline = undefined;
    this.variant = 'primary';
    this.inverse = false;
    this.wcagCloseLabel = 'Zavřít informační lištu';
    this.wcagToggleLabel = 'Zobrazit více informací';
    this.closable = false;
    this.toggleContent = false;
    this.h = govHost(this.host);
  }
  validateVariant(newValue) {
    validateProp(InfobarVariants, newValue, InfobarClass.root);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  render() {
    let inverse = !this.inverse;
    let variant = this.inverse ? 'secondary' : this.variant;
    if (this.variant == 'warning') {
      inverse = false;
      variant = 'secondary';
    }
    const closeButton = (h("div", { class: InfobarClass.close }, h("gov-button", { size: "s", wcagLabel: this.wcagCloseLabel, type: "base", variant: variant, inverse: inverse, "on-gov-click": this.onCloseHandler.bind(this) }, h("gov-icon", { name: "x-lg" }))));
    return (h(Host, { class: this.h.classes(InfobarClass.root), variant: this.variant }, h("section", { class: InfobarClass.section, role: "infobar" }, this.h.hasSlot('icon') && (h("div", { class: InfobarClass.icon }, h("slot", { name: "icon" }))), h("div", { class: InfobarClass.content + (this.closable ? ' ' + InfobarClass.closable : '') }, this.headline ? (h(Fragment, null, h("div", { class: InfobarClass.headline }, h("p", null, this.headline), h("gov-button", { size: "s", wcagLabel: this.wcagToggleLabel, type: "base", variant: variant, inverse: inverse, "on-gov-click": () => (this.toggleContent = !this.toggleContent) }, h("gov-icon", { name: this.toggleContent ? 'chevron-up' : 'chevron-down' }))), h("div", { hidden: !this.toggleContent, "aria-hidden": toBoolAttr(this.toggleContent) }, h("slot", null)))) : (h("slot", null)))), this.closable && closeButton));
  }
  onCloseHandler(e) {
    this.govClose.emit({
      component: InfobarClass.root,
      ref: this.host,
      originalEvent: e,
    });
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    if (this.closable) {
      validateWcagProp(this.wcagCloseLabel, 'wcag-close-label', InfobarClass.root);
    }
    if (this.headline) {
      validateWcagProp(this.wcagToggleLabel, 'wcag-toggle-label', InfobarClass.root);
    }
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"]
  }; }
};
GovInfobar.style = govInfobarCss;

export { GovInfobar as gov_infobar };

//# sourceMappingURL=gov-infobar.entry.js.map