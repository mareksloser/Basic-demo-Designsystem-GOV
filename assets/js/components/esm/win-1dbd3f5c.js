import { a as property } from './utils-c057a3fa.js';

const isWindow = typeof window !== "undefined";
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
const canValidateWcagOnRender = () => config().canValidateWcagOnRender;
const useWarningLog = () => config().warningLog;
const useErrorLog = () => config().errorLog;
const useLog = () => config().log;
const iconsPath = () => config().iconsPath;
const iconsLazyLoad = () => config().iconsLazyLoad;
const documentNode = () => config().documentNode;

export { useLog as a, useWarningLog as b, canValidateWcagOnRender as c, documentNode as d, iconsLazyLoad as e, iconsPath as i, useErrorLog as u };

//# sourceMappingURL=win-1dbd3f5c.js.map