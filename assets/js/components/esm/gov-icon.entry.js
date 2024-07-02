import { d as getAssetPath, r as registerInstance, h, a as Host, g as getElement } from './index-eb59f132.js';
import { i as iconsPath, e as iconsLazyLoad } from './win-1dbd3f5c.js';
import { g as govHost } from './template-df429738.js';
import './utils-c057a3fa.js';

var Types;
(function (Types) {
  Types["BASIC"] = "basic";
  Types["COMPLEX"] = "complex";
  Types["COLORED"] = "colored";
})(Types || (Types = {}));
const IconClass = {
  root: 'gov-icon',
  holder: 'gov-icon__holder',
};

const version = "4.0.4";

const dsVersion = () => {
  return version;
};

const iconCache = {};
const requestCache = {};
const isExternalUrl = (path) => path.startsWith("http://") || path.startsWith("https://");
const iconUrl = (path, name, type) => {
  if (isExternalUrl(path)) {
    return `${path}/${type}/${name}.svg?v=${dsVersion()}`;
  }
  return getAssetPath(`${path}/${type}/${name}.svg`) + `?v=${dsVersion()}`;
};
async function fetchIcon({ name, type }) {
  const cacheKey = type + "-" + name;
  if (iconCache[cacheKey]) {
    return iconCache[cacheKey];
  }
  if (!requestCache[cacheKey]) {
    requestCache[cacheKey] = fetch(iconUrl(iconsPath(), name, type)).then(resp => {
      if (resp.status === 200) {
        return resp.text();
      }
      else {
        throw new Error("Gov Icon doesn't exists");
      }
    });
  }
  const path = await requestCache[cacheKey];
  iconCache[cacheKey] = path;
  return path;
}

const govIconCss = ".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-icon{display:inline-flex}.gov-icon__holder{display:inline-flex;width:100%;height:100%}.gov-icon__holder+.gov-icon__holder{display:none !important}.gov-icon svg{display:inline-flex;width:100%;height:100%;max-width:100%;max-height:100%}";

const GovIcon = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.name = null;
    this.type = "basic";
    this.iconData = undefined;
    this.visible = false;
    this.error = false;
    this.h = govHost(this.host);
  }
  async loadIconPathData() {
    const { name, visible, type } = this;
    if (!name || !visible) {
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
    if (typeof window === "undefined" || !window.IntersectionObserver) {
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
  static get assetsDirs() { return ["assets"]; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "name": ["loadIconPathData"]
  }; }
};
GovIcon.style = govIconCss;

export { GovIcon as gov_icon };

//# sourceMappingURL=gov-icon.entry.js.map