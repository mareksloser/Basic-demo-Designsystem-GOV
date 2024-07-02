'use strict';

const gov_log = require('./gov.log-b842920d.js');

// @TODO: deal with optional values
const validateProp = (valueEnum, value, component) => {
  const values = Object.values(valueEnum);
  const isValid = values.indexOf(value) > -1;
  if (!isValid) {
    gov_log.govWarningLog(`[${component}]: Bad parameter with value (${value}). Available parameters are (${values.join(', ')}).`);
  }
};

exports.validateProp = validateProp;

//# sourceMappingURL=props-d6146e54.js.map