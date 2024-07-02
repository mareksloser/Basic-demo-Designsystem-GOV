import { h, Host } from "@stencil/core";
import { govHost, slottedChildren } from "../../helpers/Dom/template";
import { ContainerClass } from "./constants";
export class GovContainer {
  constructor() {
    this.h = govHost(this.host);
  }
  render() {
    return (h(Host, { class: this.h.classes(ContainerClass.root) }, h("slot", null)));
  }
  /**
   * Returns slotted children
   *
   * @return {Promise<Node[]>}
   */
  async slottedChildren() {
    return Promise.resolve(slottedChildren(this.host));
  }
  static get is() { return "gov-container"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-container.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-container.css"]
    };
  }
  static get methods() {
    return {
      "slottedChildren": {
        "complexType": {
          "signature": "() => Promise<Node[]>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "Node": {
              "location": "global",
              "id": "global::Node"
            }
          },
          "return": "Promise<Node[]>"
        },
        "docs": {
          "text": "Returns slotted children",
          "tags": [{
              "name": "return",
              "text": undefined
            }]
        }
      }
    };
  }
  static get elementRef() { return "host"; }
}
//# sourceMappingURL=gov-container.js.map
