import { h, Host } from "@stencil/core";
import { SkeletonAnimation, SkeletonClass, SkeletonShapes, SkeletonVariants, } from "./constants";
import { govHost } from "../../../helpers/Dom/template";
import { validateProp } from "../../../helpers/Validate/props";
import { canValidateWcagOnRender } from "../../../helpers/Dom/win";
import { delay } from "../../../utils/utils";
import { validateWcagLabel } from "../../../helpers/Validate/wcag";
export class GovSkeleton {
  constructor() {
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
  static get is() { return "gov-skeleton"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-skeleton.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-skeleton.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SkeletonVariantsType",
          "resolved": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"warning\"",
          "references": {
            "SkeletonVariantsType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-loading/skeleton/constants.ts::SkeletonVariantsType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Style variation of the skeleton."
        },
        "attribute": "variant",
        "reflect": false,
        "defaultValue": "\"secondary\""
      },
      "count": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Number of rows of current skeleton type"
        },
        "attribute": "count",
        "reflect": false,
        "defaultValue": "1"
      },
      "shape": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SkeletonShapesType",
          "resolved": "\"circle\" | \"rect\" | \"text\"",
          "references": {
            "SkeletonShapesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-loading/skeleton/constants.ts::SkeletonShapesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Shape of the skeleton"
        },
        "attribute": "shape",
        "reflect": false,
        "defaultValue": "\"text\""
      },
      "width": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Width of the skeleton ex. 100px, 100%, auto etc."
        },
        "attribute": "width",
        "reflect": false,
        "defaultValue": "null"
      },
      "height": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Height of the skeleton ex. 100px, 100%, auto etc."
        },
        "attribute": "height",
        "reflect": false,
        "defaultValue": "null"
      },
      "animation": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SkeletonAnimationType",
          "resolved": "\"false\" | \"progress\" | \"pulse\"",
          "references": {
            "SkeletonAnimationType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-loading/skeleton/constants.ts::SkeletonAnimationType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Animation type"
        },
        "attribute": "animation",
        "reflect": false,
        "defaultValue": "\"progress\""
      },
      "wcagLabel": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Adds accessible label for the skeleton that is only shown for screen readers."
        },
        "attribute": "wcag-label",
        "reflect": false
      }
    };
  }
  static get methods() {
    return {
      "validateWcag": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Validate the WCAG attributes of the component",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "variant",
        "methodName": "validateVariant"
      }, {
        "propName": "shape",
        "methodName": "validateShape"
      }, {
        "propName": "animation",
        "methodName": "validateAnimation"
      }];
  }
}
//# sourceMappingURL=gov-skeleton.js.map
