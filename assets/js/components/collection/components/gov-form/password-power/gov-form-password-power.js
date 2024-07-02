import { h, Host } from "@stencil/core";
import { FormPasswordPowerClass } from "./constants";
export class GovFormPasswordPower {
  constructor() {
    this.power = undefined;
  }
  render() {
    return (h(Host, { class: FormPasswordPowerClass.root }, h("span", { class: FormPasswordPowerClass.bar }, h("span", null), h("span", null), h("span", null)), h("span", { class: FormPasswordPowerClass.text }, h("slot", null))));
  }
  static get is() { return "gov-form-password-power"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-form-password-power.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-form-password-power.css"]
    };
  }
  static get properties() {
    return {
      "power": {
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
          "text": "Password power: 0 - none, 1 - weak, 2 - medium, 3 - strong"
        },
        "attribute": "power",
        "reflect": true
      }
    };
  }
}
//# sourceMappingURL=gov-form-password-power.js.map
