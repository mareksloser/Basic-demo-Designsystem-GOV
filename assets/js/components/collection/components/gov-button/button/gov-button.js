import { h, Host } from "@stencil/core";
import { validateProp } from "../../../helpers/Validate/props";
import { ButtonClass, ButtonVariants, NativeType, Type, } from "./constants";
import { govHost, prepareClasses, toBoolAttr, toBoolAttrIfDefined } from "../../../helpers/Dom/template";
import { toBool } from "../../../utils/bool.utils";
import { Sizes } from "../../../core/constants/sizes";
import { validateWcagLabel, validateWcagRef } from "../../../helpers/Validate/wcag";
import { canValidateWcagOnRender } from "../../../helpers/Dom/win";
import { delay } from "../../../utils/utils";
import { prepareIconFormat } from "../../gov-icon/helpers";
var Tags;
(function (Tags) {
  Tags["A"] = "a";
  Tags["BUTTON"] = "button";
})(Tags || (Tags = {}));
export class GovButton {
  constructor() {
    this.variant = undefined;
    this.size = "m";
    this.type = "solid";
    this.expanded = false;
    this.inverse = false;
    this.name = undefined;
    this.iconLeft = undefined;
    this.iconRight = undefined;
    this.disabled = false;
    this.nativeType = "button";
    this.href = undefined;
    this.target = undefined;
    this.download = undefined;
    this.hreflang = undefined;
    this.referrerpolicy = undefined;
    this.rel = undefined;
    this.loading = undefined;
    this.focusable = true;
    this.identifier = undefined;
    this.wcagActiveDescendant = undefined;
    this.wcagControls = undefined;
    this.wcagDescribedBy = undefined;
    this.wcagDescription = undefined;
    this.wcagDetails = undefined;
    this.wcagExpanded = undefined;
    this.wcagLabel = undefined;
    this.wcagLabelledBy = undefined;
    this.wcagOwns = undefined;
    this.wcagHasPopup = undefined;
    this.wcagPressed = undefined;
    this.wcagCurrent = undefined;
    this.isPressed = false;
    this.h = govHost(this.host);
  }
  validateVariant(newValue) {
    validateProp(ButtonVariants, newValue, ButtonClass.root);
  }
  validateType(newValue) {
    validateProp(Type, newValue, ButtonClass.root);
  }
  validateSize(newValue) {
    validateProp(Sizes, newValue, ButtonClass.root);
  }
  validateNativeType(newValue) {
    validateProp(NativeType, newValue, ButtonClass.root);
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateType(this.type);
    this.validateSize(this.size);
    this.validateNativeType(this.nativeType);
  }
  async componentDidRender() {
    if (canValidateWcagOnRender()) {
      await delay(500);
      await this.validateWcag();
    }
  }
  get classNames() {
    const { h } = this;
    return prepareClasses([ButtonClass.root, h.hasSlot("left-icon") && ButtonClass.rootWithIcon, h.hasSlot("right-icon") && ButtonClass.rootWithIcon]);
  }
  render() {
    const Tag = this.href ? Tags.A : Tags.BUTTON;
    const nativeType = Tag === Tags.A ? undefined : this.nativeType;
    const iconLeft = prepareIconFormat(this.iconLeft);
    const iconRight = prepareIconFormat(this.iconRight);
    return (h(Host, { hoverable: true, size: this.size, variant: this.variant, class: this.h.classes(this.classNames), type: this.type, inverse: this.inverse }, h(Tag, { class: "element", ref: el => (this.triggerRef = el), onClick: this.onClickHandler.bind(this), onFocus: this.onFocusHandler.bind(this), onBlur: this.onBlurHandler.bind(this), onMouseDown: () => (this.isPressed = true), onMouseUp: () => (this.isPressed = false), disabled: this.disabled, id: this.identifier, href: this.href, target: this.target, download: this.download, hreflang: this.hreflang, rel: this.rel, name: this.name, type: nativeType, tabindex: this.focusable ? "0" : "-1", "aria-activedescendant": this.wcagActiveDescendant, "aria-describedby": this.wcagActiveDescendant, "aria-description": this.wcagDescription, "aria-controls": this.wcagControls, "aria-details": this.wcagDetails, "aria-expanded": toBoolAttrIfDefined(this.wcagExpanded), "aria-label": this.wcagLabel, "aria-labelledby": this.wcagLabelledBy, "aria-owns": this.wcagOwns, "aria-haspopup": toBoolAttrIfDefined(this.wcagHasPopup), "aria-pressed": toBoolAttr(this.isPressed), "aria-disabled": toBoolAttrIfDefined(this.disabled), "aria-current": this.wcagCurrent }, toBool(this.loading) && !this.h.hasSlot("right-icon") &&
      h("gov-icon", { name: "loader", class: "gov-spin-animation" }), this.h.hasSlot("left-icon") && h("slot", { name: "left-icon" }), iconLeft && h("gov-icon", { type: iconLeft.type, name: iconLeft.name }), h("slot", null), this.h.hasSlot("right-icon") && h("slot", { name: "right-icon" }), iconRight && h("gov-icon", { type: iconRight.type, name: iconRight.name }), toBool(this.loading) && this.h.hasSlot("right-icon") &&
      h("gov-icon", { name: "loader", class: "gov-spin-animation" }))));
  }
  onClickHandler(e) {
    e.stopPropagation();
    if (this.disabled === false) {
      this.govClick.emit({
        component: ButtonClass.root,
        originalEvent: e,
        ref: this.host,
      });
    }
  }
  onFocusHandler(e) {
    e.stopPropagation();
    this.govFocus.emit({
      component: ButtonClass.root,
      originalEvent: e,
      ref: this.host,
    });
  }
  onBlurHandler(e) {
    e.stopPropagation();
    this.govBlur.emit({
      component: ButtonClass.root,
      originalEvent: e,
      ref: this.host,
    });
  }
  /**
   * Focus button element
   */
  async setFocus() {
    this.triggerRef.focus();
  }
  /**
   * Returns a clickable element instance
   */
  async getTriggerRef() {
    return this.triggerRef;
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    if (this.focusable) {
      validateWcagRef(this.wcagActiveDescendant, "aria-activedescendant", ButtonClass.root);
      validateWcagRef(this.wcagControls, "aria-controls", ButtonClass.root);
      validateWcagRef(this.wcagDetails, "aria-details", ButtonClass.root);
      validateWcagRef(this.wcagOwns, "aria-owns", ButtonClass.root);
      validateWcagRef(this.wcagHasPopup, "aria-haspopup", ButtonClass.root);
      validateWcagLabel(this.wcagLabel, this.wcagLabelledBy, ButtonClass.root);
    }
  }
  static get is() { return "gov-button"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-button.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-button.css"]
    };
  }
  static get properties() {
    return {
      "variant": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ButtonVariantType",
          "resolved": "\"error\" | \"primary\" | \"secondary\" | \"success\" | \"warning\"",
          "references": {
            "ButtonVariantType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-button/button/constants.ts::ButtonVariantType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Style variation of the button"
        },
        "attribute": "variant",
        "reflect": true
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ButtonSizesType",
          "resolved": "\"l\" | \"m\" | \"s\" | \"xl\" | \"xs\"",
          "references": {
            "ButtonSizesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-button/button/constants.ts::ButtonSizesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Button\u2019s size"
        },
        "attribute": "size",
        "reflect": true,
        "defaultValue": "\"m\""
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "TypesType",
          "resolved": "\"base\" | \"link\" | \"outlined\" | \"solid\"",
          "references": {
            "TypesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-button/button/constants.ts::TypesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Button's type"
        },
        "attribute": "type",
        "reflect": true,
        "defaultValue": "\"solid\""
      },
      "expanded": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Expands the button to fill 100% of the container width"
        },
        "attribute": "expanded",
        "reflect": true,
        "defaultValue": "false"
      },
      "inverse": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Determine if component should have inversed colors to be used on dark background"
        },
        "attribute": "inverse",
        "reflect": true,
        "defaultValue": "false"
      },
      "name": {
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
          "text": "The name of the button, which gets paired with the button's value when submitted as part of a form. Corresponds with the native HTML name attribute"
        },
        "attribute": "name",
        "reflect": false
      },
      "iconLeft": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Definition of the button icon on the left. The icon must be defined in the form \"type/name\"."
        },
        "attribute": "icon-left",
        "reflect": false
      },
      "iconRight": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Definition of the button icon on the left. The icon must be defined in the form \"type/name\"."
        },
        "attribute": "icon-right",
        "reflect": false
      },
      "disabled": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Makes the button component disabled.\nThis prevents users from being able to interact with the button, and conveys its inactive state to assistive technologies"
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "nativeType": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "NativeTypesType",
          "resolved": "\"button\" | \"reset\" | \"submit\"",
          "references": {
            "NativeTypesType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-button/button/constants.ts::NativeTypesType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Same as original parameter\nhttps://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type"
        },
        "attribute": "native-type",
        "reflect": false,
        "defaultValue": "\"button\""
      },
      "href": {
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
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "href",
        "reflect": false
      },
      "target": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "ButtonTargetType",
          "resolved": "\"_blank\" | \"_new\" | \"_self\"",
          "references": {
            "ButtonTargetType": {
              "location": "import",
              "path": "./constants",
              "id": "../../../packages/core/src/components/gov-button/button/constants.ts::ButtonTargetType"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "target",
        "reflect": false
      },
      "download": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "download",
        "reflect": false
      },
      "hreflang": {
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
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-hreflang"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "hreflang",
        "reflect": false
      },
      "referrerpolicy": {
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
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-referrerpolicy"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "referrerpolicy",
        "reflect": false
      },
      "rel": {
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
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-rel"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "rel",
        "reflect": false
      },
      "loading": {
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
          "text": "Indicates whether an asynchronous process is running"
        },
        "attribute": "loading",
        "reflect": false
      },
      "focusable": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "link",
              "text": "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/focusable"
            }],
          "text": "Same as original parameter"
        },
        "attribute": "focusable",
        "reflect": false,
        "defaultValue": "true"
      },
      "identifier": {
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
          "text": "Custom button identifier"
        },
        "attribute": "identifier",
        "reflect": false
      },
      "wcagActiveDescendant": {
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
          "text": "Indicates the id of a related component\u2019s visually focused element"
        },
        "attribute": "wcag-active-descendant",
        "reflect": false
      },
      "wcagControls": {
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
          "text": "Use this property to add an aria-controls attribute to the button. Use the attribute to point to the unique id of the content that the button manages"
        },
        "attribute": "wcag-controls",
        "reflect": false
      },
      "wcagDescribedBy": {
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
          "text": "Indicates the id of a component that describes the button"
        },
        "attribute": "wcag-described-by",
        "reflect": false
      },
      "wcagDescription": {
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
          "text": "Aria description the button"
        },
        "attribute": "wcag-description",
        "reflect": false
      },
      "wcagDetails": {
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
          "text": "Details of the component"
        },
        "attribute": "wcag-details",
        "reflect": false
      },
      "wcagExpanded": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If a button expands or collapses adjacent content, then use the ariaExpanded prop to add the aria-expanded attribute to the button\nSet the value to convey the current expanded (true) or collapsed (false) state of the content"
        },
        "attribute": "wcag-expanded",
        "reflect": false
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
          "text": "Adds accessible label for the button that is only shown for screen readers\nTypically, this label text replaces the visible text on the button for users who use assistive technology"
        },
        "attribute": "wcag-label",
        "reflect": false
      },
      "wcagLabelledBy": {
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
          "text": "String of id's that indicate alternative labels elements"
        },
        "attribute": "wcag-labelled-by",
        "reflect": false
      },
      "wcagOwns": {
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
          "text": "Indicates the id of a component owned by the button"
        },
        "attribute": "wcag-owns",
        "reflect": false
      },
      "wcagHasPopup": {
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
          "text": "Use this property to add an aria-haspopup attribute to a button, if you are using it as a menu button"
        },
        "attribute": "wcag-has-popup",
        "reflect": false
      },
      "wcagPressed": {
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
          "text": "Tells screen reader the element is pressed"
        },
        "attribute": "wcag-pressed",
        "reflect": false
      },
      "wcagCurrent": {
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
          "text": "Indicates the current item within a container or set of related elements"
        },
        "attribute": "wcag-current",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "isPressed": {}
    };
  }
  static get events() {
    return [{
        "method": "govClick",
        "name": "gov-click",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the button click"
        },
        "complexType": {
          "original": "ButtonEvent",
          "resolved": "ButtonEvent",
          "references": {
            "ButtonEvent": {
              "location": "import",
              "path": "./gov-button.types",
              "id": "../../../packages/core/src/components/gov-button/button/gov-button.types.ts::ButtonEvent"
            }
          }
        }
      }, {
        "method": "govFocus",
        "name": "gov-focus",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the button has focus"
        },
        "complexType": {
          "original": "ButtonEvent",
          "resolved": "ButtonEvent",
          "references": {
            "ButtonEvent": {
              "location": "import",
              "path": "./gov-button.types",
              "id": "../../../packages/core/src/components/gov-button/button/gov-button.types.ts::ButtonEvent"
            }
          }
        }
      }, {
        "method": "govBlur",
        "name": "gov-blur",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the button loses focus"
        },
        "complexType": {
          "original": "ButtonEvent",
          "resolved": "ButtonEvent",
          "references": {
            "ButtonEvent": {
              "location": "import",
              "path": "./gov-button.types",
              "id": "../../../packages/core/src/components/gov-button/button/gov-button.types.ts::ButtonEvent"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "setFocus": {
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
          "text": "Focus button element",
          "tags": []
        }
      },
      "getTriggerRef": {
        "complexType": {
          "signature": "() => Promise<HTMLLinkElement | HTMLButtonElement>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "HTMLLinkElement": {
              "location": "global",
              "id": "global::HTMLLinkElement"
            },
            "HTMLButtonElement": {
              "location": "global",
              "id": "global::HTMLButtonElement"
            }
          },
          "return": "Promise<HTMLLinkElement | HTMLButtonElement>"
        },
        "docs": {
          "text": "Returns a clickable element instance",
          "tags": []
        }
      },
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
        "propName": "type",
        "methodName": "validateType"
      }, {
        "propName": "size",
        "methodName": "validateSize"
      }, {
        "propName": "nativeType",
        "methodName": "validateNativeType"
      }];
  }
}
//# sourceMappingURL=gov-button.js.map
