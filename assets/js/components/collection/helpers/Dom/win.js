import { property } from "../../utils/utils";
export const isWindow = typeof window !== "undefined";
const getWindowProperty = (name) => isWindow && window && property(name, window);
const config = () => {
  const defaultConfig = {
    canValidateWcagOnRender: false,
    warningLog: false,
    errorLog: false,
    log: false,
    iconsPath: '/assets/icons',
    iconsLazyLoad: true,
    documentNode: document ? document : null,
  };
  const windowProperty = getWindowProperty('GOV_DS_CONFIG');
  if (windowProperty) {
    return Object.assign(Object.assign({}, defaultConfig), windowProperty);
  }
  return defaultConfig;
};
export const canValidateWcagOnRender = () => config().canValidateWcagOnRender;
export const useWarningLog = () => config().warningLog;
export const useErrorLog = () => config().errorLog;
export const useLog = () => config().log;
export const iconsPath = () => config().iconsPath;
export const iconsLazyLoad = () => config().iconsLazyLoad;
export const documentNode = () => config().documentNode;
//# sourceMappingURL=win.js.map
