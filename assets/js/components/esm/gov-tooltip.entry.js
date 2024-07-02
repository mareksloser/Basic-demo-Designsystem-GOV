import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { v as validateProp } from './props-a85d9c89.js';
import { T as TooltipVariant, a as TooltipSize, b as TooltipContentClass, c as TooltipPosition, d as TooltipClass } from './constants-887c5391.js';
import { c as createID } from './string.utils-f268fc6b.js';
import { g as govHost } from './template-df429738.js';
import './gov.log-49da0221.js';
import './win-1dbd3f5c.js';
import './utils-c057a3fa.js';
import './variants-2b936d58.js';
import './sizes-6c5943b4.js';

const govTooltipCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-tooltip{display:inline-block;border-bottom:1px dashed currentcolor;color:var(--gov-color-primary);cursor:help}.gov-tooltip[icon=\"\"],.gov-tooltip[icon=true i],.gov-tooltip[icon=\"1\"]{border-bottom:0}";

const GovTooltip = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.tooltipContentId = undefined;
    this.tooltipId = undefined;
    this.variant = TooltipVariant.PRIMARY;
    this.size = TooltipSize._M;
    this.position = "right";
    this.message = undefined;
    this.identifier = undefined;
    this.icon = undefined;
    this.persist = false;
    this.h = govHost(this.host);
    this.tooltipId = createID("GovTooltip");
    this.tooltipContentId = createID("GovContentTooltip");
  }
  validateVariant(newValue) {
    validateProp(TooltipVariant, newValue, TooltipClass.root);
  }
  validateSize(newValue) {
    validateProp(TooltipSize, newValue, TooltipClass.root);
  }
  validatePosition(newValue) {
    validateProp(TooltipPosition, newValue, TooltipClass.root);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateSize(this.size);
    this.validatePosition(this.position);
    this.createContentWrapper();
    this.registerListeners();
  }
  disconnectedCallback() {
    this.removeContent();
  }
  createContentWrapper() {
    var _a;
    const hasContentInside = this.host.querySelector(TooltipContentClass.root);
    if (hasContentInside) {
      this.content = hasContentInside;
    }
    else {
      this.content = document.createElement(TooltipContentClass.root);
      this.content.innerHTML = this.message;
      this.host.appendChild(this.content);
    }
    const trigger = this.host.getBoundingClientRect();
    this.content.style.left = trigger.left + 'px';
    this.content.style.top = trigger.top + 'px';
    this.content.style.visibility = 'hidden';
    this.content.setAttribute("id", (_a = this.identifier) !== null && _a !== void 0 ? _a : this.tooltipContentId);
    this.content.setAttribute("parent-id", this.tooltipId);
    this.content.setAttribute("variant", this.variant);
    this.content.setAttribute("size", this.size);
    document.body.appendChild(this.content);
  }
  registerListeners() {
    this.host.addEventListener("click", e => {
      e.preventDefault();
      this.persist = true;
      if (this.content) {
        this.content.setAttribute("persist", "true");
      }
      this.showTooltip();
    });
    this.host.addEventListener("focus", e => {
      e.preventDefault();
      this.showTooltip();
    });
    this.host.addEventListener("blur", e => {
      e.preventDefault();
      if (this.persist === false) {
        this.hideTooltip();
      }
    });
    this.host.addEventListener("mouseenter", e => {
      e.preventDefault();
      this.showTooltip();
    });
    this.host.addEventListener("mouseleave", e => {
      e.preventDefault();
      if (this.persist === false) {
        this.hideTooltip();
      }
    });
  }
  verifyPositionSpace() {
    const offset = 12;
    const windowWidth = window.innerWidth;
    const trigger = this.host.getBoundingClientRect();
    const trgWidth = this.host.offsetWidth;
    const trgHeight = this.host.offsetHeight;
    const contentWidth = this.content.offsetWidth;
    const contentHeight = this.content.offsetHeight;
    const triggerPos = {
      left: trigger.left + document.documentElement.scrollLeft,
      top: trigger.top + document.documentElement.scrollTop,
    };
    const isRightSpace = ((triggerPos.left + offset + trigger.width) + contentWidth) <= windowWidth;
    const isLeftSpace = triggerPos.left > contentWidth;
    // LEFT/RIGHT
    if (this.position === TooltipPosition.LEFT || this.position === TooltipPosition.RIGHT) {
      this.content.style.top = (triggerPos.top - ((contentHeight - trgHeight) / 2)) + "px";
      if (isRightSpace === false && isLeftSpace === false) {
        this.position = TooltipPosition.TOP;
        this.content.setAttribute("position", TooltipPosition.TOP);
      }
      if (isLeftSpace && isRightSpace === false && this.position === TooltipPosition.RIGHT) {
        this.position = TooltipPosition.LEFT;
      }
      if (isRightSpace && isLeftSpace === false && this.position === TooltipPosition.LEFT) {
        this.position = TooltipPosition.RIGHT;
      }
    }
    if (this.position === TooltipPosition.RIGHT) {
      this.content.setAttribute("position", TooltipPosition.RIGHT);
      this.content.style.left = (triggerPos.left + offset + trigger.width) + "px";
    }
    if (this.position === TooltipPosition.LEFT) {
      this.content.setAttribute("position", TooltipPosition.LEFT);
      this.content.style.left = (triggerPos.left - (contentWidth + offset)) + "px";
    }
    // LEFT/RIGHT FOR TOP/BOTTOM
    if (this.position === TooltipPosition.TOP || this.position === TooltipPosition.BOTTOM) {
      if (contentWidth > trgWidth) {
        let leftPosition = (triggerPos.left - ((contentWidth - trgWidth) / 2));
        const isNotLeftSpace = leftPosition < 0;
        const isNotRightSpace = (leftPosition + contentWidth) > windowWidth;
        if (isNotLeftSpace && isNotRightSpace) {
          this.content.style.width = "auto";
          this.content.style.left = offset + "px";
          this.content.style.right = offset + "px";
        }
        else {
          if (isNotLeftSpace) {
            leftPosition = offset;
          }
          if (isNotRightSpace) {
            leftPosition = leftPosition - ((windowWidth - (leftPosition + contentWidth + offset)) * -1);
          }
          this.content.style.left = leftPosition + "px";
        }
      }
      else {
        const leftPosition = (triggerPos.left + ((trgWidth - contentWidth) / 2));
        this.content.style.left = leftPosition + "px";
      }
    }
    if (this.position === TooltipPosition.TOP) {
      this.content.setAttribute("position", TooltipPosition.TOP);
      this.content.style.top = (triggerPos.top - (contentHeight + offset)) + "px";
    }
    if (this.position === TooltipPosition.BOTTOM) {
      this.content.setAttribute("position", TooltipPosition.BOTTOM);
      this.content.style.top = (triggerPos.top + (trgHeight + offset)) + "px";
    }
    this.content.setAttribute("is-visible", "true");
    this.content.style.opacity = '1';
  }
  showTooltip() {
    if (this.content) {
      this.content.style.opacity = '0';
      this.content.hidden = false;
      this.verifyPositionSpace();
    }
  }
  hideTooltip() {
    if (this.content) {
      this.content.setAttribute("is-visible", "false");
      this.content.setAttribute("persist", "false");
    }
  }
  removeContent() {
    const contentEl = document.getElementById(this.tooltipContentId);
    if (contentEl) {
      contentEl.remove();
    }
  }
  render() {
    var _a;
    return (h(Host, { id: this.tooltipId, class: this.h.classes(TooltipClass.root), position: this.position, tabindex: 0, "aria-describedby": (_a = this.identifier) !== null && _a !== void 0 ? _a : this.tooltipContentId }, h("slot", null)));
  }
  /**
   * Showing the modal
   */
  async show() {
    this.showTooltip();
  }
  /**
   * Hiding the modal
   */
  async hide() {
    this.persist = false;
    this.hideTooltip();
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"],
    "size": ["validateSize"],
    "position": ["validatePosition"]
  }; }
};
GovTooltip.style = govTooltipCss;

export { GovTooltip as gov_tooltip };

//# sourceMappingURL=gov-tooltip.entry.js.map