'use strict';

const gov_log = require('./gov.log-b842920d.js');
const string_utils = require('./string.utils-0f08c48c.js');
const win = require('./win-5521073d.js');

const validateWcagProp = (value, propName, component) => {
  if (value === undefined || String(value).length === 0) {
    gov_log.govWarningLog(`[${component}]: The (${propName}) attribute is important for correct accessibility.`);
  }
};
const validateWcagRef = (referenceId, name, component) => {
  if (typeof referenceId === 'undefined' || referenceId === undefined) {
    return true;
  }
  if (String(referenceId).length === 0) {
    gov_log.govWarningLog(`[${component}]: Attribute (${name}) is defined with an empty value.`);
    return false;
  }
  let strings = [];
  const referenceIds = string_utils.splitByWhitespace(referenceId);
  if (Array.isArray(referenceIds)) {
    strings = referenceIds.filter(function (e) {
      return e.trim().length > 0;
    });
  }
  return !!strings.filter(referenceId => {
    if (win.documentNode().getElementById(referenceId) === null) {
      //govWarningLog(`[${component}][${name}]: Reference to element with id (${referenceId}) does not exist.`)
      return false;
    }
    else {
      return true;
    }
  }).length;
};
const validateWcagLabelFor = (inputId, labelledBy, component) => {
  const labelEl = win.documentNode().querySelector(`[for=${inputId}]`);
  if (labelEl === null) {
    const labelledByEl = win.documentNode().getElementById(labelledBy);
    if (labelledByEl === null) {
      gov_log.govWarningLog(`[${component}]: The form element has no defined wcag-label or wcag-labelled-by attribute.`);
      return false;
    }
  }
  return true;
};
const validateWcagLabel = (label, labelledBy, component) => {
  if (typeof label === 'string' && label.length > 0) {
    return true;
  }
  if (typeof labelledBy === 'string' && labelledBy.length > 0) {
    const labelledByEl = win.documentNode().getElementById(labelledBy);
    if (labelledByEl) {
      return true;
    }
  }
  gov_log.govWarningLog(`[${component}]: The element has no defined wcag-label or wcag-labelled-by attribute.`);
  return false;
};

exports.validateWcagLabel = validateWcagLabel;
exports.validateWcagLabelFor = validateWcagLabelFor;
exports.validateWcagProp = validateWcagProp;
exports.validateWcagRef = validateWcagRef;

//# sourceMappingURL=wcag-e6257f27.js.map