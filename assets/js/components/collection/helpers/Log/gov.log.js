import { useErrorLog, useLog, useWarningLog } from "../Dom/win";
const WARNING_COLORS = { bg: '#ecae1a', text: '#3b3b3b' };
const INFO_COLORS = { bg: '#2362a2', text: '#fff' };
const ERROR_COLORS = { bg: '#c52a3a', text: '#fff' };
export const govLog = (message, colors = INFO_COLORS) => {
  const styles = ['color: ' + colors.text, 'background: ' + colors.bg, 'font-size: 11px', 'padding: 2px 4px', 'border-radius: 3px', 'font-weight: 600'].join(';');
  if (useLog() || useWarningLog() || useErrorLog()) {
    console.log('%cgov', styles, message);
  }
};
export const govWarningLog = (message) => {
  if (useWarningLog()) {
    govLog(message, WARNING_COLORS);
  }
};
export const govErrorLog = (message) => {
  if (useErrorLog()) {
    govLog(message, ERROR_COLORS);
  }
};
//# sourceMappingURL=gov.log.js.map
