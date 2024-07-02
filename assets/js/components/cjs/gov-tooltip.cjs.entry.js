'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const props = require('./props-d6146e54.js');
const constants = require('./constants-20b3f7ee.js');
const string_utils = require('./string.utils-0f08c48c.js');
const template = require('./template-4b951d1d.js');
require('./gov.log-b842920d.js');
require('./win-5521073d.js');
require('./utils-c9b1bba3.js');
require('./variants-f5ffeef3.js');
require('./sizes-79872c2a.js');

const govTooltipCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-tooltip{display:inline-block;border-bottom:1px dashed currentcolor;color:var(--gov-color-primary);cursor:help}.gov-tooltip[icon=\"\"],.gov-tooltip[icon=true i],.gov-tooltip[icon=\"1\"]{border-bottom:0}";

const GovTooltip = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.tooltipContentId = undefined;
    this.tooltipId = undefined;
    this.variant = constants.TooltipVariant.PRIMARY;
    this.size = constants.TooltipSize._M;
    this.position = "right";
    this.message = undefined;
    this.identifier = undefined;
    this.icon = undefined;
    this.persist = false;
    this.h = template.govHost(this.host);
    this.tooltipId = string_utils.createID("GovTooltip");
    this.tooltipContentId = string_utils.createID("GovContentTooltip");
  }
  validateVariant(newValue) {
    props.validateProp(constants.TooltipVariant, newValue, constants.TooltipClass.root);
  }
  validateSize(newValue) {
    props.validateProp(constants.TooltipSize, newValue, constants.TooltipClass.root);
  }
  validatePosition(newValue) {
    props.validateProp(constants.TooltipPosition, newValue, constants.TooltipClass.root);
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
    const hasContentInside = this.host.querySelector(constants.TooltipContentClass.root);
    if (hasContentInside) {
      this.content = hasContentInside;
    }
    else {
      this.content = document.createElement(constants.TooltipContentClass.root);
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
    if (this.position === constants.TooltipPosition.LEFT || this.position === constants.TooltipPosition.RIGHT) {
      this.content.style.top = (triggerPos.top - ((contentHeight - trgHeight) / 2)) + "px";
      if (isRightSpace === false && isLeftSpace === false) {
        this.position = constants.TooltipPosition.TOP;
        this.content.setAttribute("position", constants.TooltipPosition.TOP);
      }
      if (isLeftSpace && isRightSpace === false && this.position === constants.TooltipPosition.RIGHT) {
        this.position = constants.TooltipPosition.LEFT;
      }
      if (isRightSpace && isLeftSpace === false && this.position === constants.TooltipPosition.LEFT) {
        this.position = constants.TooltipPosition.RIGHT;
      }
    }
    if (this.position === constants.TooltipPosition.RIGHT) {
      this.content.setAttribute("position", constants.TooltipPosition.RIGHT);
      this.content.style.left = (triggerPos.left + offset + trigger.width) + "px";
    }
    if (this.position === constants.TooltipPosition.LEFT) {
      this.content.setAttribute("position", constants.TooltipPosition.LEFT);
      this.content.style.left = (triggerPos.left - (contentWidth + offset)) + "px";
    }
    // LEFT/RIGHT FOR TOP/BOTTOM
    if (this.position === constants.TooltipPosition.TOP || this.position === constants.TooltipPosition.BOTTOM) {
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
    if (this.position === constants.TooltipPosition.TOP) {
      this.content.setAttribute("position", constants.TooltipPosition.TOP);
      this.content.style.top = (triggerPos.top - (contentHeight + offset)) + "px";
    }
    if (this.position === constants.TooltipPosition.BOTTOM) {
      this.content.setAttribute("position", constants.TooltipPosition.BOTTOM);
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
    return (index.h(index.Host, { id: this.tooltipId, class: this.h.classes(constants.TooltipClass.root), position: this.position, tabindex: 0, "aria-describedby": (_a = this.identifier) !== null && _a !== void 0 ? _a : this.tooltipContentId }, index.h("slot", null)));
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
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"],
    "size": ["validateSize"],
    "position": ["validatePosition"]
  }; }
};
GovTooltip.style = govTooltipCss;

exports.gov_tooltip = GovTooltip;

//# sourceMappingURL=gov-tooltip.cjs.entry.js.map