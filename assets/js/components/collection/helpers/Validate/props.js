import { govWarningLog } from "../Log/gov.log";
// @TODO: deal with optional values
export const validateProp = (valueEnum, value, component) => {
  const values = Object.values(valueEnum);
  const isValid = values.indexOf(value) > -1;
  if (!isValid) {
    govWarningLog(`[${component}]: Bad parameter with value (${value}). Available parameters are (${values.join(', ')}).`);
  }
};
//# sourceMappingURL=props.js.map
