'use strict';

const LayoutClass = {
  root: 'gov-layout',
  section: 'gov-layout__section',
};
var LayoutTypes;
(function (LayoutTypes) {
  LayoutTypes["STRETCH"] = "stretch";
  LayoutTypes["ASIDE"] = "aside";
  LayoutTypes["TEXT"] = "text";
})(LayoutTypes || (LayoutTypes = {}));
var LayoutVariant;
(function (LayoutVariant) {
  LayoutVariant["LEFT"] = "left";
  LayoutVariant["RIGHT"] = "right";
})(LayoutVariant || (LayoutVariant = {}));
const LayoutColumnClass = {
  root: 'gov-layout-column',
};

exports.LayoutClass = LayoutClass;
exports.LayoutColumnClass = LayoutColumnClass;

//# sourceMappingURL=constants-1490a5eb.js.map