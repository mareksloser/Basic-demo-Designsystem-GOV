import { r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { p as pick, d as delay } from './utils-c057a3fa.js';
import { V as Variants } from './variants-2b936d58.js';
import { g as govHost } from './template-df429738.js';
import { v as validateProp } from './props-a85d9c89.js';
import { c as canValidateWcagOnRender } from './win-1dbd3f5c.js';
import { v as validateWcagLabel } from './wcag-7d25e12b.js';
import './gov.log-49da0221.js';
import './string.utils-f268fc6b.js';

const SkeletonVariants = pick(Variants, ["PRIMARY", "SECONDARY", "SUCCESS", "ERROR", "WARNING"]);
var SkeletonShapes;
(function (SkeletonShapes) {
  SkeletonShapes["CIRCLE"] = "circle";
  SkeletonShapes["REACT"] = "rect";
  SkeletonShapes["TEXT"] = "text";
})(SkeletonShapes || (SkeletonShapes = {}));
var SkeletonAnimation;
(function (SkeletonAnimation) {
  SkeletonAnimation["PULSE"] = "pulse";
  SkeletonAnimation["PROGRESS"] = "progress";
  SkeletonAnimation["FALSE"] = "false";
})(SkeletonAnimation || (SkeletonAnimation = {}));
const SkeletonClass = {
  root: 'gov-skeleton',
  loader: 'gov-skeleton__loader',
};

const govSkeletonCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-skeleton__loader{position:relative;display:inline-block;width:var(--gov-skeleton-width, 100%);height:var(--gov-skeleton-height, 20px);border-radius:var(--gov-skeleton-border-radius, var(--gov-border-radius, 0.1875rem));outline:none;overflow:hidden;box-sizing:border-box;will-change:transform}.gov-skeleton__loader+.gov-skeleton__loader{margin-top:var(--gov-skeleton-margin-top, 8px)}.gov-skeleton__loader.circle{width:var(--gov-skeleton-circle-size, 60px);height:var(--gov-skeleton-circle-size, 60px);border-radius:var(--gov-skeleton-circle-radius, 50%)}.gov-skeleton__loader.rect{border-radius:var(--gov-skeleton-rect-radius, 0)}.gov-skeleton__loader.progress{background-size:200px 100%;animation:progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite}.gov-skeleton__loader.pulse{animation:pulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;animation-delay:0.5s}@media (prefers-reduced-motion: reduce){.gov-skeleton__loader.pulse,.gov-skeleton__loader.progress{background-image:none;animation:none}}.gov-skeleton[variant=warning] .gov-skeleton__loader{background-color:var(--gov-skeleton-warning-background, var(--gov-color-warning-100));background-repeat:no-repeat}.gov-skeleton[variant=warning] .gov-skeleton__loader.progress{background-image:linear-gradient(90deg, var(--gov-skeleton-warning-background, var(--gov-color-warning-100)), var(--gov-skeleton-warning-foreground, var(--gov-color-warning-200)), var(--gov-skeleton-warning-background, var(--gov-color-warning-100)))}.gov-skeleton[variant=error] .gov-skeleton__loader{background-color:var(--gov-skeleton-error-background, var(--gov-color-error-100));background-repeat:no-repeat}.gov-skeleton[variant=error] .gov-skeleton__loader.progress{background-image:linear-gradient(90deg, var(--gov-skeleton-error-background, var(--gov-color-error-100)), var(--gov-skeleton-error-foreground, var(--gov-color-error-200)), var(--gov-skeleton-error-background, var(--gov-color-error-100)))}.gov-skeleton[variant=secondary] .gov-skeleton__loader{background-color:var(--gov-skeleton-secondary-background, var(--gov-color-secondary-300));background-repeat:no-repeat}.gov-skeleton[variant=secondary] .gov-skeleton__loader.progress{background-image:linear-gradient(90deg, var(--gov-skeleton-secondary-background, var(--gov-color-secondary-300)), var(--gov-skeleton-secondary-foreground, var(--gov-color-secondary-100)), var(--gov-skeleton-secondary-background, var(--gov-color-secondary-300)))}.gov-skeleton[variant=success] .gov-skeleton__loader{background-color:var(--gov-skeleton-success-background, var(--gov-color-success-100));background-repeat:no-repeat}.gov-skeleton[variant=success] .gov-skeleton__loader.progress{background-image:linear-gradient(90deg, var(--gov-skeleton-success-background, var(--gov-color-success-100)), var(--gov-skeleton-success-foreground, var(--gov-color-success-200)), var(--gov-skeleton-success-background, var(--gov-color-success-100)))}.gov-skeleton[variant=primary] .gov-skeleton__loader{background-color:var(--gov-skeleton-primary-background, var(--gov-color-primary-100));background-repeat:no-repeat}.gov-skeleton[variant=primary] .gov-skeleton__loader.progress{background-image:linear-gradient(90deg, var(--gov-skeleton-primary-background, var(--gov-color-primary-100)), var(--gov-skeleton-primary-foreground, var(--gov-color-primary-200)), var(--gov-skeleton-primary-background, var(--gov-color-primary-100)))}";

const GovSkeleton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.items = [];
    this.variant = "secondary";
    this.count = 1;
    this.shape = "text";
    this.width = null;
    this.height = null;
    this.animation = "progress";
    this.wcagLabel = undefined;
    this.h = govHost(this.host);
  }
  validateVariant(newValue) {
    validateProp(SkeletonVariants, newValue, SkeletonClass.root);
  }
  validateShape(newValue) {
    validateProp(SkeletonShapes, newValue, SkeletonClass.root);
  }
  validateAnimation(newValue) {
    validateProp(SkeletonAnimation, newValue, SkeletonClass.root);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateShape(this.shape);
    this.validateAnimation(this.animation);
    this.init();
  }
  componentWillUpdate() {
    this.init();
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  init() {
    this.items.length = this.count;
    this.items.fill(1);
  }
  get style() {
    const dimenssionsStyles = {
      width: null,
      height: null,
    };
    if (this.width) {
      dimenssionsStyles.width = this.width;
    }
    if (this.height) {
      dimenssionsStyles.height = this.height;
    }
    return Object.assign({}, dimenssionsStyles);
  }
  render() {
    return (h(Host, { class: this.h.classes(SkeletonClass.root), variant: this.variant }, this.items.map((_, index) => {
      return (h("span", { key: index, class: {
          circle: this.shape === "circle",
          rect: this.shape === "rect",
          progress: this.animation === "progress",
          pulse: this.animation === "pulse",
          [SkeletonClass.loader]: true,
        }, "aria-busy": "true", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuetext": this.wcagLabel, role: "progressbar", tabindex: "0", style: this.style }));
    })));
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    validateWcagLabel(this.wcagLabel, undefined, SkeletonClass.root);
  }
  get host() { return getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"],
    "shape": ["validateShape"],
    "animation": ["validateAnimation"]
  }; }
};
GovSkeleton.style = govSkeletonCss;

export { GovSkeleton as gov_skeleton };

//# sourceMappingURL=gov-skeleton.entry.js.map