'use strict';

const win = require('./win-5521073d.js');

const WARNING_COLORS = { bg: '#ecae1a', text: '#3b3b3b' };
const INFO_COLORS = { bg: '#2362a2', text: '#fff' };
const ERROR_COLORS = { bg: '#c52a3a', text: '#fff' };
const govLog = (message, colors = INFO_COLORS) => {
  const styles = ['color: ' + colors.text, 'background: ' + colors.bg, 'font-size: 11px', 'padding: 2px 4px', 'border-radius: 3px', 'font-weight: 600'].join(';');
  if (win.useLog() || win.useWarningLog() || win.useErrorLog()) {
    console.log('%cgov', styles, message);
  }
};
const govWarningLog = (message) => {
  if (win.useWarningLog()) {
    govLog(message, WARNING_COLORS);
  }
};
const govErrorLog = (message) => {
  if (win.useErrorLog()) {
    govLog(message, ERROR_COLORS);
  }
};

exports.govErrorLog = govErrorLog;
exports.govWarningLog = govWarningLog;

//# sourceMappingURL=gov.log-b842920d.js.map