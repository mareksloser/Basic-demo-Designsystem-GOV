import { r as registerInstance, c as createEvent, h, a as Host, g as getElement } from './index-eb59f132.js';
import { g as govHost, a as toBoolAttr } from './template-df429738.js';
import { c as createID } from './string.utils-f268fc6b.js';
import { B as ButtonClass } from './constants-34a29ae2.js';
import './sizes-6c5943b4.js';
import './variants-2b936d58.js';
import './utils-c057a3fa.js';

const ClickOutsideOptionsDefaults = {
    triggerEvents: "click",
    exclude: ""
};
/**
 * Register callback function for HTMLElement to be executed when user clicks outside of element.
 * @example
```
<span
    ref={spanEl => registerClickOutside(this, spanEl, () => this.test())}>
      Hello, World!
</span>;
```
 */
function registerClickOutside(component, element, callback, opt = ClickOutsideOptionsDefaults) {
    const excludedNodes = getExcludedNodes(opt);
    getTriggerEvents(opt).forEach(triggerEvent => {
        window.addEventListener(triggerEvent, (e) => {
            initClickOutside(e, component, element, callback, excludedNodes);
        }, false);
    });
}
function initClickOutside(event, component, element, callback, excludedNodes) {
    const target = event.target;
    if (!element.contains(target) && !isExcluded(target, excludedNodes)) {
        callback.call(component);
    }
}
function getTriggerEvents(opt) {
    if (opt.triggerEvents) {
        return opt.triggerEvents.split(",").map(e => e.trim());
    }
    return ["click"];
}
function getExcludedNodes(opt) {
    if (opt.exclude) {
        try {
            return Array.from(document.querySelectorAll(opt.exclude));
        }
        catch (err) {
            console.warn(`@ClickOutside: Exclude: '${opt.exclude}' will not be evaluated. Check your exclude selector syntax.`, err);
        }
    }
    return;
}
function isExcluded(target, excudedNodes) {
    if (target && excudedNodes) {
        for (let excludedNode of excudedNodes) {
            if (excludedNode.contains(target)) {
                return true;
            }
        }
    }
    return false;
}

var Position;
(function (Position) {
  Position["LEFT"] = "left";
  Position["RIGHT"] = "right";
})(Position || (Position = {}));
const DropdownClass = {
  root: 'gov-dropdown',
  list: 'gov-dropdown__list'
};

const govDropdownCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-dropdown{position:relative}.gov-dropdown__list{position:absolute;left:0;z-index:100}.gov-dropdown ul{padding:0.25rem;border-radius:var(--gov-border-radius, 0.1875rem);background-color:var(--gov-dropdown-bg-color, var(--gov-color-neutral-white));box-shadow:var(--gov-dropdown-box-shadow, 0 0.25rem 1.25rem rgba(0, 0, 0, 0.1))}.gov-dropdown li{margin:0;white-space:nowrap}.gov-dropdown li::before{content:none}.gov-dropdown li>*{width:100%}.gov-dropdown li>* .element{justify-content:space-between;width:100%}.gov-dropdown[position=right] .gov-dropdown__list{right:0;left:initial}";

const GovDropdown = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.govChange = createEvent(this, "gov-change", 7);
    this.open = false;
    this.position = Position.LEFT;
    this.h = govHost(this.host);
    this.listId = createID("GovDropdownList");
    this.controlId = createID("GovDropdownControl");
  }
  componentWillLoad() {
    if (this.trigger) {
      this.trigger.setAttribute("wcag-controls", this.listId);
      this.trigger.setAttribute("wcag-has-popup", toBoolAttr(!!this.list));
      this.trigger.setAttribute("identifier", this.controlId);
      this.trigger.addEventListener("gov-click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.open = !this.open;
        this.govChange.emit({
          component: DropdownClass.root,
          originalEvent: e,
          open: this.open,
        });
      });
    }
  }
  get trigger() {
    return this.host.querySelector(`* > ${ButtonClass.root}`);
  }
  get list() {
    return this.h.getSlot("list");
  }
  render() {
    return (h(Host, { class: this.h.classes([DropdownClass.root]), open: this.open, position: this.position }, h("slot", null), h("div", { ref: el => registerClickOutside(this, el, () => this.open = false), class: DropdownClass.list, id: this.listId, "aria-labelledby": this.controlId, "aria-hidden": toBoolAttr(!this.open), hidden: !this.open }, h("slot", { name: "list" }))));
  }
  /**
   * Returns the current state of the dropdown
   */
  async getState() {
    return this.open;
  }
  /**
   * Sets the dropdown state
   */
  async setOpen(state) {
    this.open = state;
  }
  get host() { return getElement(this); }
};
GovDropdown.style = govDropdownCss;

export { GovDropdown as gov_dropdown };

//# sourceMappingURL=gov-dropdown.entry.js.map