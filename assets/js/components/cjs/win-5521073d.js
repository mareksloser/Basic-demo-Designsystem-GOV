'use strict';

const utils = require('./utils-c9b1bba3.js');

const isWindow = typeof window !== "undefined";
const getWindowProperty = (name) => isWindow && window && utils.property(name, window);
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

exports.canValidateWcagOnRender = canValidateWcagOnRender;
exports.documentNode = documentNode;
exports.iconsLazyLoad = iconsLazyLoad;
exports.iconsPath = iconsPath;
exports.useErrorLog = useErrorLog;
exports.useLog = useLog;
exports.useWarningLog = useWarningLog;

//# sourceMappingURL=win-5521073d.js.map