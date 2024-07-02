import { Build, h, Host } from "@stencil/core";
import { IconClass } from "./constants";
import { fetchIcon } from "../../utils/icon.utils";
import { govHost } from "../../helpers/Dom/template";
import { iconsLazyLoad } from "../../helpers/Dom/win";
export class GovIcon {
  constructor() {
    this.name = null;
    this.type = "basic";
    this.iconData = undefined;
    this.visible = false;
    this.error = false;
    this.h = govHost(this.host);
  }
  async loadIconPathData() {
    const { name, visible, type } = this;
    if (!Build.isBrowser || !name || !visible) {
      return;
    }
    try {
      this.iconData = await fetchIcon({ name, type });
    }
    catch (e) {
      this.error = true;
    }
  }
  connectedCallback() {
    if (iconsLazyLoad()) {
      this.visible = true;
      this.loadIconPathData().finally();
    }
    else {
      this.waitUntilVisible(async () => {
        this.visible = true;
        await this.loadIconPathData();
      });
    }
  }
  disconnectedCallback() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }
  async componentWillLoad() {
    await this.loadIconPathData();
  }
  waitUntilVisible(callback) {
    if (!Build.isBrowser || typeof window === "undefined" || !window.IntersectionObserver) {
      callback();
      return;
    }
    this.intersectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
          }
          callback();
        }
      });
    }, { rootMargin: "50px" });
    this.intersectionObserver.observe(this.host);
  }
  render() {
    if (this.error) {
      return null;
    }
    return (h(Host, { class: this.h.classes(IconClass.root) }, h("span", { class: IconClass.holder, innerHTML: this.iconData })));
  }
  static get is() { return "gov-icon"; }
  static get originalStyleUrls() {
    return {
      "$": ["gov-icon.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["gov-icon.css"]
    };
  }
  static get assetsDirs() { return ["assets"]; }
  static get properties() {
    return {
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
          "text": "Name of icon"
        },
        "attribute": "name",
        "reflect": false,
        "defaultValue": "null"
      },
      "type": {
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
          "text": "Type (folder) of icon"
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "\"basic\""
      }
    };
  }
  static get states() {
    return {
      "iconData": {},
      "visible": {},
      "error": {}
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "name",
        "methodName": "loadIconPathData"
      }];
  }
}
//# sourceMappingURL=gov-icon.js.map
