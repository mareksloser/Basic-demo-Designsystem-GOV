import { g as govWarningLog } from './gov.log-49da0221.js';

// @TODO: deal with optional values
const validateProp = (valueEnum, value, component) => {
  const values = Object.values(valueEnum);
  const isValid = values.indexOf(value) > -1;
  if (!isValid) {
    govWarningLog(`[${component}]: Bad parameter with value (${value}). Available parameters are (${values.join(', ')}).`);
  }
};

export { validateProp as v };

//# sourceMappingURL=props-a85d9c89.js.map