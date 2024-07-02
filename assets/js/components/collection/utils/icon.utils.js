import { getAssetPath } from "@stencil/core";
import { dsVersion } from "./ds.utils";
import { iconsPath } from "../helpers/Dom/win";
const iconCache = {};
const requestCache = {};
const isExternalUrl = (path) => path.startsWith("http://") || path.startsWith("https://");
const iconUrl = (path, name, type) => {
  if (isExternalUrl(path)) {
    return `${path}/${type}/${name}.svg?v=${dsVersion()}`;
  }
  return getAssetPath(`${path}/${type}/${name}.svg`) + `?v=${dsVersion()}`;
};
export async function fetchIcon({ name, type }) {
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
//# sourceMappingURL=icon.utils.js.map
